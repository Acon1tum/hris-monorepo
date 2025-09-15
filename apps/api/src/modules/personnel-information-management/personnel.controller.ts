import { Request, Response } from 'express';
import { prisma } from '@hris/db';
import bcrypt from 'bcryptjs';

export class PersonnelController {
  static async getAllPersonnel(req: Request, res: Response) {
    const { page = 1, limit = 10, search, department_id } = req.query as any;
    const where: any = {};
    if (search) {
      where.OR = [
        { first_name: { contains: search as string, mode: 'insensitive' } },
        { last_name: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    if (department_id) where.department_id = department_id;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const [items, total] = await Promise.all([
      prisma.personnel.findMany({
        where,
        include: { department: true, user: { select: { status: true } } },
        skip,
        take,
        orderBy: [{ last_name: 'asc' }, { first_name: 'asc' }]
      }),
      prisma.personnel.count({ where })
    ]);
    res.json({ success: true, data: items, pagination: { page: Number(page), limit: Number(limit), total, totalPages: Math.ceil(total / Number(limit)) } });
  }

  static async getPersonnelStats(req: Request, res: Response) {
    const [total, active, byDept] = await Promise.all([
      prisma.personnel.count(),
      prisma.user.count({ where: { status: 'Active' } }),
      prisma.personnel.groupBy({ by: ['department_id'], _count: { id: true } })
    ]);
    res.json({ success: true, data: { total, activeUsers: active, byDepartment: byDept } });
  }

  static async getDashboardStats(req: Request, res: Response) {
    const [personnelCount, departments, recentHires] = await Promise.all([
      prisma.personnel.count(),
      prisma.department.count(),
      prisma.personnel.findMany({ orderBy: { date_hired: 'desc' }, take: 5, select: { first_name: true, last_name: true, date_hired: true } })
    ]);
    res.json({ success: true, data: { personnelCount, departments, recentHires } });
  }

  static async getPersonnelById(req: Request, res: Response) {
    const { id } = req.params as any;
    const person = await prisma.personnel.findUnique({ where: { id }, include: { department: true, user: true } });
    if (!person) return res.status(404).json({ success: false, error: { message: 'Not found' } });
    res.json({ success: true, data: person });
  }

  static async createPersonnel(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log('🔍 Received personnel creation request:', JSON.stringify(data, null, 2));
      
      // Extract user data from the request
      const { username, email, password, ...personnelData } = data;
      console.log('🔍 Extracted personnel data:', JSON.stringify(personnelData, null, 2));
      
      // First create the user if user data is provided
      let userId: string | undefined = undefined;
      if (username && email && password) {
        console.log('🔍 Creating user with data:', { username, email, role: 'Employee' });
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password_hash: hashedPassword,
            role: 'Employee', // Default role for new personnel
            status: 'Active',
            profile_picture: data.profile_picture || null
          }
        });
        userId = user.id;
        console.log('✅ User created successfully with ID:', userId);
      } else {
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
      
      const created = await prisma.personnel.create({ 
        data: personnelRecord,
        include: { department: true, user: true }
      });
      
      console.log('✅ Personnel created successfully:', created.id);
      res.status(201).json({ success: true, data: created });
    } catch (error) {
      console.error('Error creating personnel:', error);
      res.status(500).json({ 
        success: false, 
        error: { message: 'Failed to create personnel record' } 
      });
    }
  }

  static async updatePersonnel(req: Request, res: Response) {
    const { id } = req.params as any;
    const data = req.body;
    const updated = await prisma.personnel.update({ where: { id }, data });
    res.json({ success: true, data: updated });
  }

  static async deletePersonnel(req: Request, res: Response) {
    const { id } = req.params as any;
    await prisma.personnel.delete({ where: { id } });
    res.json({ success: true, message: 'Deleted' });
  }

  static async getEmploymentHistory(req: Request, res: Response) {
    const { id } = req.params as any;
    const history = await prisma.employmentHistory.findMany({ where: { personnel_id: id }, orderBy: { start_date: 'desc' } });
    res.json({ success: true, data: history });
  }

  static async addEmploymentHistory(req: Request, res: Response) {
    const { id } = req.params as any;
    const created = await prisma.employmentHistory.create({ data: { ...req.body, personnel_id: id } });
    res.status(201).json({ success: true, data: created });
  }

  static async getMembershipData(req: Request, res: Response) {
    const { id } = req.params as any;
    const membership = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM membership_data WHERE personnel_id = ${id}`);
    res.json({ success: true, data: membership });
  }

  static async updateMembershipData(req: Request, res: Response) {
    const { id } = req.params as any;
    const updated = await prisma.$executeRawUnsafe(`UPDATE membership_data SET data = data || ${JSON.stringify(req.body)} WHERE personnel_id = ${JSON.stringify(id)}`);
    res.json({ success: true, data: updated });
  }

  static async getMeritsViolations(req: Request, res: Response) {
    const { id } = req.params as any;
    const items = await prisma.meritViolation.findMany({ where: { personnel_id: id }, orderBy: [{ id: 'desc' }] });
    res.json({ success: true, data: items });
  }

  static async addMeritViolation(req: Request, res: Response) {
    const { id } = req.params as any;
    const created = await prisma.meritViolation.create({ data: { ...req.body, personnel_id: id } });
    res.status(201).json({ success: true, data: created });
  }

  static async getAdministrativeCases(req: Request, res: Response) {
    const { id } = req.params as any;
    const items = await prisma.administrativeCase.findMany({ where: { personnel_id: id }, orderBy: { created_at: 'desc' } });
    res.json({ success: true, data: items });
  }

  static async addAdministrativeCase(req: Request, res: Response) {
    const { id } = req.params as any;
    const created = await prisma.administrativeCase.create({ data: { ...req.body, personnel_id: id } });
    res.status(201).json({ success: true, data: created });
  }

  static async getPersonnelMovements(req: Request, res: Response) {
    const { id } = req.params as any;
    const items = await prisma.personnelMovement.findMany({ where: { personnel_id: id }, orderBy: { effective_date: 'desc' } });
    res.json({ success: true, data: items });
  }

  static async addPersonnelMovement(req: Request, res: Response) {
    const { id } = req.params as any;
    const created = await prisma.personnelMovement.create({ data: { ...req.body, personnel_id: id } });
    res.status(201).json({ success: true, data: created });
  }

  static async getDashboardEmployees(req: Request, res: Response) {
    const items = await prisma.personnel.findMany({ select: { id: true, first_name: true, last_name: true }, orderBy: [{ last_name: 'asc' }] });
    res.json({ success: true, data: items });
  }

  static async uploadDocuments(req: Request, res: Response) {
    const { id } = req.params as any;
    const docs = req.body?.documents as Array<{ title: string; content_base64: string; type?: string }> | undefined;
    if (!docs || docs.length === 0) return res.status(400).json({ success: false, error: { message: 'No documents provided' } });
    const created = await prisma.employeeDocument.createMany({
      data: docs.map(d => ({ personnelId: id, title: d.title, description: null, fileUrl: '', fileType: d.type || 'application/octet-stream', fileSize: 0, category: 'Uploaded', isPrivate: false }))
    });
    res.status(201).json({ success: true, data: created });
  }

  static async getDocuments(req: Request, res: Response) {
    const { id } = req.params as any;
    const items = await prisma.employeeDocument.findMany({ where: { personnelId: id }, orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: items });
  }
}


