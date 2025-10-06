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
export interface CreateLeaveTypeRequest {
    leave_type_name: string;
    description?: string;
    requires_document?: boolean;
    max_days?: number;
}
export interface UpdateLeaveTypeRequest {
    leave_type_name?: string;
    description?: string;
    requires_document?: boolean;
    max_days?: number;
    is_active?: boolean;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}
export declare class LeaveTypesService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    /**
     * Get all leave types
     */
    getLeaveTypes(): Observable<LeaveType[]>;
    /**
     * Create a new leave type
     */
    createLeaveType(leaveType: CreateLeaveTypeRequest): Observable<LeaveType>;
    /**
     * Update an existing leave type
     */
    updateLeaveType(id: string, leaveType: UpdateLeaveTypeRequest): Observable<LeaveType>;
    /**
     * Delete a leave type (hard delete)
     */
    deleteLeaveType(id: string): Observable<LeaveType>;
    /**
     * Handle HTTP errors
     */
    private handleError;
}
//# sourceMappingURL=leave-types.service.d.ts.map