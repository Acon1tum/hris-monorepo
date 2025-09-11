import { Request, Response } from 'express';
import { prisma } from '@hris/db';

export class JobPortalController {
  // Diagnostics
  static async testDatabase(req: Request, res: Response) {
    const now = await prisma.$queryRaw`SELECT NOW()`;
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
    const jobs = await prisma.jobPosting.findMany({
      orderBy: [{ id: 'desc' }]
    });
    res.json({ success: true, data: jobs });
  }
  static async getJob(req: Request, res: Response) {
    const { id } = req.params as any;
    const job = await prisma.jobPosting.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: job });
  }
  static async createJobPosting(req: Request, res: Response) {
    const created = await prisma.jobPosting.create({ data: req.body });
    res.status(201).json({ success: true, data: created });
  }
  static async getSalaryRanges(req: Request, res: Response) {
    const ranges = await prisma.$queryRawUnsafe<any[]>("SELECT * FROM salary_ranges ORDER BY min ASC");
    res.json({ success: true, data: ranges });
  }
  static async getDepartments(req: Request, res: Response) {
    const depts = await prisma.department.findMany({ orderBy: { department_name: 'asc' } });
    res.json({ success: true, data: depts });
  }

  // Applications
  static async startApplication(req: Request, res: Response) {
    const created = await prisma.jobApplication.create({ data: req.body });
    res.status(201).json({ success: true, data: created });
  }
  static async uploadDocuments(req: Request, res: Response) { res.status(201).json({ success: true }); }
  static async answerQuestions(req: Request, res: Response) { res.json({ success: true }); }
  static async submitApplication(req: Request, res: Response) { res.json({ success: true }); }
  static async listApplications(req: Request, res: Response) {
    const apps = await prisma.jobApplication.findMany({ orderBy: [{ id: 'desc' }] });
    res.json({ success: true, data: apps });
  }
  static async getApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const app = await prisma.jobApplication.findUnique({ where: { id } });
    if (!app) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: app });
  }
  static async editApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const updated = await prisma.jobApplication.update({ where: { id }, data: req.body });
    res.json({ success: true, data: updated });
  }
  static async cancelApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    await prisma.jobApplication.delete({ where: { id } });
    res.json({ success: true });
  }

  // Notifications
  static async notifyApplicant(req: Request, res: Response) { res.json({ success: true }); }
}


