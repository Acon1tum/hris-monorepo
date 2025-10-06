"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const leave_controller_1 = require("./leave.controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// Ensure uploads directory exists
const uploadsDir = path_1.default.join(__dirname, '../../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Configure multer storage for supporting documents
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        cb(null, `${timestamp}-${sanitizedOriginal}`);
    }
});
const upload = (0, multer_1.default)({ storage });
router.get('/', (req, res) => {
    res.json({ success: true, message: 'Leave Management module - API ready' });
});
// Applications
router.get('/applications', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getLeaveApplications);
router.get('/applications/my', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), leave_controller_1.LeaveController.getMyLeaveApplications);
router.get('/applications/pending', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getPendingApplications);
router.post('/applications', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), upload.single('supporting_document'), leave_controller_1.LeaveController.createLeaveApplication);
router.put('/applications/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), leave_controller_1.LeaveController.updateLeaveApplication);
router.delete('/applications/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), leave_controller_1.LeaveController.cancelLeaveApplication);
router.put('/applications/:id/approve', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.approveLeaveApplication);
router.put('/applications/:id/reject', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.rejectLeaveApplication);
// Leave types
router.get('/types', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR', 'Employee']), leave_controller_1.LeaveController.getLeaveTypes);
router.post('/types', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.createLeaveType);
router.put('/types/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.updateLeaveType);
router.delete('/types/:id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.deleteLeaveType);
// Balances
router.get('/balance/my', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), leave_controller_1.LeaveController.getMyLeaveBalance);
router.get('/balance/:personnel_id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getPersonnelLeaveBalance);
router.post('/balance/initialize', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.initializeLeaveBalance);
router.get('/balance/bulk-initialize-preview', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.previewBulkInitializeLeaveBalances);
router.post('/balance/bulk-initialize', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.bulkInitializeLeaveBalances);
// Monetization
router.get('/monetization', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getLeaveMonetization);
router.post('/monetization', auth_1.authenticateToken, (0, auth_1.requireRole)(['Employee', 'Admin', 'HR']), leave_controller_1.LeaveController.createLeaveMonetization);
router.put('/monetization/:id/approve', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.approveLeaveMonetization);
// Reports
router.get('/reports/summary', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getLeaveSummaryReport);
router.get('/reports/balance', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getLeaveBalanceReport);
// Adjustments
// Adjustments
router.post('/adjustments', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.createLeaveAdjustment);
router.get('/adjustments', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getLeaveAdjustments);
router.get('/adjustments/:personnel_id', auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']), leave_controller_1.LeaveController.getPersonnelAdjustments);
exports.default = router;
//# sourceMappingURL=leave-management.routes.js.map