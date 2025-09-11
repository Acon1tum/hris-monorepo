import { Router, type Router as ExpressRouter } from 'express';
import { authenticateToken, requireRole } from '../../middleware/auth';
import { PersonnelController } from './personnel.controller';

const router: ExpressRouter = Router();

// Protect all endpoints for Admin/HR
router.use(authenticateToken, requireRole(['Admin', 'HR']));

router.get('/', PersonnelController.getAllPersonnel);
router.get('/stats', PersonnelController.getPersonnelStats);
router.get('/dashboard-stats', PersonnelController.getDashboardStats);
router.get('/:id', PersonnelController.getPersonnelById);
router.post('/', PersonnelController.createPersonnel);
router.put('/:id', PersonnelController.updatePersonnel);
router.delete('/:id', PersonnelController.deletePersonnel);

router.get('/:id/employment-history', PersonnelController.getEmploymentHistory);
router.post('/:id/employment-history', PersonnelController.addEmploymentHistory);

router.get('/:id/membership-data', PersonnelController.getMembershipData);
router.patch('/:id/membership-data', PersonnelController.updateMembershipData);

router.get('/:id/merits-violations', PersonnelController.getMeritsViolations);
router.post('/:id/merits-violations', PersonnelController.addMeritViolation);

router.get('/:id/admin-cases', PersonnelController.getAdministrativeCases);
router.post('/:id/admin-cases', PersonnelController.addAdministrativeCase);

router.get('/:id/movements', PersonnelController.getPersonnelMovements);
router.post('/:id/movements', PersonnelController.addPersonnelMovement);

router.get('/dashboard-employees', PersonnelController.getDashboardEmployees);

router.post('/:id/documents', PersonnelController.uploadDocuments);
router.get('/:id/documents', PersonnelController.getDocuments);

export default router;