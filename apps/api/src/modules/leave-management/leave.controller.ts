import { Request, Response } from 'express';
import { prisma } from '@hris/db';
import { AuthRequest } from '../../middleware/auth';

export class LeaveController {
  static async getLeaveApplications(req: Request, res: Response) {
    const { status, leave_type_id, personnel_id, start_date, end_date, page = 1, limit = 10 } = req.query as any;
    const where: any = {};
    if (status) where.status = status;
    if (leave_type_id) where.leave_type_id = leave_type_id;
    if (personnel_id) where.personnel_id = personnel_id;
    if (start_date && end_date) {
      where.start_date = { gte: new Date(start_date), lte: new Date(end_date) };
    }
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [applications, total] = await Promise.all([
      prisma.leaveApplication.findMany({
        where,
        include: {
          personnel: {
            select: { id: true, first_name: true, last_name: true, department: { select: { id: true, department_name: true } } }
          },
          leave_type: true
        },
        skip,
        take,
        orderBy: { request_date: 'desc' }
      }),
      prisma.leaveApplication.count({ where })
    ]);
    res.json({ success: true, data: applications, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
  }

  static async getMyLeaveApplications(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const applications = await prisma.leaveApplication.findMany({
      where: { personnel_id: personnel.id },
      include: { leave_type: true },
      orderBy: { request_date: 'desc' }
    });
    res.json({ success: true, data: applications });
  }

  static async getPendingApplications(req: Request, res: Response) {
    const applications = await prisma.leaveApplication.findMany({
      where: { status: 'Pending' },
      include: {
        personnel: { select: { id: true, first_name: true, last_name: true, department: { select: { id: true, department_name: true } } } },
        leave_type: true
      },
      orderBy: { request_date: 'asc' }
    });
    res.json({ success: true, data: applications });
  }

  static async createLeaveApplication(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const { leave_type_id, start_date, end_date, reason, supporting_document } = req.body;
    if (!leave_type_id || !start_date || !end_date) return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const total_days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    const application = await prisma.leaveApplication.create({
      data: { personnel_id: personnel.id, leave_type_id, start_date: startDate, end_date: endDate, total_days, reason, supporting_document, status: 'Pending' },
      include: { leave_type: true }
    });
    res.status(201).json({ success: true, data: application });
  }

  static async updateLeaveApplication(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const existing = await prisma.leaveApplication.findFirst({ where: { id, personnel_id: personnel.id, status: 'Pending' } });
    if (!existing) return res.status(404).json({ success: false, error: { message: 'Application not found or cannot be updated' } });
    const { leave_type_id, start_date, end_date, reason, supporting_document } = req.body;
    let total_days = existing.total_days;
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      total_days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    }
    const application = await prisma.leaveApplication.update({
      where: { id },
      data: {
        leave_type_id,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined,
        total_days,
        reason,
        supporting_document
      },
      include: { leave_type: true }
    });
    res.json({ success: true, data: application });
  }

  static async cancelLeaveApplication(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const existing = await prisma.leaveApplication.findFirst({ where: { id, personnel_id: personnel.id, status: 'Pending' } });
    if (!existing) return res.status(404).json({ success: false, error: { message: 'Application not found or cannot be cancelled' } });
    await prisma.leaveApplication.delete({ where: { id } });
    res.json({ success: true, message: 'Leave application cancelled successfully' });
  }

  static async approveLeaveApplication(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { comments } = req.body;
    const application = await prisma.leaveApplication.findUnique({ where: { id }, include: { personnel: true, leave_type: true } });
    if (!application) return res.status(404).json({ success: false, error: { message: 'Application not found' } });
    if (application.status !== 'Pending') return res.status(400).json({ success: false, error: { message: 'Application is not pending approval' } });
    const updated = await prisma.leaveApplication.update({
      where: { id },
      data: { status: 'Approved', approved_by: req.user?.id, approval_date: new Date(), approval_comments: comments }
    });
    const currentYear = new Date().getFullYear().toString();
    await prisma.leaveBalance.updateMany({
      where: { personnel_id: application.personnel_id, leave_type_id: application.leave_type_id, year: currentYear },
      data: { used_credits: { increment: application.total_days }, last_updated: new Date() }
    });
    res.json({ success: true, data: updated });
  }

  static async rejectLeaveApplication(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { comments } = req.body;
    const application = await prisma.leaveApplication.findUnique({ where: { id } });
    if (!application) return res.status(404).json({ success: false, error: { message: 'Application not found' } });
    if (application.status !== 'Pending') return res.status(400).json({ success: false, error: { message: 'Application is not pending approval' } });
    const updated = await prisma.leaveApplication.update({ where: { id }, data: { status: 'Rejected', approved_by: req.user?.id, approval_date: new Date(), approval_comments: comments } });
    res.json({ success: true, data: updated });
  }

  static async getLeaveTypes(req: Request, res: Response) {
    const types = await prisma.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
    res.json({ success: true, data: types });
  }

  static async createLeaveType(req: Request, res: Response) {
    const { leave_type_name, description, requires_document, max_days } = req.body;
    if (!leave_type_name) return res.status(400).json({ success: false, error: { message: 'Leave type name is required' } });
    const type = await prisma.leaveType.create({
      data: { leave_type_name, description, requires_document: requires_document || false, max_days, is_active: true }
    });
    res.status(201).json({ success: true, data: type });
  }

  static async updateLeaveType(req: Request, res: Response) {
    const { id } = req.params;
    const { leave_type_name, description, requires_document, max_days, is_active } = req.body;
    const type = await prisma.leaveType.update({ where: { id }, data: { leave_type_name, description, requires_document, max_days, is_active } });
    res.json({ success: true, data: type });
  }

  static async deleteLeaveType(req: Request, res: Response) {
    const { id } = req.params;
    const usedInApplications = await prisma.leaveApplication.findFirst({ where: { leave_type_id: id } });
    if (usedInApplications) return res.status(400).json({ success: false, error: { message: 'Cannot delete leave type that is being used in leave applications' } });
    const usedInBalances = await prisma.leaveBalance.findFirst({ where: { leave_type_id: id } });
    if (usedInBalances) return res.status(400).json({ success: false, error: { message: 'Cannot delete leave type that has associated leave balances' } });
    const type = await prisma.leaveType.delete({ where: { id } });
    res.json({ success: true, data: type });
  }

  static async getMyLeaveBalance(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const year = new Date().getFullYear().toString();
    const balances = await prisma.leaveBalance.findMany({
      where: { personnel_id: personnel.id, year },
      include: { leave_type: true },
      orderBy: { leave_type: { leave_type_name: 'asc' } }
    });
    res.json({ success: true, data: balances });
  }

  static async getPersonnelLeaveBalance(req: Request, res: Response) {
    const { personnel_id } = req.params as any;
    const { year = new Date().getFullYear().toString() } = req.query as any;
    const balances = await prisma.leaveBalance.findMany({
      where: { personnel_id, year },
      include: { leave_type: true, personnel: { select: { first_name: true, last_name: true } } },
      orderBy: { leave_type: { leave_type_name: 'asc' } }
    });
    res.json({ success: true, data: balances });
  }

  static async initializeLeaveBalance(req: Request, res: Response) {
    const { personnel_id, year, leave_type_id, total_credits } = req.body;
    if (!personnel_id || !year || !leave_type_id || total_credits === undefined) return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
    const balance = await prisma.leaveBalance.upsert({
      where: { personnel_id_leave_type_id_year: { personnel_id, leave_type_id, year } },
      update: { total_credits, last_updated: new Date() },
      create: { personnel_id, leave_type_id, year, total_credits, used_credits: 0, earned_credits: 0 },
      include: { leave_type: true, personnel: { select: { first_name: true, last_name: true } } }
    });
    res.status(201).json({ success: true, data: balance });
  }

  static async bulkInitializeLeaveBalances(req: Request, res: Response) {
    const { year } = req.body as any;
    const currentYear = year || new Date().getFullYear().toString();
    const allPersonnel = await prisma.personnel.findMany({
      where: { user: { status: 'Active' } },
      select: { id: true, first_name: true, last_name: true, department: { select: { department_name: true } } },
      orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }]
    });
    const allLeaveTypes = await prisma.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
    const existingBalances = await prisma.leaveBalance.findMany({ where: { year: currentYear }, select: { personnel_id: true, leave_type_id: true } });
    const existingSet = new Set(existingBalances.map(b => `${b.personnel_id}-${b.leave_type_id}`));
    const bulkCreateData: any[] = [];
    let initializedCount = 0;
    for (const person of allPersonnel) {
      for (const lt of allLeaveTypes) {
        const key = `${person.id}-${lt.id}`;
        if (existingSet.has(key)) continue;
        let defaultCredits = 0;
        if (lt.leave_type_name === 'Vacation Leave') defaultCredits = 15;
        else if (lt.leave_type_name === 'Sick Leave') defaultCredits = 15;
        else if (lt.leave_type_name === 'Maternity Leave') defaultCredits = 105;
        else if (lt.leave_type_name === 'Paternity Leave') defaultCredits = 7;
        else if (lt.leave_type_name === 'Personal Leave') defaultCredits = 3;
        bulkCreateData.push({ personnel_id: person.id, leave_type_id: lt.id, year: currentYear, total_credits: defaultCredits, used_credits: 0, earned_credits: 0, last_updated: new Date() });
        initializedCount++;
      }
    }
    if (bulkCreateData.length > 0) {
      await prisma.leaveBalance.createMany({ data: bulkCreateData, skipDuplicates: true });
    }
    res.json({ success: true, data: { year: currentYear, initializedCount } });
  }

  static async previewBulkInitializeLeaveBalances(req: Request, res: Response) {
    const { year } = req.query as any;
    const currentYear = year || new Date().getFullYear().toString();
    const allPersonnel = await prisma.personnel.findMany({ where: { user: { status: 'Active' } }, select: { id: true, first_name: true, last_name: true, department: { select: { department_name: true } } }, orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }] });
    const allLeaveTypes = await prisma.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
    const existingBalances = await prisma.leaveBalance.findMany({ where: { year: currentYear }, select: { personnel_id: true, leave_type_id: true } });
    const existingSet = new Set(existingBalances.map(b => `${b.personnel_id}-${b.leave_type_id}`));
    let potentialInitializedCount = 0;
    for (const person of allPersonnel) {
      for (const lt of allLeaveTypes) {
        const key = `${person.id}-${lt.id}`;
        if (!existingSet.has(key)) potentialInitializedCount++;
      }
    }
    res.json({ success: true, data: { year: currentYear, personnelCount: allPersonnel.length, leaveTypeCount: allLeaveTypes.length, potentialInitializedCount } });
  }

  static async getLeaveMonetization(req: Request, res: Response) {
    const { status, personnel_id, page = 1, limit = 10 } = req.query as any;
    const where: any = {};
    if (status) where.status = status;
    if (personnel_id) where.personnel_id = personnel_id;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [requests, total] = await Promise.all([
      prisma.leaveMonetization.findMany({
        where,
        include: { personnel: { select: { id: true, first_name: true, last_name: true } }, leave_type: true },
        skip,
        take,
        orderBy: { request_date: 'desc' }
      }),
      prisma.leaveMonetization.count({ where })
    ]);
    res.json({ success: true, data: { requests, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } } });
  }

  static async createLeaveMonetization(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const personnel = await prisma.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
    const { leave_type_id, days_to_monetize } = req.body;
    if (!leave_type_id || !days_to_monetize) return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
    const request = await prisma.leaveMonetization.create({ data: { personnel_id: personnel.id, leave_type_id, days_to_monetize, status: 'Pending' }, include: { leave_type: true } });
    res.status(201).json({ success: true, data: request });
  }

  static async approveLeaveMonetization(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    const request = await prisma.leaveMonetization.update({ where: { id }, data: { status: 'Approved', amount, approved_by: userId, approval_date: new Date() }, include: { leave_type: true, personnel: { select: { first_name: true, last_name: true } } } });
    res.json({ success: true, data: request });
  }

  static async getLeaveSummaryReport(req: Request, res: Response) {
    const { start_date, end_date, department_id, leave_type_id } = req.query as any;
    const where: any = {};
    if (start_date && end_date) where.start_date = { gte: new Date(start_date), lte: new Date(end_date) };
    if (leave_type_id) where.leave_type_id = leave_type_id;
    if (department_id) where.personnel = { department_id };
    const [totalApplications, approvedApplications, pendingApplications, rejectedApplications, byLeaveType, byDepartment] = await Promise.all([
      prisma.leaveApplication.count({ where }),
      prisma.leaveApplication.count({ where: { ...where, status: 'Approved' } }),
      prisma.leaveApplication.count({ where: { ...where, status: 'Pending' } }),
      prisma.leaveApplication.count({ where: { ...where, status: 'Rejected' } }),
      prisma.leaveApplication.groupBy({ by: ['leave_type_id'], where, _count: { id: true }, _sum: { total_days: true } }),
      prisma.leaveApplication.groupBy({ by: ['personnel_id'], where, _count: { id: true }, _sum: { total_days: true } })
    ]);
    res.json({ success: true, data: { total_applications: totalApplications, approved: approvedApplications, pending: pendingApplications, rejected: rejectedApplications, by_leave_type: byLeaveType, by_department: byDepartment } });
  }

  static async getLeaveBalanceReport(req: Request, res: Response) {
    const { department_id, year = new Date().getFullYear().toString(), page = 1, limit = 10, search } = req.query as any;
    const where: any = { year };
    if (department_id) where.personnel = { department_id };
    if (search) where.personnel = { ...where.personnel, OR: [ { first_name: { contains: search, mode: 'insensitive' } }, { last_name: { contains: search, mode: 'insensitive' } } ] };
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [balances, total] = await Promise.all([
      prisma.leaveBalance.findMany({
        where,
        include: { personnel: { select: { id: true, first_name: true, last_name: true, department: { select: { id: true, department_name: true } } } }, leave_type: true },
        skip,
        take,
        orderBy: [ { personnel: { department: { department_name: 'asc' } } }, { personnel: { last_name: 'asc' } } ]
      }),
      prisma.leaveBalance.count({ where })
    ]);
    res.json({ success: true, data: balances, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
  }

  // ==================== LEAVE CREDIT ADJUSTMENTS ====================
  static async createLeaveAdjustment(req: AuthRequest, res: Response) {
    const { personnel_id, leave_type_id, year, adjustment_type, adjustment_amount, reason } = req.body as any;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    if (!personnel_id || !leave_type_id || !year || !adjustment_type || !adjustment_amount || !reason) {
      return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
    }
    if (!['increase', 'decrease'].includes(adjustment_type)) {
      return res.status(400).json({ success: false, error: { message: 'Invalid adjustment type' } });
    }
    if (Number(adjustment_amount) <= 0) {
      return res.status(400).json({ success: false, error: { message: 'Adjustment amount must be greater than 0' } });
    }
    const currentBalance = await prisma.leaveBalance.findUnique({
      where: { personnel_id_leave_type_id_year: { personnel_id, leave_type_id, year } }
    });
    if (!currentBalance) {
      return res.status(404).json({ success: false, error: { message: 'Leave balance not found' } });
    }
    const previousBalance = currentBalance.total_credits;
    const newBalance = adjustment_type === 'increase' ? previousBalance + Number(adjustment_amount) : previousBalance - Number(adjustment_amount);
    if (newBalance < 0) {
      return res.status(400).json({ success: false, error: { message: 'Adjustment would result in negative balance' } });
    }
    const result = await prisma.$transaction(async (tx) => {
      const adjustment = await tx.leaveAdjustment.create({
        data: {
          personnel_id,
          leave_type_id,
          year,
          adjustment_type,
          adjustment_amount: Number(adjustment_amount),
          reason,
          previous_balance: previousBalance,
          new_balance: newBalance,
          created_by: userId
        }
      });
      await tx.leaveBalance.update({
        where: { personnel_id_leave_type_id_year: { personnel_id, leave_type_id, year } },
        data: { total_credits: newBalance, last_updated: new Date() }
      });
      return adjustment;
    });
    res.status(201).json({ success: true, data: result });
  }

  static async getLeaveAdjustments(req: Request, res: Response) {
    const { personnel_id, leave_type_id, year, adjustment_type, page = 1, limit = 10 } = req.query as any;
    const where: any = {};
    if (personnel_id) where.personnel_id = personnel_id;
    if (leave_type_id) where.leave_type_id = leave_type_id;
    if (year) where.year = year;
    if (adjustment_type) where.adjustment_type = adjustment_type;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [items, total] = await Promise.all([
      prisma.leaveAdjustment.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
      prisma.leaveAdjustment.count({ where })
    ]);
    res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
  }

  static async getPersonnelAdjustments(req: Request, res: Response) {
    const { personnel_id } = req.params as any;
    const { year = new Date().getFullYear().toString(), page = 1, limit = 10 } = req.query as any;
    const where: any = { personnel_id, year };
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [items, total] = await Promise.all([
      prisma.leaveAdjustment.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
      prisma.leaveAdjustment.count({ where })
    ]);
    res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
  }
}


