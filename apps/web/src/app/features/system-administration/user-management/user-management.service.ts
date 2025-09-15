import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly apiUrl = `${environment.apiUrl}/admin/users`;

  constructor(private http: HttpClient) {}

  // Get all users with pagination and search
  getUsers(params: UserSearchParams = {}): Observable<ApiResponse<User[]>> {
    let httpParams = new HttpParams();
    
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.role) httpParams = httpParams.set('role', params.role);

    return this.http.get<ApiResponse<User[]>>(this.apiUrl, { params: httpParams });
  }

  // Get user by ID
  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  // Create new user
  createUser(userData: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, userData);
  }

  // Update user
  updateUser(id: string, userData: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, userData);
  }

  // Delete user
  deleteUser(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(`${this.apiUrl}/${id}`);
  }

  // Toggle user status
  toggleUserStatus(id: string): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  // Get available roles
  getAvailableRoles(): string[] {
    return ['Admin', 'HR', 'Employee', 'Manager', 'Applicant'];
  }

  // Get available statuses
  getAvailableStatuses(): string[] {
    return ['Active', 'Inactive'];
  }
}
