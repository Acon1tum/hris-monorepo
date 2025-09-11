import { prisma } from '@hris/db';

export interface CreateUserData {
  email: string;
  password: string; // hashed
  username: string;
  role: string;
}

export class AuthService {
  async findUserByEmail(email: string): Promise<any | null> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: CreateUserData): Promise<any> {
    return await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        role: data.role as any,
        password_hash: data.password,
        status: 'Active'
      }
    });
  }

  async findUserById(id: string): Promise<any | null> {
    return await prisma.user.findUnique({
      where: { id }
    });
  }
}
