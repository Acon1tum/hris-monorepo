"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonnelController = void 0;
const clients_1 = require("../../db/clients");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class PersonnelController {
    static async getAllPersonnel(req, res) {
        const { page = 1, limit = 10, search, department_id } = req.query;
        const where = {};
        if (search) {
            where.OR = [
                { first_name: { contains: search, mode: 'insensitive' } },
                { last_name: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (department_id)
            where.department_id = department_id;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const [items, total] = await Promise.all([
            clients_1.personnel.personnel.findMany({
                where,
                include: { department: true },
                skip,
                take,
                orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }]
            }),
            clients_1.personnel.personnel.count({ where })
        ]);
        res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
    }
    static async getPersonnelStats(req, res) {
        const [total, active, byDept] = await Promise.all([
            clients_1.personnel.personnel.count(),
            clients_1.accounts.user.count({ where: { isActive: true } }),
            clients_1.personnel.personnel.groupBy({ by: ['department_id'], _count: { id: true } })
        ]);
        res.json({ success: true, data: { total, activeUsers: active, byDepartment: byDept } });
    }
    static async getDashboardStats(req, res) {
        const [personnelCount, departments, recentHires] = await Promise.all([
            clients_1.personnel.personnel.count(),
            clients_1.personnel.department.count(),
            clients_1.personnel.personnel.findMany({ orderBy: { date_hired: 'desc' }, take: 5, select: { first_name: true, last_name: true, date_hired: true } })
        ]);
        res.json({ success: true, data: { personnelCount, departments, recentHires } });
    }
    static async getPersonnelById(req, res) {
        const { id } = req.params;
        const person = await clients_1.personnel.personnel.findUnique({ where: { id }, include: { department: true } });
        if (!person)
            return res.status(404).json({ success: false, error: { message: 'Not found' } });
        res.json({ success: true, data: person });
    }
    static async createPersonnel(req, res) {
        try {
            const data = req.body;
            console.log('🔍 Received personnel creation request:', JSON.stringify(data, null, 2));
            // Extract user data from the request
            const { username, email, password, ...personnelData } = data;
            console.log('🔍 Extracted personnel data:', JSON.stringify(personnelData, null, 2));
            // First create the user if user data is provided
            let userId = undefined;
            if (username && email && password) {
                console.log('🔍 Creating user with data:', { username, email, role: 'Employee' });
                const hashedPassword = await bcryptjs_1.default.hash(password, 10);
                const user = await clients_1.accounts.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        isActive: true
                    }
                });
                userId = user.id;
                console.log('✅ User created successfully with ID:', userId);
            }
            else {
                console.log('⚠️ No user data provided, creating personnel without user account');
            }
            // Create personnel record with user_id if user was created
            const personnelRecord = {
                ...personnelData,
                user_id: userId,
                // Convert date strings to Date objects if they exist
                date_of_birth: personnelData.date_of_birth ? new Date(personnelData.date_of_birth) : undefined,
                date_hired: personnelData.date_hired ? new Date(personnelData.date_hired) : undefined
            };
            console.log('🔍 Creating personnel record with data:', JSON.stringify(personnelRecord, null, 2));
            const created = await clients_1.personnel.personnel.create({
                data: personnelRecord,
                include: { department: true }
            });
            console.log('✅ Personnel created successfully:', created.id);
            res.status(201).json({ success: true, data: created });
        }
        catch (error) {
            console.error('Error creating personnel:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Failed to create personnel record' }
            });
        }
    }
    static async updatePersonnel(req, res) {
        const { id } = req.params;
        const data = req.body;
        const updated = await clients_1.personnel.personnel.update({ where: { id }, data });
        res.json({ success: true, data: updated });
    }
    static async deletePersonnel(req, res) {
        const { id } = req.params;
        await clients_1.personnel.personnel.delete({ where: { id } });
        res.json({ success: true, message: 'Deleted' });
    }
    static async getEmploymentHistory(req, res) {
        const { id } = req.params;
        const history = await clients_1.personnel.employmentHistory.findMany({ where: { personnel_id: id }, orderBy: { start_date: 'desc' } });
        res.json({ success: true, data: history });
    }
    static async addEmploymentHistory(req, res) {
        const { id } = req.params;
        const created = await clients_1.personnel.employmentHistory.create({ data: { ...req.body, personnel_id: id } });
        res.status(201).json({ success: true, data: created });
    }
    static async getMembershipData(req, res) {
        const { id } = req.params;
        const membership = await clients_1.personnel.$queryRawUnsafe(`SELECT * FROM membership_data WHERE personnel_id = ${id}`);
        res.json({ success: true, data: membership });
    }
    static async updateMembershipData(req, res) {
        const { id } = req.params;
        const updated = await clients_1.personnel.$executeRawUnsafe(`UPDATE membership_data SET data = data || ${JSON.stringify(req.body)} WHERE personnel_id = ${JSON.stringify(id)}`);
        res.json({ success: true, data: updated });
    }
    static async getMeritsViolations(req, res) {
        const { id } = req.params;
        const items = await clients_1.personnel.meritViolation.findMany({ where: { personnel_id: id }, orderBy: [{ id: 'desc' }] });
        res.json({ success: true, data: items });
    }
    static async addMeritViolation(req, res) {
        const { id } = req.params;
        const created = await clients_1.personnel.meritViolation.create({ data: { ...req.body, personnel_id: id } });
        res.status(201).json({ success: true, data: created });
    }
    static async getAdministrativeCases(req, res) {
        const { id } = req.params;
        const items = await clients_1.personnel.administrativeCase.findMany({ where: { personnel_id: id }, orderBy: { created_at: 'desc' } });
        res.json({ success: true, data: items });
    }
    static async addAdministrativeCase(req, res) {
        const { id } = req.params;
        const created = await clients_1.personnel.administrativeCase.create({ data: { ...req.body, personnel_id: id } });
        res.status(201).json({ success: true, data: created });
    }
    static async getPersonnelMovements(req, res) {
        const { id } = req.params;
        const items = await clients_1.personnel.personnelMovement.findMany({ where: { personnel_id: id }, orderBy: { effective_date: 'desc' } });
        res.json({ success: true, data: items });
    }
    static async addPersonnelMovement(req, res) {
        const { id } = req.params;
        const created = await clients_1.personnel.personnelMovement.create({ data: { ...req.body, personnel_id: id } });
        res.status(201).json({ success: true, data: created });
    }
    static async getDashboardEmployees(req, res) {
        const items = await clients_1.personnel.personnel.findMany({ select: { id: true, first_name: true, last_name: true }, orderBy: [{ last_name: 'asc' }] });
        res.json({ success: true, data: items });
    }
    static async uploadDocuments(req, res) {
        const { id } = req.params;
        const docs = req.body?.documents;
        if (!docs || docs.length === 0)
            return res.status(400).json({ success: false, error: { message: 'No documents provided' } });
        const created = await clients_1.personnel.employeeDocument.createMany({
            data: docs.map(d => ({ personnelId: id, title: d.title, description: null, fileUrl: '', fileType: d.type || 'application/octet-stream', fileSize: 0, category: 'Uploaded', isPrivate: false }))
        });
        res.status(201).json({ success: true, data: created });
    }
    static async getDocuments(req, res) {
        const { id } = req.params;
        const items = await clients_1.personnel.employeeDocument.findMany({ where: { personnelId: id }, orderBy: { createdAt: 'desc' } });
        res.json({ success: true, data: items });
    }
}
exports.PersonnelController = PersonnelController;
//# sourceMappingURL=personnel.controller.js.map