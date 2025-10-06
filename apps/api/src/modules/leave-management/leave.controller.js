"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveController = void 0;
const clients_1 = require("../../db/clients");
class LeaveController {
    static async getLeaveApplications(req, res) {
        const { status, leave_type_id, personnel_id, start_date, end_date, page = 1, limit = 10 } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (leave_type_id)
            where.leave_type_id = leave_type_id;
        if (personnel_id)
            where.personnel_id = personnel_id;
        if (start_date && end_date) {
            where.start_date = { gte: new Date(start_date), lte: new Date(end_date) };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [applications, total] = await Promise.all([
            clients_1.leaveDb.leaveApplication.findMany({
                where,
                include: {
                    leave_type: true
                },
                skip,
                take,
                orderBy: { request_date: 'desc' }
            }),
            clients_1.leaveDb.leaveApplication.count({ where })
        ]);
        res.json({ success: true, data: applications, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
    }
    static async getMyLeaveApplications(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const applications = await clients_1.leaveDb.leaveApplication.findMany({
            where: { personnel_id: personnel.id },
            include: { leave_type: true },
            orderBy: { request_date: 'desc' }
        });
        res.json({ success: true, data: applications });
    }
    static async getPendingApplications(req, res) {
        const applications = await clients_1.leaveDb.leaveApplication.findMany({
            where: { status: 'Pending' },
            include: { leave_type: true },
            orderBy: { request_date: 'asc' }
        });
        res.json({ success: true, data: applications });
    }
    static async createLeaveApplication(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const { leave_type_id, start_date, end_date, reason } = req.body;
        // If multipart upload was used, multer adds req.file
        // Persist only the stored filename; frontend can reconstruct URL
        const uploadedFileName = req.file?.filename;
        if (!leave_type_id || !start_date || !end_date)
            return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const total_days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
        const application = await clients_1.leaveDb.leaveApplication.create({
            data: {
                personnel_id: personnel.id,
                leave_type_id,
                start_date: startDate,
                end_date: endDate,
                total_days,
                reason,
                supporting_document: uploadedFileName ?? req.body.supporting_document ?? undefined,
                status: 'Pending'
            },
            include: { leave_type: true }
        });
        res.status(201).json({ success: true, data: application });
    }
    static async updateLeaveApplication(req, res) {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const existing = await clients_1.leaveDb.leaveApplication.findFirst({ where: { id, personnel_id: personnel.id, status: 'Pending' } });
        if (!existing)
            return res.status(404).json({ success: false, error: { message: 'Application not found or cannot be updated' } });
        const { leave_type_id, start_date, end_date, reason, supporting_document } = req.body;
        let total_days = existing.total_days;
        if (start_date && end_date) {
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            total_days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
        }
        const application = await clients_1.leaveDb.leaveApplication.update({
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
    static async cancelLeaveApplication(req, res) {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const existing = await clients_1.leaveDb.leaveApplication.findFirst({ where: { id, personnel_id: personnel.id, status: 'Pending' } });
        if (!existing)
            return res.status(404).json({ success: false, error: { message: 'Application not found or cannot be cancelled' } });
        await clients_1.leaveDb.leaveApplication.delete({ where: { id } });
        res.json({ success: true, message: 'Leave application cancelled successfully' });
    }
    static async approveLeaveApplication(req, res) {
        const { id } = req.params;
        const { comments } = req.body;
        const application = await clients_1.leaveDb.leaveApplication.findUnique({ where: { id }, include: { leave_type: true } });
        if (!application)
            return res.status(404).json({ success: false, error: { message: 'Application not found' } });
        if (application.status !== 'Pending')
            return res.status(400).json({ success: false, error: { message: 'Application is not pending approval' } });
        const updated = await clients_1.leaveDb.leaveApplication.update({
            where: { id },
            data: { status: 'Approved', approved_by: req.user?.id, approval_date: new Date(), approval_comments: comments }
        });
        const currentYear = new Date().getFullYear().toString();
        await clients_1.leaveDb.leaveBalance.updateMany({
            where: { personnel_id: application.personnel_id, leave_type_id: application.leave_type_id, year: currentYear },
            data: { used_credits: { increment: application.total_days }, last_updated: new Date() }
        });
        res.json({ success: true, data: updated });
    }
    static async rejectLeaveApplication(req, res) {
        const { id } = req.params;
        const { comments } = req.body;
        const application = await clients_1.leaveDb.leaveApplication.findUnique({ where: { id } });
        if (!application)
            return res.status(404).json({ success: false, error: { message: 'Application not found' } });
        if (application.status !== 'Pending')
            return res.status(400).json({ success: false, error: { message: 'Application is not pending approval' } });
        const updated = await clients_1.leaveDb.leaveApplication.update({ where: { id }, data: { status: 'Rejected', approved_by: req.user?.id, approval_date: new Date(), approval_comments: comments } });
        res.json({ success: true, data: updated });
    }
    static async getLeaveTypes(req, res) {
        const types = await clients_1.leaveDb.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
        res.json({ success: true, data: types });
    }
    static async createLeaveType(req, res) {
        const { leave_type_name, description, requires_document, max_days } = req.body;
        if (!leave_type_name)
            return res.status(400).json({ success: false, error: { message: 'Leave type name is required' } });
        const type = await clients_1.leaveDb.leaveType.create({
            data: { leave_type_name, description, requires_document: requires_document || false, max_days, is_active: true }
        });
        res.status(201).json({ success: true, data: type });
    }
    static async updateLeaveType(req, res) {
        const { id } = req.params;
        const { leave_type_name, description, requires_document, max_days, is_active } = req.body;
        const type = await clients_1.leaveDb.leaveType.update({ where: { id }, data: { leave_type_name, description, requires_document, max_days, is_active } });
        res.json({ success: true, data: type });
    }
    static async deleteLeaveType(req, res) {
        const { id } = req.params;
        const usedInApplications = await clients_1.leaveDb.leaveApplication.findFirst({ where: { leave_type_id: id } });
        if (usedInApplications)
            return res.status(400).json({ success: false, error: { message: 'Cannot delete leave type that is being used in leave applications' } });
        const usedInBalances = await clients_1.leaveDb.leaveBalance.findFirst({ where: { leave_type_id: id } });
        if (usedInBalances)
            return res.status(400).json({ success: false, error: { message: 'Cannot delete leave type that has associated leave balances' } });
        const type = await clients_1.leaveDb.leaveType.delete({ where: { id } });
        res.json({ success: true, data: type });
    }
    static async getMyLeaveBalance(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const year = new Date().getFullYear().toString();
        const balances = await clients_1.leaveDb.leaveBalance.findMany({
            where: { personnel_id: personnel.id, year },
            include: { leave_type: true },
            orderBy: { leave_type: { leave_type_name: 'asc' } }
        });
        res.json({ success: true, data: balances });
    }
    static async getPersonnelLeaveBalance(req, res) {
        const { personnel_id } = req.params;
        const { year = new Date().getFullYear().toString() } = req.query;
        const balances = await clients_1.leaveDb.leaveBalance.findMany({
            where: { personnel_id, year },
            include: { leave_type: true },
            orderBy: { leave_type: { leave_type_name: 'asc' } }
        });
        res.json({ success: true, data: balances });
    }
    static async initializeLeaveBalance(req, res) {
        const { personnel_id, year, leave_type_id, total_credits } = req.body;
        if (!personnel_id || !year || !leave_type_id || total_credits === undefined)
            return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
        const balance = await clients_1.leaveDb.leaveBalance.upsert({
            where: { personnel_id_leave_type_id_year: { personnel_id, leave_type_id, year } },
            update: { total_credits, last_updated: new Date() },
            create: { personnel_id, leave_type_id, year, total_credits, used_credits: 0, earned_credits: 0 },
            include: { leave_type: true }
        });
        res.status(201).json({ success: true, data: balance });
    }
    static async bulkInitializeLeaveBalances(req, res) {
        const { year } = req.body;
        const currentYear = year || new Date().getFullYear().toString();
        const allPersonnel = await clients_1.personnel.personnel.findMany({
            select: { id: true, first_name: true, last_name: true },
            orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }]
        });
        const allLeaveTypes = await clients_1.leaveDb.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
        const existingBalances = await clients_1.leaveDb.leaveBalance.findMany({ where: { year: currentYear }, select: { personnel_id: true, leave_type_id: true } });
        const existingSet = new Set(existingBalances.map(b => `${b.personnel_id}-${b.leave_type_id}`));
        const bulkCreateData = [];
        let initializedCount = 0;
        for (const person of allPersonnel) {
            for (const lt of allLeaveTypes) {
                const key = `${person.id}-${lt.id}`;
                if (existingSet.has(key))
                    continue;
                let defaultCredits = 0;
                if (lt.leave_type_name === 'Vacation Leave')
                    defaultCredits = 15;
                else if (lt.leave_type_name === 'Sick Leave')
                    defaultCredits = 15;
                else if (lt.leave_type_name === 'Maternity Leave')
                    defaultCredits = 105;
                else if (lt.leave_type_name === 'Paternity Leave')
                    defaultCredits = 7;
                else if (lt.leave_type_name === 'Personal Leave')
                    defaultCredits = 3;
                bulkCreateData.push({ personnel_id: person.id, leave_type_id: lt.id, year: currentYear, total_credits: defaultCredits, used_credits: 0, earned_credits: 0, last_updated: new Date() });
                initializedCount++;
            }
        }
        if (bulkCreateData.length > 0) {
            await clients_1.leaveDb.leaveBalance.createMany({ data: bulkCreateData, skipDuplicates: true });
        }
        res.json({ success: true, data: { year: currentYear, initializedCount } });
    }
    static async previewBulkInitializeLeaveBalances(req, res) {
        const { year } = req.query;
        const currentYear = year || new Date().getFullYear().toString();
        const allPersonnel = await clients_1.personnel.personnel.findMany({ select: { id: true, first_name: true, last_name: true }, orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }] });
        const allLeaveTypes = await clients_1.leaveDb.leaveType.findMany({ orderBy: { leave_type_name: 'asc' } });
        const existingBalances = await clients_1.leaveDb.leaveBalance.findMany({ where: { year: currentYear }, select: { personnel_id: true, leave_type_id: true } });
        const existingSet = new Set(existingBalances.map(b => `${b.personnel_id}-${b.leave_type_id}`));
        let potentialInitializedCount = 0;
        for (const person of allPersonnel) {
            for (const lt of allLeaveTypes) {
                const key = `${person.id}-${lt.id}`;
                if (!existingSet.has(key))
                    potentialInitializedCount++;
            }
        }
        res.json({ success: true, data: { year: currentYear, personnelCount: allPersonnel.length, leaveTypeCount: allLeaveTypes.length, potentialInitializedCount } });
    }
    static async getLeaveMonetization(req, res) {
        const { status, personnel_id, page = 1, limit = 10 } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (personnel_id)
            where.personnel_id = personnel_id;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [requests, total] = await Promise.all([
            clients_1.leaveDb.leaveMonetization.findMany({
                where,
                include: { leave_type: true },
                skip,
                take,
                orderBy: { request_date: 'desc' }
            }),
            clients_1.leaveDb.leaveMonetization.count({ where })
        ]);
        res.json({ success: true, data: { requests, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } } });
    }
    static async createLeaveMonetization(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, error: { message: 'Personnel record not found' } });
        const { leave_type_id, days_to_monetize } = req.body;
        if (!leave_type_id || !days_to_monetize)
            return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
        const request = await clients_1.leaveDb.leaveMonetization.create({ data: { personnel_id: personnel.id, leave_type_id, days_to_monetize, status: 'Pending' }, include: { leave_type: true } });
        res.status(201).json({ success: true, data: request });
    }
    static async approveLeaveMonetization(req, res) {
        const { id } = req.params;
        const { amount } = req.body;
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        const request = await clients_1.leaveDb.leaveMonetization.update({ where: { id }, data: { status: 'Approved', amount, approved_by: userId, approval_date: new Date() }, include: { leave_type: true } });
        res.json({ success: true, data: request });
    }
    static async getLeaveSummaryReport(req, res) {
        const { start_date, end_date, department_id, leave_type_id } = req.query;
        const where = {};
        if (start_date && end_date)
            where.start_date = { gte: new Date(start_date), lte: new Date(end_date) };
        if (leave_type_id)
            where.leave_type_id = leave_type_id;
        if (department_id)
            where.personnel = { department_id };
        const [totalApplications, approvedApplications, pendingApplications, rejectedApplications, byLeaveType] = await Promise.all([
            clients_1.leaveDb.leaveApplication.count({ where }),
            clients_1.leaveDb.leaveApplication.count({ where: { ...where, status: 'Approved' } }),
            clients_1.leaveDb.leaveApplication.count({ where: { ...where, status: 'Pending' } }),
            clients_1.leaveDb.leaveApplication.count({ where: { ...where, status: 'Rejected' } }),
            clients_1.leaveDb.leaveApplication.groupBy({ by: ['leave_type_id'], where, _count: { id: true }, _sum: { total_days: true } })
        ]);
        res.json({ success: true, data: { total_applications: totalApplications, approved: approvedApplications, pending: pendingApplications, rejected: rejectedApplications, by_leave_type: byLeaveType } });
    }
    static async getLeaveBalanceReport(req, res) {
        const { department_id, year = new Date().getFullYear().toString(), page = 1, limit = 10, search } = req.query;
        const where = { year };
        if (department_id)
            where.personnel = { department_id };
        if (search)
            where.personnel = { ...where.personnel, OR: [{ first_name: { contains: search, mode: 'insensitive' } }, { last_name: { contains: search, mode: 'insensitive' } }] };
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [balances, total] = await Promise.all([
            clients_1.leaveDb.leaveBalance.findMany({
                where,
                include: { leave_type: true },
                skip,
                take,
                orderBy: [{ leave_type: { leave_type_name: 'asc' } }]
            }),
            clients_1.leaveDb.leaveBalance.count({ where })
        ]);
        res.json({ success: true, data: balances, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
    }
    // ==================== LEAVE CREDIT ADJUSTMENTS ====================
    static async createLeaveAdjustment(req, res) {
        const { personnel_id, leave_type_id, year, adjustment_type, adjustment_amount, reason } = req.body;
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
        if (!personnel_id || !leave_type_id || !year || !adjustment_type || !adjustment_amount || !reason) {
            return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
        }
        if (!['increase', 'decrease'].includes(adjustment_type)) {
            return res.status(400).json({ success: false, error: { message: 'Invalid adjustment type' } });
        }
        if (Number(adjustment_amount) <= 0) {
            return res.status(400).json({ success: false, error: { message: 'Adjustment amount must be greater than 0' } });
        }
        const currentBalance = await clients_1.leaveDb.leaveBalance.findUnique({
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
        const result = await clients_1.leaveDb.$transaction(async (tx) => {
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
    static async getLeaveAdjustments(req, res) {
        const { personnel_id, leave_type_id, year, adjustment_type, page = 1, limit = 10 } = req.query;
        const where = {};
        if (personnel_id)
            where.personnel_id = personnel_id;
        if (leave_type_id)
            where.leave_type_id = leave_type_id;
        if (year)
            where.year = year;
        if (adjustment_type)
            where.adjustment_type = adjustment_type;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [items, total] = await Promise.all([
            clients_1.leaveDb.leaveAdjustment.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
            clients_1.leaveDb.leaveAdjustment.count({ where })
        ]);
        res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
    }
    static async getPersonnelAdjustments(req, res) {
        const { personnel_id } = req.params;
        const { year = new Date().getFullYear().toString(), page = 1, limit = 10 } = req.query;
        const where = { personnel_id, year };
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [items, total] = await Promise.all([
            clients_1.leaveDb.leaveAdjustment.findMany({ where, skip, take, orderBy: { created_at: 'desc' } }),
            clients_1.leaveDb.leaveAdjustment.count({ where })
        ]);
        res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
    }
}
exports.LeaveController = LeaveController;
//# sourceMappingURL=leave.controller.js.map