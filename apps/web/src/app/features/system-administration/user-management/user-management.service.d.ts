import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User {
    id: string;
    username: string;
    email: string;
    profilePicture?: string;
    status: 'Active' | 'Inactive';
    role: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant';
    createdAt: Date;
    updatedAt?: Date;
}
export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant';
    profilePicture?: string;
}
export interface UpdateUserRequest {
    username?: string;
    email?: string;
    profilePicture?: string;
    status?: 'Active' | 'Inactive';
    role?: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant';
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        details?: any;
    };
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface UserSearchParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    status?: 'Active' | 'Inactive';
    role?: 'Admin' | 'HR' | 'Employee' | 'Manager' | 'Applicant';
}
export declare class UserManagementService {
    private http;
    private readonly apiUrl;
    constructor(http: HttpClient);
    getUsers(params?: UserSearchParams): Observable<ApiResponse<User[]>>;
    getUserById(id: string): Observable<ApiResponse<User>>;
    createUser(userData: CreateUserRequest): Observable<ApiResponse<User>>;
    updateUser(id: string, userData: UpdateUserRequest): Observable<ApiResponse<User>>;
    deleteUser(id: string): Observable<ApiResponse<{
        message: string;
    }>>;
    toggleUserStatus(id: string): Observable<ApiResponse<User>>;
    getAvailableRoles(): string[];
    getAvailableStatuses(): string[];
}
//# sourceMappingURL=user-management.service.d.ts.map