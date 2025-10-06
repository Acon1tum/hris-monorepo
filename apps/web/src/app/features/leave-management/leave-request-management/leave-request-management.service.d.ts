import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface LeaveApplication {
    id: string;
    personnel_id: string;
    leave_type_id: string;
    start_date: string;
    end_date: string;
    total_days: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason?: string;
    supporting_document?: string;
    request_date: string;
    approved_by?: string;
    approval_date?: string;
    approval_comments?: string;
    personnel: {
        id: string;
        first_name: string;
        last_name: string;
        department?: {
            id: string;
            department_name: string;
        };
    };
    leave_type: {
        id: string;
        leave_type_name: string;
        description?: string;
    };
    approved_by_user?: {
        id: string;
        username: string;
        first_name?: string;
        last_name?: string;
    };
}
export interface LeaveApplicationFilter {
    status?: string;
    personnel_id?: string;
    department_id?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
}
export interface ApprovalRequest {
    status: 'Approved' | 'Rejected';
    comments?: string;
}
export interface Department {
    id: string;
    department_name: string;
}
export interface Personnel {
    id: string;
    first_name: string;
    last_name: string;
    department_id?: string;
    department?: Department;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export declare class LeaveRequestManagementService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    /**
     * Get all leave applications with filters
     */
    getLeaveApplications(filters?: LeaveApplicationFilter): Observable<{
        applications: LeaveApplication[];
        pagination: any;
    }>;
    /**
     * Get pending leave applications for approval
     */
    getPendingApplications(): Observable<LeaveApplication[]>;
    /**
     * Approve a leave application
     */
    approveApplication(id: string, comments?: string): Observable<LeaveApplication>;
    /**
     * Reject a leave application
     */
    rejectApplication(id: string, comments?: string): Observable<LeaveApplication>;
    /**
     * Get all departments for filtering
     */
    getDepartments(): Observable<Department[]>;
    /**
     * Get all personnel for filtering
     */
    getPersonnel(): Observable<Personnel[]>;
    /**
     * Get supporting document URL for preview
     */
    getSupportingDocumentUrl(documentPath: string): string;
    /**
     * Handle HTTP errors
     */
    private handleError;
}
//# sourceMappingURL=leave-request-management.service.d.ts.map