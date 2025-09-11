import { Router } from 'express';
import { authenticateToken, requireRole } from '../../middleware/auth';
import { LeaveController } from './leave.controller';

const router: ReturnType<typeof Router> = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Leave Management module - API ready' });
});

// Applications
router.get('/applications', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getLeaveApplications);
router.get('/applications/my', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.getMyLeaveApplications);
router.get('/applications/pending', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getPendingApplications);
router.post('/applications', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.createLeaveApplication);
router.put('/applications/:id', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.updateLeaveApplication);
router.delete('/applications/:id', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.cancelLeaveApplication);
router.put('/applications/:id/approve', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.approveLeaveApplication);
router.put('/applications/:id/reject', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.rejectLeaveApplication);

// Leave types
router.get('/types', authenticateToken, requireRole(['Admin', 'HR', 'Employee']), LeaveController.getLeaveTypes);
router.post('/types', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.createLeaveType);
router.put('/types/:id', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.updateLeaveType);
router.delete('/types/:id', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.deleteLeaveType);

// Balances
router.get('/balance/my', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.getMyLeaveBalance);
router.get('/balance/:personnel_id', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getPersonnelLeaveBalance);
router.post('/balance/initialize', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.initializeLeaveBalance);
router.get('/balance/bulk-initialize-preview', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.previewBulkInitializeLeaveBalances);
router.post('/balance/bulk-initialize', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.bulkInitializeLeaveBalances);

// Monetization
router.get('/monetization', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getLeaveMonetization);
router.post('/monetization', authenticateToken, requireRole(['Employee', 'Admin', 'HR']), LeaveController.createLeaveMonetization);
router.put('/monetization/:id/approve', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.approveLeaveMonetization);

// Reports
router.get('/reports/summary', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getLeaveSummaryReport);
router.get('/reports/balance', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getLeaveBalanceReport);

// Adjustments
// Adjustments
router.post('/adjustments', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.createLeaveAdjustment);
router.get('/adjustments', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getLeaveAdjustments);
router.get('/adjustments/:personnel_id', authenticateToken, requireRole(['Admin', 'HR']), LeaveController.getPersonnelAdjustments);

export default router;