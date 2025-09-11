import { Router, type Request, type Response, type Router as ExpressRouter } from 'express';
import { authenticateToken, requireRole } from '../../middleware/auth';
import usersRoutes from './users/users.routes';
import rolesRoutes from './roles/roles.routes';
import departmentsRoutes from './departments/departments.routes';
import auditLogsRoutes from './audit-logs/audit-logs.routes';

const router: ExpressRouter = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'System Administration module - API root' });
});

// Protect all admin routes
router.use(authenticateToken, requireRole(['Admin', 'HR']));

router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/departments', departmentsRoutes);
router.use('/audit-logs', auditLogsRoutes);

export default router;