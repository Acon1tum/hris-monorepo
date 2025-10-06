import { BaseEntity, RoleType, Status } from './common';
export interface User extends BaseEntity {
    username: string;
    email: string;
    profilePicture?: string;
    status: Status;
    role: RoleType;
}
export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: RoleType;
    profilePicture?: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    user: User;
    token: string;
}
export interface UpdateUserRequest {
    username?: string;
    email?: string;
    profilePicture?: string;
    status?: Status;
    role?: RoleType;
}
export interface UserDocument extends BaseEntity {
    userId: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    isPrivate: boolean;
}
//# sourceMappingURL=user.d.ts.map