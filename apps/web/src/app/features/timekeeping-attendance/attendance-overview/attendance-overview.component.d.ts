import { OnInit } from '@angular/core';
export interface Employee {
    id: number;
    name: string;
    status: 'on-time' | 'late' | 'absent';
    timeIn: string | null;
    timeOut: string | null;
    department: string;
}
export interface AttendanceSummary {
    totalPresent: number;
    totalAbsent: number;
    totalOnLeave: number;
}
export declare class AttendanceOverviewComponent implements OnInit {
    title: string;
    employees: Employee[];
    attendanceSummary: AttendanceSummary;
    constructor();
    ngOnInit(): void;
    getStatusBadgeClass(status: string): string;
    getStatusText(status: string): string;
    onViewAll(): void;
    trackByEmployeeId(index: number, employee: Employee): number;
}
//# sourceMappingURL=attendance-overview.component.d.ts.map