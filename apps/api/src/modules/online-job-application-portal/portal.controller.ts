import { Request, Response } from 'express';
import { job } from '../../db/clients';

export class JobPortalController {
  // Diagnostics
  static async testDatabase(req: Request, res: Response) {
    const now = await job.$queryRaw`SELECT NOW()`;
    res.json({ success: true, data: now });
  }

  // Auth & profile (minimal stubs)
  static async register(req: Request, res: Response) { res.status(201).json({ success: true }); }
  static async login(req: Request, res: Response) { res.json({ success: true, token: 'stub' }); }
  static async getProfile(req: Request, res: Response) { res.json({ success: true, data: {} }); }
  static async getCurrentApplicantProfile(req: Request, res: Response) { res.json({ success: true, data: {} }); }
  static async updateProfile(req: Request, res: Response) { res.json({ success: true }); }
  static async checkProfileCompletion(req: Request, res: Response) { res.json({ success: true, complete: false }); }

  // Jobs
  static async listJobs(req: Request, res: Response) {
    try {
      const { keywords, department, salary_range } = req.query;
      
      // Build where clause for filtering
      const where: any = {
        posting_status: 'Published' // Only show published jobs
      };

      // Add keyword search
      if (keywords) {
        where.OR = [
          { position_title: { contains: keywords as string, mode: 'insensitive' } },
          { job_description: { contains: keywords as string, mode: 'insensitive' } },
          { qualifications: { contains: keywords as string, mode: 'insensitive' } }
        ];
      }

      // Add department filter
      if (department) {
        where.department = {
          department_name: { contains: department as string, mode: 'insensitive' }
        };
      }

      // Add salary range filter
      if (salary_range) {
        where.salary_range = { contains: salary_range as string, mode: 'insensitive' };
      }

      const jobs = await job.jobPosting.findMany({
        where,
        include: {
          department: {
            select: {
              id: true,
              department_name: true
            }
          },
          job_title: {
            select: {
              id: true,
              title: true,
              employment_type: true
            }
          }
        },
        orderBy: [{ created_at: 'desc' }]
      });

      // Transform the data to match frontend expectations
      const transformedJobs = jobs.map((job: any) => ({
        id: job.id,
        position_title: job.job_title?.title || 'Unknown Position',
        department_id: job.department_id,
        department: job.department,
        job_description: job.job_description,
        qualifications: job.qualifications,
        technical_competencies: job.technical_competencies,
        salary_range: job.salary_range,
        employment_type: job.job_title?.employment_type || job.employment_type,
        num_vacancies: job.num_vacancies,
        application_deadline: job.application_deadline,
        posting_status: job.posting_status,
        created_at: job.created_at,
        updated_at: job.created_at // Using created_at as updated_at since it's not in schema
      }));

      res.json({ success: true, data: transformedJobs });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch jobs' } });
    }
  }
  static async getJob(req: Request, res: Response) {
    try {
      const { id } = req.params as any;
      const jobPosting = await job.jobPosting.findUnique({ 
        where: { id },
        include: {
          department: {
            select: {
              id: true,
              department_name: true
            }
          },
          job_title: {
            select: {
              id: true,
              title: true,
              employment_type: true
            }
          }
        }
      });
      
      if (!jobPosting) {
        return res.status(404).json({ success: false, error: { message: 'Job not found' } });
      }

      // Transform the data to match frontend expectations
      const transformedJob = {
        id: jobPosting.id,
        position_title: jobPosting.job_title?.title || 'Unknown Position',
        department_id: jobPosting.department_id,
        department: jobPosting.department,
        job_description: jobPosting.job_description,
        qualifications: jobPosting.qualifications,
        technical_competencies: jobPosting.technical_competencies,
        salary_range: jobPosting.salary_range,
        employment_type: jobPosting.job_title?.employment_type || jobPosting.employment_type,
        num_vacancies: jobPosting.num_vacancies,
        application_deadline: jobPosting.application_deadline,
        posting_status: jobPosting.posting_status,
        created_at: jobPosting.created_at,
        updated_at: jobPosting.created_at
      };

      res.json({ success: true, data: transformedJob });
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch job' } });
    }
  }
  static async createJobPosting(req: Request, res: Response) {
    const created = await job.jobPosting.create({ data: req.body });
    res.status(201).json({ success: true, data: created });
  }
  static async getSalaryRanges(req: Request, res: Response) {
    try {
      // Get unique salary ranges from job postings
      const salaryRanges = await job.jobPosting.findMany({
        select: {
          salary_range: true
        },
        where: {
          salary_range: {
            not: null
          },
          posting_status: 'Published'
        },
        distinct: ['salary_range']
      });

      // Extract and format salary ranges
      const ranges = salaryRanges
        .map((job: { salary_range: string | null }) => job.salary_range)
        .filter((range: string | null) => range && range.trim() !== '')
        .sort();

      res.json({ success: true, data: ranges });
    } catch (error) {
      console.error('Error fetching salary ranges:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch salary ranges' } });
    }
  }
  static async getDepartments(req: Request, res: Response) {
    try {
      // Get departments that have published job postings
      const departments = await job.department.findMany({
        where: {
          job_postings: {
            some: {
              posting_status: 'Published'
            }
          }
        },
        select: {
          department_name: true
        },
        orderBy: { department_name: 'asc' }
      });

      // Extract just the department names
      const departmentNames = departments.map((dept: { department_name: string }) => dept.department_name);

      res.json({ success: true, data: departmentNames });
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ success: false, error: { message: 'Failed to fetch departments' } });
    }
  }

  // Applications
  static async startApplication(req: Request, res: Response) {
    const created = await job.jobApplication.create({ data: req.body });
    res.status(201).json({ success: true, data: created });
  }
  static async uploadDocuments(req: Request, res: Response) { res.status(201).json({ success: true }); }
  static async answerQuestions(req: Request, res: Response) { res.json({ success: true }); }
  static async submitApplication(req: Request, res: Response) { res.json({ success: true }); }
  static async listApplications(req: Request, res: Response) {
    const apps = await job.jobApplication.findMany({ orderBy: [{ id: 'desc' }] });
    res.json({ success: true, data: apps });
  }
  static async getApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const app = await job.jobApplication.findUnique({ where: { id } });
    if (!app) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: app });
  }
  static async editApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const updated = await job.jobApplication.update({ where: { id }, data: req.body });
    res.json({ success: true, data: updated });
  }
  static async cancelApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    await job.jobApplication.delete({ where: { id } });
    res.json({ success: true });
  }

  // Notifications
  static async notifyApplicant(req: Request, res: Response) { res.json({ success: true }); }
}


