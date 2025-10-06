import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface DashboardStats {
    totalEmployees: number;
    activeEmployees: number;
    pendingLeaveRequests: number;
    payrollStatus: string;
    departmentStats: any[];
    employmentTypeStats: any[];
    recentActivities: any[];
    attendanceOverview: {
        present: number;
        absent: number;
        late: number;
        onLeave: number;
        total: number;
    };
}
export interface PersonnelStats {
    total: number;
    active: number;
    inactive: number;
    departmentStats: any[];
    employmentTypeStats: any[];
}
export interface LeaveStats {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
}
export interface AttendanceStats {
    present: number;
    absent: number;
    late: number;
    onLeave: number;
    total: number;
}
export declare class AdminDashboardService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    getDashboardStats(): Observable<DashboardStats>;
    getPersonnelStats(): Observable<PersonnelStats>;
    getLeaveStats(): Observable<LeaveStats>;
    getAttendanceStats(): Observable<AttendanceStats>;
    getRecentActivities(): Observable<any[]>;
    getDashboardEmployees(): Observable<any[]>;
    getPendingLeaveApplications(): Observable<any[]>;
    getSystemHealth(): Observable<any>;
    private getDefaultStats;
}
//# sourceMappingURL=admin-dashboard.service.d.ts.map