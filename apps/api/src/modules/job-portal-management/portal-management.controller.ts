import { Request, Response } from 'express';
import { prisma } from '@hris/db';

export class JobPortalManagementController {
  static async createJobPosting(req: Request, res: Response) {
    const created = await prisma.jobPosting.create({ data: req.body });
    res.status(201).json({ success: true, data: created });
  }
  static async getAllJobPostings(req: Request, res: Response) {
    const items = await prisma.jobPosting.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ success: true, data: items });
  }
  static async getJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    const item = await prisma.jobPosting.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: item });
  }
  static async updateJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    const updated = await prisma.jobPosting.update({ where: { id }, data: req.body });
    res.json({ success: true, data: updated });
  }
  static async updateJobPostingStatus(req: Request, res: Response) {
    const { id } = req.params as any;
    const { status } = req.body as any;
    const updated = await prisma.jobPosting.update({ where: { id }, data: { status: status as any } as any });
    res.json({ success: true, data: updated });
  }
  static async deleteJobPosting(req: Request, res: Response) {
    const { id } = req.params as any;
    await prisma.jobPosting.delete({ where: { id } });
    res.json({ success: true });
  }

  static async getAllApplications(req: Request, res: Response) {
    const items = await prisma.jobApplication.findMany({ orderBy: [{ id: 'desc' }] });
    res.json({ success: true, data: items });
  }
  static async getApplication(req: Request, res: Response) {
    const { id } = req.params as any;
    const item = await prisma.jobApplication.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: item });
  }
  static async updateApplicationStatus(req: Request, res: Response) {
    const { id } = req.params as any;
    const { status } = req.body as any;
    const updated = await prisma.jobApplication.update({ where: { id }, data: { status } });
    res.json({ success: true, data: updated });
  }

  static async getDashboard(req: Request, res: Response) {
    const [postings, applications] = await Promise.all([
      prisma.jobPosting.count(),
      prisma.jobApplication.count()
    ]);
    res.json({ success: true, data: { postings, applications } });
  }

  static async getDepartments(req: Request, res: Response) {
    const depts = await prisma.department.findMany({ orderBy: { department_name: 'asc' } });
    res.json({ success: true, data: depts });
  }
  static async getSalaryRanges(req: Request, res: Response) {
    const ranges = await prisma.$queryRawUnsafe<any[]>("SELECT * FROM salary_ranges ORDER BY min ASC");
    res.json({ success: true, data: ranges });
  }
}


