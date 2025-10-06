import { OnInit } from '@angular/core';
export interface AttendanceLog {
    id: number;
    employeeName: string;
    department: string;
    timeIn: string;
    timeOut: string;
    totalHours: string;
    late: string;
    undertime: string;
    overtime: string;
    status: 'on-time' | 'late';
    remarks: string;
    date: Date;
    logMethod?: string;
}
export interface FilterOptions {
    dateRange: string;
    employee: string;
    department: string;
    logMethod: string;
    searchTerm: string;
}
export declare class AttendanceLogsComponent implements OnInit {
    title: string;
    attendanceLogs: AttendanceLog[];
    filters: FilterOptions;
    employees: {
        value: string;
        label: string;
    }[];
    departments: {
        value: string;
        label: string;
    }[];
    logMethods: {
        value: string;
        label: string;
    }[];
    currentPage: number;
    itemsPerPage: number;
    constructor();
    ngOnInit(): void;
    get filteredLogs(): AttendanceLog[];
    get paginatedLogs(): AttendanceLog[];
    get totalPages(): number;
    get hasNextPage(): boolean;
    get hasPreviousPage(): boolean;
    getStatusBadgeClass(status: string): string;
    getStatusText(status: string): string;
    isLateTime(time: string): boolean;
    onExportLogs(): void;
    onApplyFilters(): void;
    onClearFilters(): void;
    onSearch(): void;
    nextPage(): void;
    previousPage(): void;
    goToPage(page: number): void;
    trackByLogId(index: number, log: AttendanceLog): number;
}
//# sourceMappingURL=attendance-logs.component.d.ts.map