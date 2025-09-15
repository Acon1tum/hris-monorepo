import { Router, type Router as ExpressRouter } from 'express';
import { UsersController } from './users.controller';
import { validateRequest } from '../../../middleware/validation';
import Joi from 'joi';

const router: ExpressRouter = Router();

// Validation schemas
const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'HR', 'Employee', 'Manager', 'Applicant').required(),
  profilePicture: Joi.string().uri().optional()
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('Admin', 'HR', 'Employee', 'Manager', 'Applicant').optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
  profilePicture: Joi.string().uri().optional()
});

// Custom validation for params
const validateParams = (req: any, res: any, next: any) => {
  const { id } = req.params;
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid user ID format' }
    });
  }
  next();
};

// Routes
router.get('/', UsersController.getUsers);
router.get('/:id', validateParams, UsersController.getUserById);
router.post('/', validateRequest(createUserSchema), UsersController.createUser);
router.put('/:id', validateParams, validateRequest(updateUserSchema), UsersController.updateUser);
router.delete('/:id', validateParams, UsersController.deleteUser);
router.patch('/:id/toggle-status', validateParams, UsersController.toggleUserStatus);

export default router;


