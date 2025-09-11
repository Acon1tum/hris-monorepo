import { Router, type Request, type Response, type Router as ExpressRouter } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middleware/validation';
import { loginSchema, registerSchema } from './auth.validation';

const router: ExpressRouter = Router();
const authController = new AuthController();

// Public routes (bind to preserve controller context)
router.post('/login', validateRequest(loginSchema), authController.login.bind(authController));
router.post('/register', validateRequest(registerSchema), authController.register.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));

// Protected routes
router.post('/logout', authController.logout.bind(authController));
router.get('/me', authController.getCurrentUser.bind(authController));

export { router as authRoutes }; 
