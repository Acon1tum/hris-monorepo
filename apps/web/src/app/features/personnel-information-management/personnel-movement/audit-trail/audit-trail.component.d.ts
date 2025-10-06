import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface AuditTrail {
    id: number;
    user: string;
    userRole: string;
    action: string;
    details: string;
    module: string;
    timestamp: Date;
    ipAddress: string;
    status: 'success' | 'warning' | 'error' | 'info';
}
export declare class AuditTrailComponent implements OnInit {
    private router;
    auditTrails: AuditTrail[];
    filteredAuditTrails: AuditTrail[];
    paginatedAuditTrails: AuditTrail[];
    searchTerm: string;
    selectedUser: string;
    selectedAction: string;
    selectedDateRange: string;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    get uniqueUsers(): string[];
    get uniqueActions(): string[];
    Math: Math;
    constructor(router: Router);
    ngOnInit(): void;
    goBack(): void;
    loadMockData(): void;
    onSearch(): void;
    onFilter(): void;
    applyFilters(): void;
    clearFilters(): void;
    updatePagination(): void;
    updatePaginatedData(): void;
    previousPage(): void;
    nextPage(): void;
    goToPage(page: number | string): void;
    getVisiblePages(): (number | string)[];
    trackByAuditId(index: number, audit: AuditTrail): number;
    getCurrentTime(): string;
    getActionIcon(action: string): string;
    getActionIconClass(action: string): string;
    getStatusClass(status: string): string;
    getStatusDotClass(status: string): string;
    exportData(): void;
}
export {};
//# sourceMappingURL=audit-trail.component.d.ts.map