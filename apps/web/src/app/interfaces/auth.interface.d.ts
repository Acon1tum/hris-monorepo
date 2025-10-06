export interface PersonnelInfo {
    id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    department?: {
        id: string;
        department_name: string;
    };
    designation?: string;
    employment_type: string;
}
export interface User {
    id: string;
    username: string;
    email: string;
    status: string;
    personnel?: PersonnelInfo[];
    roles: string[];
    avatar?: string;
    name?: string;
    role?: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
        refreshToken?: string;
        expiresIn?: string;
        tokenType?: string;
    };
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface MenuItem {
    name: string;
    path: string;
    icon: string;
    badge?: string;
    roles?: string[];
    children?: MenuItem[];
    external?: boolean;
    target?: string;
}
//# sourceMappingURL=auth.interface.d.ts.map