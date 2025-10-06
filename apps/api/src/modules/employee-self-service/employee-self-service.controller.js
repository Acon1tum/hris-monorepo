"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSelfServiceController = void 0;
const clients_1 = require("../../db/clients");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto_1 = require("crypto");
function mapPersonnelToUserProfile(personnel) {
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
class EmployeeSelfServiceController {
    static async getMyProfile(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const personnel = await clients_1.personnel.personnel.findFirst({
            where: { user_id: userId },
            include: {
                department: true,
                job_title: true
            }
        });
        if (!personnel)
            return res.status(404).json({ success: false, message: 'Profile not found' });
        const userProfile = mapPersonnelToUserProfile(personnel);
        res.json({ success: true, data: userProfile });
    }
    static async updateMyProfile(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const { firstName, middleName, lastName, birthdate, contactNumber, address, email, gender, civilStatus, employmentType, designation, department, appointmentDate, gsis, pagibig, philhealth, sss } = req.body;
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, message: 'Profile not found' });
        let departmentId = undefined;
        if (department) {
            const dept = await clients_1.personnel.department.findFirst({ where: { department_name: department } });
            if (dept)
                departmentId = dept.id;
        }
        await clients_1.personnel.personnel.update({
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
            await clients_1.accounts.user.update({ where: { id: userId }, data: { email } });
        }
        res.json({ success: true, message: 'Profile updated successfully' });
    }
    static async getMyDocuments(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, message: 'Personnel not found' });
        const documents = await clients_1.personnel.employeeDocument.findMany({ where: { personnelId: personnel.id }, orderBy: { createdAt: 'desc' } });
        res.json({ success: true, data: documents });
    }
    static async uploadDocument(req, res) {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, message: 'Personnel not found' });
        if (!req.file)
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        const { title, description, category } = req.body;
        const file = req.file;
        const uploadsDir = path.join(__dirname, '../../../uploads');
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir, { recursive: true });
        const fileExtension = path.extname(file.originalname);
        const fileName = `${(0, crypto_1.randomUUID)()}${fileExtension}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.renameSync(file.path, filePath);
        const document = await clients_1.personnel.employeeDocument.create({
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
    static async deleteDocument(req, res) {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const personnel = await clients_1.personnel.personnel.findFirst({ where: { user_id: userId } });
        if (!personnel)
            return res.status(404).json({ success: false, message: 'Personnel not found' });
        const document = await clients_1.personnel.employeeDocument.findFirst({ where: { id, personnelId: personnel.id } });
        if (!document)
            return res.status(404).json({ success: false, message: 'Document not found' });
        const filePath = path.join(__dirname, '../../../', document.fileUrl);
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);
        await clients_1.personnel.employeeDocument.delete({ where: { id } });
        res.json({ success: true, message: 'Document deleted successfully' });
    }
}
exports.EmployeeSelfServiceController = EmployeeSelfServiceController;
//# sourceMappingURL=employee-self-service.controller.js.map