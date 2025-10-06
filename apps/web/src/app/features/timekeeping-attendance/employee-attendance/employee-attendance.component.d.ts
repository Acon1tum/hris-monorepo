import { OnInit } from '@angular/core';
export interface AttendanceLog {
    id: number;
    date: string;
    timeInOut: string;
    location: string;
    type: string;
    status: 'in-progress' | 'complete' | 'missing';
    statusText: string;
}
export interface ClockMethod {
    id: string;
    name: string;
    icon: string;
    action: string;
}
export interface AttendanceLog {
    id: number;
    date: string;
    timeInOut: string;
    location: string;
    type: string;
    status: 'in-progress' | 'complete' | 'missing';
    statusText: string;
}
export interface ClockMethod {
    id: string;
    name: string;
    icon: string;
    action: string;
}
export declare class EmployeeAttendanceComponent implements OnInit {
    title: string;
    currentUser: string;
    lastClockIn: string;
    isCurrentlyWorking: boolean;
    clockMethods: ClockMethod[];
    attendanceLogs: AttendanceLog[];
    constructor();
    ngOnInit(): void;
    onClockInOut(): void;
    onAlternativeMethod(method: ClockMethod): void;
    onViewSchedule(): void;
    onSubmitMissingLog(): void;
    onViewDTR(): void;
    onViewAllLogs(): void;
    getStatusBadgeClass(status: string): string;
    private calculateDuration;
    get clockButtonText(): string;
    get clockButtonIcon(): string;
    trackByLogId(index: number, log: AttendanceLog): number;
}
//# sourceMappingURL=employee-attendance.component.d.ts.map