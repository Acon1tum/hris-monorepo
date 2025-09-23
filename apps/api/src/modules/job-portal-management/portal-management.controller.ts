import { Request, Response } from 'express';
import { PrismaClient as JobClient } from '@prisma/client-job';

const jobDb = new JobClient();

type EmploymentType = 'Plantilla' | 'Contractual' | 'Casual' | 'Contract_Of_Service';

function toPrismaEmploymentType(type: string): any {
  const map: Record<string, string> = {
    Plantilla: 'Plantilla',
    Contractual: 'Contractual',
    Casual: 'Casual',
    Contract_Of_Service: 'Contract_Of_Service'
  };
  return map[type] ?? 'Contractual';
}

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

function mapPostingToDto(p: any) {
  return {
    id: p.id,
    position_title: p.job_title?.title ?? '',
    department_id: p.department_id,
    job_description: p.job_description,
    qualifications: p.qualifications,
    technical_competencies: p.technical_competencies ?? '',
    salary_range: p.salary_range ?? '',
    employment_type: p.employment_type,
    num_vacancies: p.num_vacancies,
    application_deadline: p.application_deadline?.toISOString?.() ?? p.application_deadline,
    posting_status: p.posting_status,
    created_by: p.created_by,
    created_at: p.created_at?.toISOString?.() ?? p.created_at,
    department: p.department ? { id: p.department.id, department_name: p.department.department_name } : undefined,
    created_by_user: p.created_by_user
      ? { id: p.created_by_user.id, username: p.created_by_user.username, email: p.created_by_user.email }
      : undefined,
    _count: { job_applications: p._count?.job_applications ?? 0 }
  };
}

export class JobPortalManagementController {
  static async createJobPosting(req: Request, res: Response) {
    const {
      position_title,
      department_id,
      job_description,
      qualifications,
      technical_competencies,
      salary_range,
      employment_type,
      num_vacancies,
      application_deadline,
      posting_status,
      experience_level = 'Mid_Level',
      job_category = 'Information_Technology'
    } = req.body as any;

    const jobTitle = await jobDb.jobTitle.upsert({
      where: { title: position_title },
      update: { employment_type: toPrismaEmploymentType(employment_type) },
      create: {
        title: position_title,
        employment_type: toPrismaEmploymentType(employment_type)
      }
    });

    const created = await jobDb.jobPosting.create({
      data: {
        job_title_id: jobTitle.id,
        department_id,
        job_description,
        qualifications,
        technical_competencies,
        salary_range,
        employment_type: toPrismaEmploymentType(employment_type) as any,
        num_vacancies: Number(num_vacancies ?? 1),
        application_deadline: toDate(application_deadline),
        posting_status: posting_status as any,
        experience_level: experience_level as any,
        job_category: job_category as any,
        created_by: (req as any).user?.id
      }
    });

    const withIncludes = await jobDb.jobPosting.findUnique({
      where: { id: created.id },
      include: {
        job_title: true,
        department: true,
        created_by_user: true,
        _count: { select: { job_applications: true } }
      }
    });

    res.status(201).json({ success: true, data: mapPostingToDto(withIncludes) });
  }
  static async getAllJobPostings(req: Request, res: Response) {
    const items = await jobDb.jobPosting.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        job_title: true,
        department: true,
        created_by_user: true,
        _count: { select: { job_applications: true } }
      }
    });
    res.json({ success: true, data: items.map(mapPostingToDto) });
  }
  static async getJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    const item = await jobDb.jobPosting.findUnique({
      where: { id },
      include: {
        job_title: true,
        department: true,
        created_by_user: true,
        _count: { select: { job_applications: true } }
      }
    });
    if (!item) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: mapPostingToDto(item) });
  }
  static async updateJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    const {
      position_title,
      department_id,
      job_description,
      qualifications,
      technical_competencies,
      salary_range,
      employment_type,
      num_vacancies,
      application_deadline,
      posting_status,
      experience_level,
      job_category
    } = req.body as any;

    const jobTitle = position_title
      ? await jobDb.jobTitle.upsert({
          where: { title: position_title },
          update: { employment_type: toPrismaEmploymentType(employment_type) },
          create: { title: position_title, employment_type: toPrismaEmploymentType(employment_type) }
        })
      : null;

    const updated = await jobDb.jobPosting.update({
      where: { id },
      data: {
        ...(jobTitle ? { job_title_id: jobTitle.id } : {}),
        ...(department_id ? { department_id } : {}),
        ...(job_description ? { job_description } : {}),
        ...(qualifications ? { qualifications } : {}),
        ...(technical_competencies !== undefined ? { technical_competencies } : {}),
        ...(salary_range !== undefined ? { salary_range } : {}),
        ...(employment_type ? { employment_type: toPrismaEmploymentType(employment_type) as any } : {}),
        ...(num_vacancies !== undefined ? { num_vacancies: Number(num_vacancies) } : {}),
        ...(application_deadline ? { application_deadline: toDate(application_deadline) } : {}),
        ...(posting_status ? { posting_status: posting_status as any } : {}),
        ...(experience_level ? { experience_level: experience_level as any } : {}),
        ...(job_category ? { job_category: job_category as any } : {})
      }
    });

    const withIncludes = await jobDb.jobPosting.findUnique({
      where: { id: updated.id },
      include: {
        job_title: true,
        department: true,
        created_by_user: true,
        _count: { select: { job_applications: true } }
      }
    });

    res.json({ success: true, data: mapPostingToDto(withIncludes) });
  }
  static async updateJobPostingStatus(req: Request, res: Response) {
    const { id } = req.params as any;
    const { status } = req.body as any;
    const updated = await jobDb.jobPosting.update({ where: { id }, data: { posting_status: status as any } });
    const withIncludes = await jobDb.jobPosting.findUnique({
      where: { id: updated.id },
      include: { job_title: true, department: true, created_by_user: true, _count: { select: { job_applications: true } } }
    });
    res.json({ success: true, data: mapPostingToDto(withIncludes) });
  }
  static async deleteJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    await jobDb.jobPosting.delete({ where: { id } });
    res.json({ success: true });
  }

  static async getAllApplications(req: Request, res: Response) {
    const items = await jobDb.jobApplication.findMany({ orderBy: [{ id: 'desc' }] });
    res.json({ success: true, data: items });
  }
  static async getApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const item = await jobDb.jobApplication.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: item });
  }
  static async updateApplicationStatus(req: Request, res: Response) {
    const { id } = req.params as any;
    const { status } = req.body as any;
    const updated = await jobDb.jobApplication.update({ where: { id }, data: { status } });
    res.json({ success: true, data: updated });
  }

  static async getDashboard(req: Request, res: Response) {
    const [postings, applications] = await Promise.all([
      jobDb.jobPosting.count(),
      jobDb.jobApplication.count()
    ]);
    res.json({ success: true, data: { postings, applications } });
  }

  static async getDepartments(req: Request, res: Response) {
    const depts = await jobDb.department.findMany({ orderBy: { department_name: 'asc' } });
    res.json({ success: true, data: depts });
  }
  static async getSalaryRanges(req: Request, res: Response) {
    const ranges = [
      { id: '1', range: '₱15,000 - ₱25,000', min: 15000, max: 25000 },
      { id: '2', range: '₱25,000 - ₱35,000', min: 25000, max: 35000 },
      { id: '3', range: '₱35,000 - ₱45,000', min: 35000, max: 45000 },
      { id: '4', range: '₱45,000 - ₱55,000', min: 45000, max: 55000 },
      { id: '5', range: '₱55,000 - ₱65,000', min: 55000, max: 65000 },
      { id: '6', range: '₱65,000 - ₱75,000', min: 65000, max: 75000 },
      { id: '7', range: '₱75,000 - ₱85,000', min: 75000, max: 85000 },
      { id: '8', range: '₱85,000 - ₱95,000', min: 85000, max: 95000 },
      { id: '9', range: '₱95,000 - ₱105,000', min: 95000, max: 105000 },
      { id: '10', range: '₱105,000+', min: 105000, max: null }
    ];
    res.json({ success: true, data: ranges });
  }
}


