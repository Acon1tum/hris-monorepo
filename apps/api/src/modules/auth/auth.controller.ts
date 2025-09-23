import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
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
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid credentials' }
        });
      }

      // Generate JWT token
      const secret: jwt.Secret = config.jwtSecret;
      const options: jwt.SignOptions = { expiresIn: config.jwtExpiresIn as unknown as jwt.SignOptions['expiresIn'] };
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret,
        options
      );

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
    } catch (error) {
      // Basic error logging to help diagnose 500s during development
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Internal server error' }
      });
    }
  }

  async register(req: Request, res: Response) {
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
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await this.authService.createUser({
        email,
        password: hashedPassword,
        username,
        role
      });

      // Generate JWT token
      const secret: jwt.Secret = config.jwtSecret;
      const options: jwt.SignOptions = { expiresIn: config.jwtExpiresIn as unknown as jwt.SignOptions['expiresIn'] };
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secret,
        options
      );

      res.status(201).json({
        success: true,
        data: {
          user: { id: user.id, email: user.email, username: user.username, role: user.role },
          token
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Register error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Internal server error' }
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      res.status(501).json({
        success: false,
        error: { message: 'Refresh token not implemented' }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Internal server error' }
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Internal server error' }
      });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      res.status(501).json({
        success: false,
        error: { message: 'Get current user not implemented' }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Internal server error' }
      });
    }
  }
}
