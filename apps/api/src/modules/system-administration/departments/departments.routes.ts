import { Router, type Router as ExpressRouter } from 'express';
import { authenticateToken, requireRole } from '../../../middleware/auth';
import { DepartmentsController } from './departments.controller';

const router: ExpressRouter = Router();

// Protect all department routes
router.use(authenticateToken, requireRole(['Admin', 'HR']));

// Department CRUD operations
router.get('/', DepartmentsController.getAllDepartments);
router.get('/stats', DepartmentsController.getDepartmentStats);
router.get('/:id', DepartmentsController.getDepartmentById);
router.post('/', DepartmentsController.createDepartment);
router.put('/:id', DepartmentsController.updateDepartment);
router.delete('/:id', DepartmentsController.deleteDepartment);

export default router;


