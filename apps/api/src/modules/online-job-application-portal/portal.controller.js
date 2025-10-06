"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPortalController = void 0;
const clients_1 = require("../../db/clients");
class JobPortalController {
    // Diagnostics
    static async testDatabase(req, res) {
        const now = await clients_1.job.$queryRaw `SELECT NOW()`;
        res.json({ success: true, data: now });
    }
    // Auth & profile (minimal stubs)
    static async register(req, res) { res.status(201).json({ success: true }); }
    static async login(req, res) { res.json({ success: true, token: 'stub' }); }
    static async getProfile(req, res) { res.json({ success: true, data: {} }); }
    static async getCurrentApplicantProfile(req, res) { res.json({ success: true, data: {} }); }
    static async updateProfile(req, res) { res.json({ success: true }); }
    static async checkProfileCompletion(req, res) { res.json({ success: true, complete: false }); }
    // Jobs
    static async listJobs(req, res) {
        try {
            const { keywords, department, salary_range } = req.query;
            // Build where clause for filtering
            const where = {
                posting_status: 'Published' // Only show published jobs
            };
            // Add keyword search
            if (keywords) {
                where.OR = [
                    { position_title: { contains: keywords, mode: 'insensitive' } },
                    { job_description: { contains: keywords, mode: 'insensitive' } },
                    { qualifications: { contains: keywords, mode: 'insensitive' } }
                ];
            }
            // Add department filter
            if (department) {
                where.department = {
                    department_name: { contains: department, mode: 'insensitive' }
                };
            }
            // Add salary range filter
            if (salary_range) {
                where.salary_range = { contains: salary_range, mode: 'insensitive' };
            }
            const jobs = await clients_1.job.jobPosting.findMany({
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
            const transformedJobs = jobs.map((job) => ({
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
        }
        catch (error) {
            console.error('Error fetching jobs:', error);
            res.status(500).json({ success: false, error: { message: 'Failed to fetch jobs' } });
        }
    }
    static async getJob(req, res) {
        try {
            const { id } = req.params;
            const jobPosting = await clients_1.job.jobPosting.findUnique({
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
        }
        catch (error) {
            console.error('Error fetching job:', error);
            res.status(500).json({ success: false, error: { message: 'Failed to fetch job' } });
        }
    }
    static async createJobPosting(req, res) {
        const created = await clients_1.job.jobPosting.create({ data: req.body });
        res.status(201).json({ success: true, data: created });
    }
    static async getSalaryRanges(req, res) {
        try {
            // Get unique salary ranges from job postings
            const salaryRanges = await clients_1.job.jobPosting.findMany({
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
                .map((job) => job.salary_range)
                .filter((range) => range && range.trim() !== '')
                .sort();
            res.json({ success: true, data: ranges });
        }
        catch (error) {
            console.error('Error fetching salary ranges:', error);
            res.status(500).json({ success: false, error: { message: 'Failed to fetch salary ranges' } });
        }
    }
    static async getDepartments(req, res) {
        try {
            // Get departments that have published job postings
            const departments = await clients_1.job.department.findMany({
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
            const departmentNames = departments.map((dept) => dept.department_name);
            res.json({ success: true, data: departmentNames });
        }
        catch (error) {
            console.error('Error fetching departments:', error);
            res.status(500).json({ success: false, error: { message: 'Failed to fetch departments' } });
        }
    }
    // Applications
    static async startApplication(req, res) {
        const created = await clients_1.job.jobApplication.create({ data: req.body });
        res.status(201).json({ success: true, data: created });
    }
    static async uploadDocuments(req, res) { res.status(201).json({ success: true }); }
    static async answerQuestions(req, res) { res.json({ success: true }); }
    static async submitApplication(req, res) { res.json({ success: true }); }
    static async listApplications(req, res) {
        const apps = await clients_1.job.jobApplication.findMany({ orderBy: [{ id: 'desc' }] });
        res.json({ success: true, data: apps });
    }
    static async getApplication(req, res) {
        const { id } = req.params;
        const app = await clients_1.job.jobApplication.findUnique({ where: { id } });
        if (!app)
            return res.status(404).json({ success: false, error: { message: 'Not found' } });
        res.json({ success: true, data: app });
    }
    static async editApplication(req, res) {
        const { id } = req.params;
        const updated = await clients_1.job.jobApplication.update({ where: { id }, data: req.body });
        res.json({ success: true, data: updated });
    }
    static async cancelApplication(req, res) {
        const { id } = req.params;
        await clients_1.job.jobApplication.delete({ where: { id } });
        res.json({ success: true });
    }
    // Notifications
    static async notifyApplicant(req, res) { res.json({ success: true }); }
}
exports.JobPortalController = JobPortalController;
//# sourceMappingURL=portal.controller.js.map