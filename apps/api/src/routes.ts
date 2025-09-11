import { Router, type Request, type Response, type Router as ExpressRouter } from 'express';

// Import module routes
import { authRoutes } from './modules/auth/auth.routes';
import employeeRoutes from './modules/employee-self-service/employee-self-service.routes';
import personnelRoutes from './modules/personnel-information-management/personnel-information-management.routes';
import leaveRoutes from './modules/leave-management/leave-management.routes';
import timekeepingRoutes from './modules/timekeeping-attendance/timekeeping-attendance.routes';
import payrollRoutes from './modules/payroll-management/payroll-management.routes';
import performanceRoutes from './modules/performance-management/performance-management.routes';
import recruitmentRoutes from './modules/recruitment/recruitment.routes';
import jobPortalRoutes from './modules/job-portal-management/job-portal-management.routes';
import jobApplicationRoutes from './modules/online-job-application-portal/online-job-application-portal.routes';
import healthRoutes from './modules/health-wellness/health-wellness.routes';
import reportRoutes from './modules/report-generation/report-generation.routes';
import adminRoutes from './modules/system-administration/system-administration.routes';

const router: ExpressRouter = Router();

// API version info
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'HRIS API v1.0.0',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      personnel: '/api/personnel',
      leaves: '/api/leaves',
      timekeeping: '/api/timekeeping',
      payroll: '/api/payroll',
      performance: '/api/performance',
      recruitment: '/api/recruitment',
      jobPortal: '/api/job-portal',
      jobApplications: '/api/job-applications',
      health: '/api/health',
      reports: '/api/reports',
      admin: '/api/admin'
    }
  });
});

// Mount module routes
router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/personnel', personnelRoutes);
router.use('/leaves', leaveRoutes);
router.use('/timekeeping', timekeepingRoutes);
router.use('/payroll', payrollRoutes);
router.use('/performance', performanceRoutes);
router.use('/recruitment', recruitmentRoutes);
router.use('/job-portal', jobPortalRoutes);
router.use('/job-applications', jobApplicationRoutes);
router.use('/health', healthRoutes);
router.use('/reports', reportRoutes);
router.use('/admin', adminRoutes);

export default router;
