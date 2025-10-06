import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface LeaveType {
    id: string;
    leave_type_name: string;
    description?: string;
    requires_document?: boolean;
    max_days?: number;
    is_active: boolean;
    created_at?: string;
}
export interface LeaveBalance {
    id: string;
    personnel_id: string;
    leave_type_id: string;
    year: string;
    total_credits: number;
    used_credits: number;
    earned_credits: number;
    last_updated: string;
    leave_type: LeaveType;
}
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
    approval_date?: string;
    approval_comments?: string;
    leave_type: LeaveType;
}
export interface CreateLeaveApplicationRequest {
    leave_type_id: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason?: string;
    supporting_document?: File | string | null;
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
export declare class LeaveEmployeeService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    getLeaveTypes(): Observable<LeaveType[]>;
    getMyLeaveBalance(): Observable<LeaveBalance[]>;
    getMyLeaveApplications(): Observable<LeaveApplication[]>;
    /**
     * Create a leave application. If supporting_document is a File, use FormData. Otherwise, send JSON.
     * Never send personnel_id from the frontend; backend derives it from the logged-in user.
     */
    createLeaveApplication(data: CreateLeaveApplicationRequest): Observable<LeaveApplication>;
    cancelLeaveApplication(id: string): Observable<any>;
    private handleError;
}
//# sourceMappingURL=leave-employee.service.d.ts.map