import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface LeaveBalance {
    id: string;
    personnel_id: string;
    leave_type_id: string;
    year: string;
    total_credits: number;
    used_credits: number;
    earned_credits: number;
    last_updated: string;
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
}
export interface EmployeeLeaveBalance {
    id: string;
    name: string;
    department: string;
    leave_balances: LeaveBalance[];
    total_accrued: number;
    total_used: number;
    total_remaining: number;
}
export interface LeaveBalanceFilter {
    department_id?: string;
    year?: string;
}
export interface Department {
    id: string;
    department_name: string;
}
export interface LeaveType {
    id: string;
    leave_type_name: string;
    description?: string;
    max_days?: number;
}
export interface LeaveAdjustment {
    id: string;
    personnel_id: string;
    leave_type_id: string;
    year: string;
    adjustment_type: 'increase' | 'decrease';
    adjustment_amount: number;
    reason: string;
    previous_balance: number;
    new_balance: number;
    created_at: string;
    personnel: {
        first_name: string;
        last_name: string;
        department?: {
            department_name: string;
        };
    };
    leave_type: {
        leave_type_name: string;
    };
    created_by_user: {
        username: string;
    };
}
export interface LeaveAdjustmentRequest {
    personnel_id: string;
    leave_type_id: string;
    year: string;
    adjustment_type: 'increase' | 'decrease';
    adjustment_amount: number;
    reason: string;
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
export declare class LeaveBalanceService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    /**
     * Get leave balance report with filters
     */
    getLeaveBalanceReport(filters?: LeaveBalanceFilter): Observable<EmployeeLeaveBalance[]>;
    /**
     * Get my leave balance
     */
    getMyLeaveBalance(): Observable<LeaveBalance[]>;
    /**
     * Get personnel leave balance
     */
    getPersonnelLeaveBalance(personnelId: string, year?: string): Observable<LeaveBalance[]>;
    /**
     * Initialize leave balances
     */
    initializeLeaveBalance(personnelId: string): Observable<any>;
    /**
     * Preview bulk initialize leave balances for all personnel without credits
     */
    previewBulkInitializeLeaveBalances(year?: string): Observable<any>;
    /**
     * Bulk initialize leave balances for all personnel without credits
     */
    bulkInitializeLeaveBalances(year?: string): Observable<any>;
    /**
     * Create leave credit adjustment
     */
    createLeaveAdjustment(adjustmentRequest: LeaveAdjustmentRequest): Observable<LeaveAdjustment>;
    /**
     * Get leave adjustments
     */
    getLeaveAdjustments(filters?: any): Observable<{
        adjustments: LeaveAdjustment[];
        pagination: any;
    }>;
    /**
     * Get personnel adjustments
     */
    getPersonnelAdjustments(personnelId: string, year?: string): Observable<{
        adjustments: LeaveAdjustment[];
        pagination: any;
    }>;
    /**
     * Get departments for filtering
     */
    getDepartments(): Observable<Department[]>;
    /**
     * Get leave types
     */
    getLeaveTypes(): Observable<LeaveType[]>;
    /**
     * Transform leave balances grouped by employee
     */
    private transformLeaveBalances;
    /**
     * Export to CSV
     */
    exportToCSV(data: EmployeeLeaveBalance[]): void;
    /**
     * Export to PDF
     */
    exportToPDF(data: EmployeeLeaveBalance[]): void;
    /**
     * Prepare CSV data
     */
    private prepareCSVData;
    /**
     * Convert data to CSV format
     */
    private convertToCSV;
    /**
     * Download file
     */
    private downloadFile;
    /**
     * Handle HTTP errors
     */
    private handleError;
}
//# sourceMappingURL=leave-balance.service.d.ts.map