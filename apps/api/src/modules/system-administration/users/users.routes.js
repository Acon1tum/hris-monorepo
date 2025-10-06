"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const validation_1 = require("../../../middleware/validation");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
// Validation schemas
const createUserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid('Admin', 'HR', 'Employee', 'Manager', 'Applicant').required(),
    profilePicture: joi_1.default.string().uri().optional()
});
const updateUserSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).optional(),
    email: joi_1.default.string().email().optional(),
    role: joi_1.default.string().valid('Admin', 'HR', 'Employee', 'Manager', 'Applicant').optional(),
    status: joi_1.default.string().valid('Active', 'Inactive').optional(),
    profilePicture: joi_1.default.string().uri().optional()
});
// Custom validation for params
const validateParams = (req, res, next) => {
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
router.get('/', users_controller_1.UsersController.getUsers);
router.get('/:id', validateParams, users_controller_1.UsersController.getUserById);
router.post('/', (0, validation_1.validateRequest)(createUserSchema), users_controller_1.UsersController.createUser);
router.put('/:id', validateParams, (0, validation_1.validateRequest)(updateUserSchema), users_controller_1.UsersController.updateUser);
router.delete('/:id', validateParams, users_controller_1.UsersController.deleteUser);
router.patch('/:id/toggle-status', validateParams, users_controller_1.UsersController.toggleUserStatus);
exports.default = router;
//# sourceMappingURL=users.routes.js.map