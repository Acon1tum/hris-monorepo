"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../../middleware/auth");
const employee_self_service_controller_1 = require("./employee-self-service.controller");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ success: true, message: 'Employee Self Service module - API ready' });
});
// Multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path_1.default.join(__dirname, '../../../uploads');
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain'
        ];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    }
});
router.get('/my-profile', auth_1.authenticateToken, employee_self_service_controller_1.EmployeeSelfServiceController.getMyProfile);
router.put('/my-profile', auth_1.authenticateToken, employee_self_service_controller_1.EmployeeSelfServiceController.updateMyProfile);
router.get('/my-documents', auth_1.authenticateToken, employee_self_service_controller_1.EmployeeSelfServiceController.getMyDocuments);
router.post('/upload-document', auth_1.authenticateToken, upload.single('file'), employee_self_service_controller_1.EmployeeSelfServiceController.uploadDocument);
router.delete('/documents/:id', auth_1.authenticateToken, employee_self_service_controller_1.EmployeeSelfServiceController.deleteDocument);
exports.default = router;
//# sourceMappingURL=employee-self-service.routes.js.map