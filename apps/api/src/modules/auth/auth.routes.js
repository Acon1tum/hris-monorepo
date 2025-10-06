"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validation_1 = require("../../middleware/validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const authController = new auth_controller_1.AuthController();
// Public routes (bind to preserve controller context)
router.post('/login', (0, validation_1.validateRequest)(auth_validation_1.loginSchema), authController.login.bind(authController));
router.post('/register', (0, validation_1.validateRequest)(auth_validation_1.registerSchema), authController.register.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));
// Protected routes
router.post('/logout', authController.logout.bind(authController));
router.get('/me', authController.getCurrentUser.bind(authController));
//# sourceMappingURL=auth.routes.js.map