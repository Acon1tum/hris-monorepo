import { Router, type Router as ExpressRouter } from 'express';
import { authenticateToken, requireRole } from '../../middleware/auth';
import { JobPortalManagementController } from './portal-management.controller';

const router: ExpressRouter = Router();

// Secure all management routes
router.use(authenticateToken, requireRole(['Admin', 'HR']));

// Job posting management
router.post('/jobs', JobPortalManagementController.createJobPosting);
router.get('/jobs', JobPortalManagementController.getAllJobPostings);
router.get('/jobs/:id', JobPortalManagementController.getJobPosting);
router.put('/jobs/:id', JobPortalManagementController.updateJobPosting);
router.patch('/jobs/:id/status', JobPortalManagementController.updateJobPostingStatus);
router.delete('/jobs/:id', requireRole(['Admin']), JobPortalManagementController.deleteJobPosting);

// Application management
router.get('/applications', JobPortalManagementController.getAllApplications);
router.get('/applications/:id', JobPortalManagementController.getApplication);
router.patch('/applications/:id/status', JobPortalManagementController.updateApplicationStatus);

// Dashboard & analytics
router.get('/dashboard', JobPortalManagementController.getDashboard);

// Utility endpoints
router.get('/departments', JobPortalManagementController.getDepartments);
router.get('/salary-ranges', JobPortalManagementController.getSalaryRanges);

export default router;