export interface CreateUserData {
    email: string;
    password: string;
    username: string;
    role?: string;
}
export declare class AuthService {
    findUserByEmail(email: string): Promise<any | null>;
    createUser(data: CreateUserData): Promise<any>;
    findUserById(id: string): Promise<any | null>;
}
//# sourceMappingURL=auth.service.d.ts.map