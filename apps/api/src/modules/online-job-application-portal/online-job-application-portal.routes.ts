import { Router, type Router as ExpressRouter } from 'express';
import { JobPortalController } from './portal.controller';
import { authenticateToken } from '../../middleware/auth';

const router: ExpressRouter = Router();

// Public
router.get('/test-database', JobPortalController.testDatabase);
router.post('/register', JobPortalController.register);
router.post('/login', JobPortalController.login);
router.get('/jobs', JobPortalController.listJobs);
router.get('/jobs/:id', JobPortalController.getJob);
router.post('/jobs', JobPortalController.createJobPosting);
router.get('/salary-ranges', JobPortalController.getSalaryRanges);
router.get('/departments', JobPortalController.getDepartments);

// Authenticated
router.get('/profile', authenticateToken, JobPortalController.getProfile);
router.get('/current-profile', authenticateToken, JobPortalController.getCurrentApplicantProfile);
router.put('/profile', authenticateToken, JobPortalController.updateProfile);
router.get('/profile/completion-status', authenticateToken, JobPortalController.checkProfileCompletion);

router.post('/applications', authenticateToken, JobPortalController.startApplication);
router.post('/applications/:id/upload', authenticateToken, JobPortalController.uploadDocuments);
router.put('/applications/:id/answers', authenticateToken, JobPortalController.answerQuestions);
router.post('/applications/:id/submit', authenticateToken, JobPortalController.submitApplication);
router.get('/applications', authenticateToken, JobPortalController.listApplications);
router.get('/applications/:id', authenticateToken, JobPortalController.getApplication);
router.put('/applications/:id', authenticateToken, JobPortalController.editApplication);
router.delete('/applications/:id', authenticateToken, JobPortalController.cancelApplication);

router.post('/notifications', JobPortalController.notifyApplicant);

export default router;