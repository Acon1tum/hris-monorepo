import { accounts } from '../../db/clients';

export interface CreateUserData {
  email: string;
  password: string; // hashed
  username: string;
  role?: string;
}

export class AuthService {
  async findUserByEmail(email: string): Promise<any | null> {
    return await accounts.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: CreateUserData): Promise<any> {
    return await accounts.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role as any || 'Employee',
        isActive: true
      }
    });
  }

  async findUserById(id: string): Promise<any | null> {
    return await accounts.user.findUnique({
      where: { id }
    });
  }
}
