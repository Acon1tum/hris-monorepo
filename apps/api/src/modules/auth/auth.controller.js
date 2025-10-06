"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const auth_service_1 = require("./auth.service");
class AuthController {
    authService = new auth_service_1.AuthService();
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Find user by email
            const user = await this.authService.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: { message: 'Invalid credentials' }
                });
            }
            // Check password
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    error: { message: 'Invalid credentials' }
                });
            }
            // Generate JWT token
            const secret = config_1.config.jwtSecret;
            const options = { expiresIn: config_1.config.jwtExpiresIn };
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, options);
            res.json({
                success: true,
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    },
                    token
                }
            });
        }
        catch (error) {
            // Basic error logging to help diagnose 500s during development
            // eslint-disable-next-line no-console
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    async register(req, res) {
        try {
            const { email, password, username, role = 'Employee' } = req.body;
            // Check if user already exists
            const existingUser = await this.authService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'User already exists' }
                });
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(password, 12);
            // Create user
            const user = await this.authService.createUser({
                email,
                password: hashedPassword,
                username,
                role
            });
            // Generate JWT token
            const secret = config_1.config.jwtSecret;
            const options = { expiresIn: config_1.config.jwtExpiresIn };
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, options);
            res.status(201).json({
                success: true,
                data: {
                    user: { id: user.id, email: user.email, username: user.username, role: user.role },
                    token
                }
            });
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('Register error:', error);
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            res.status(501).json({
                success: false,
                error: { message: 'Refresh token not implemented' }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    async logout(req, res) {
        try {
            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
    async getCurrentUser(req, res) {
        try {
            res.status(501).json({
                success: false,
                error: { message: 'Get current user not implemented' }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: { message: 'Internal server error' }
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map