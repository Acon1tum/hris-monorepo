import { Request, Response } from 'express';
import { prisma } from '@hris/db';
import { ApiResponse, PaginationParams, SearchParams } from '@hris/types';
import { CreateUserRequest, UpdateUserRequest, User } from '@hris/types';
import bcrypt from 'bcryptjs';

export class UsersController {
  // Get all users with pagination and search
  static async getUsers(req: Request, res: Response) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        sortBy = 'created_at',
        sortOrder = 'desc',
        status,
        role
      } = req.query as SearchParams & { status?: string; role?: string };

      const pageNum = parseInt(page.toString());
      const limitNum = parseInt(limit.toString());
      const skip = (pageNum - 1) * limitNum;

      // Build where clause
      const where: any = {};
      
      if (search) {
        where.OR = [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (status) {
        where.status = status;
      }

      if (role) {
        where.role = role;
      }

      // Get total count
      const total = await prisma.user.count({ where });

      // Get users with pagination
      const users = await prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          username: true,
          email: true,
          profile_picture: true,
          status: true,
          role: true,
          created_at: true,
          updated_at: true,
          personnel: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              middle_name: true
            }
          }
        }
      });

      const totalPages = Math.ceil(total / limitNum);

      const response: ApiResponse<User[]> = {
        success: true,
        data: users.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profile_picture || undefined,
          status: user.status as any,
          role: user.role as any,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        })),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to fetch users',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Get user by ID
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          profile_picture: true,
          status: true,
          role: true,
          created_at: true,
          updated_at: true,
          personnel: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              middle_name: true,
              department: {
                select: {
                  id: true,
                  department_name: true
                }
              },
              job_title: {
                select: {
                  id: true,
                  title: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profile_picture || undefined,
          status: user.status as any,
          role: user.role as any,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to fetch user',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Create new user
  static async createUser(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { username: userData.username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'User with this email or username already exists'
          }
        });
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(userData.password, saltRounds);

      // Create user
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password_hash: passwordHash,
          profile_picture: userData.profilePicture,
          role: userData.role,
          status: 'Active'
        },
        select: {
          id: true,
          username: true,
          email: true,
          profile_picture: true,
          status: true,
          role: true,
          created_at: true,
          updated_at: true
        }
      });

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profile_picture || undefined,
          status: user.status as any,
          role: user.role as any,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to create user',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Update user
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData: UpdateUserRequest = req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      // Check if email or username is being changed and if they already exist
      if (updateData.email || updateData.username) {
        const conflictUser = await prisma.user.findFirst({
          where: {
            AND: [
              { id: { not: id } },
            ],
            OR: [
              ...(updateData.email ? [{ email: updateData.email }] : []),
              ...(updateData.username ? [{ username: updateData.username }] : [])
            ]
          }
        });

        if (conflictUser) {
          return res.status(400).json({
            success: false,
            error: {
              message: 'Email or username already exists'
            }
          });
        }
      }

      // Update user
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...(updateData.username && { username: updateData.username }),
          ...(updateData.email && { email: updateData.email }),
          ...(updateData.profilePicture !== undefined && { profile_picture: updateData.profilePicture }),
          ...(updateData.status && { status: updateData.status }),
          ...(updateData.role && { role: updateData.role }),
          updated_at: new Date()
        },
        select: {
          id: true,
          username: true,
          email: true,
          profile_picture: true,
          status: true,
          role: true,
          created_at: true,
          updated_at: true
        }
      });

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profile_picture || undefined,
          status: user.status as any,
          role: user.role as any,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to update user',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Delete user
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      // Check if user has associated personnel records
      const personnelCount = await prisma.personnel.count({
        where: { user_id: id }
      });

      if (personnelCount > 0) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Cannot delete user with associated personnel records'
          }
        });
      }

      // Delete user
      await prisma.user.delete({
        where: { id }
      });

      res.json({
        success: true,
        data: { message: 'User deleted successfully' }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to delete user',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }

  // Toggle user status
  static async toggleUserStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'User not found'
          }
        });
      }

      const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          status: newStatus,
          updated_at: new Date()
        },
        select: {
          id: true,
          username: true,
          email: true,
          profile_picture: true,
          status: true,
          role: true,
          created_at: true,
          updated_at: true
        }
      });

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          profilePicture: updatedUser.profile_picture || undefined,
          status: updatedUser.status as any,
          role: updatedUser.role as any,
          createdAt: updatedUser.created_at,
          updatedAt: updatedUser.updated_at
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error toggling user status:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to toggle user status',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    }
  }
}
