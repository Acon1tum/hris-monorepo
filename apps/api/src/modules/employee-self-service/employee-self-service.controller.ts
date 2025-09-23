import { Request, Response } from 'express';
import { accounts, personnel as personnelDb } from '../../db/clients';
import { AuthRequest } from '../../middleware/auth';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

function mapPersonnelToUserProfile(personnel: any) {
  return {
    general: {
      firstName: personnel.first_name || '',
      middleName: personnel.middle_name || '',
      lastName: personnel.last_name || '',
      fullName: `${personnel.first_name || ''} ${personnel.last_name || ''}`.trim(),
      birthdate: personnel.date_of_birth ? new Date(personnel.date_of_birth).toLocaleDateString() : '',
      contactNumber: personnel.contact_number || '',
      address: personnel.address || '',
      email: personnel.user?.email || '',
      gender: personnel.gender || '',
      civilStatus: personnel.civil_status || '',
      citizenship: personnel.citizenship || 'Filipino'
    },
    employment: {
      employmentType: personnel.employment_type || '',
      designation: personnel.job_title?.title || '',
      department: personnel.department?.department_name || '',
      appointmentDate: personnel.date_hired ? new Date(personnel.date_hired).toLocaleDateString() : '',
      startDate: personnel.date_hired ? new Date(personnel.date_hired).toLocaleDateString() : '',
      employmentStatus: personnel.user?.status || 'Active',
      jobLevel: personnel.job_title?.position_classification || '',
      jobGrade: personnel.job_title?.salary_grade || ''
    },
    membership: {
      gsis: personnel.gsis_number || '',
      pagibig: personnel.pagibig_number || '',
      philhealth: personnel.philhealth_number || '',
      sss: personnel.sss_number || ''
    },
    other: {
      dependents: '0',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactRelationship: ''
    }
  };
}

export class EmployeeSelfServiceController {
  static async getMyProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const personnel = await personnelDb.personnel.findFirst({ 
      where: { user_id: userId }, 
      include: { 
        department: true, 
        job_title: true 
      } 
    });
    if (!personnel) return res.status(404).json({ success: false, message: 'Profile not found' });
    const userProfile = mapPersonnelToUserProfile(personnel);
    res.json({ success: true, data: userProfile });
  }

  static async updateMyProfile(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const {
      firstName, middleName, lastName, birthdate, contactNumber, address, email,
      gender, civilStatus, employmentType, designation, department, appointmentDate,
      gsis, pagibig, philhealth, sss
    } = req.body;
    const personnel = await personnelDb.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, message: 'Profile not found' });
    let departmentId: string | undefined = undefined;
    if (department) {
      const dept = await personnelDb.department.findFirst({ where: { department_name: department } });
      if (dept) departmentId = dept.id;
    }
    await personnelDb.personnel.update({
      where: { id: personnel.id },
      data: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: birthdate ? new Date(birthdate) : null,
        contact_number: contactNumber,
        address,
        gender,
        civil_status: civilStatus,
        employment_type: employmentType,
        // designation,
        department_id: departmentId,
        date_hired: appointmentDate ? new Date(appointmentDate) : null,
        gsis_number: gsis,
        pagibig_number: pagibig,
        philhealth_number: philhealth,
        sss_number: sss
      }
    });
    if (email) {
      await accounts.user.update({ where: { id: userId }, data: { email } });
    }
    res.json({ success: true, message: 'Profile updated successfully' });
  }

  static async getMyDocuments(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const personnel = await personnelDb.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, message: 'Personnel not found' });
    const documents = await personnelDb.employeeDocument.findMany({ where: { personnelId: personnel.id }, orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: documents });
  }

  static async uploadDocument(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const personnel = await personnelDb.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, message: 'Personnel not found' });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { title, description, category } = req.body;
    const file = req.file as Express.Multer.File;
    const uploadsDir = path.join(__dirname, '../../../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileExtension = path.extname(file.originalname);
    const fileName = `${randomUUID()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.renameSync(file.path, filePath);
    const document = await personnelDb.employeeDocument.create({
      data: {
        personnelId: personnel.id,
        title,
        description: description || null,
        fileUrl: `/uploads/${fileName}`,
        fileType: file.mimetype,
        fileSize: file.size,
        category: category || 'Personal',
        isPrivate: false
      }
    });
    res.status(201).json({ success: true, data: document });
  }

  static async deleteDocument(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const { id } = req.params as any;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const personnel = await personnelDb.personnel.findFirst({ where: { user_id: userId } });
    if (!personnel) return res.status(404).json({ success: false, message: 'Personnel not found' });
    const document = await personnelDb.employeeDocument.findFirst({ where: { id, personnelId: personnel.id } });
    if (!document) return res.status(404).json({ success: false, message: 'Document not found' });
    const filePath = path.join(__dirname, '../../../', document.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await personnelDb.employeeDocument.delete({ where: { id } });
    res.json({ success: true, message: 'Document deleted successfully' });
  }
}


