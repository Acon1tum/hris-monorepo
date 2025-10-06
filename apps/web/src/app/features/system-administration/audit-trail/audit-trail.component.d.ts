interface AuditLog {
    id: number;
    username: string;
    dateTime: string;
    module: string;
    action: string;
    actionType: 'created' | 'updated' | 'deleted' | 'assigned' | 'revoked' | 'login';
    historicalValue: string;
    ipAddress: string;
}
export declare class AuditTrailComponent {
    searchTerm: string;
    auditLogs: AuditLog[];
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onSearch(event: Event): void;
    onFilter(): void;
    get filteredLogs(): AuditLog[];
    get paginatedLogs(): AuditLog[];
    get totalPages(): number;
    get displayStart(): number;
    get displayEnd(): number;
    onPreviousPage(): void;
    onNextPage(): void;
    getActionBadgeClass(actionType: string): string;
    trackByLogId(index: number, log: AuditLog): number;
}
export {};
//# sourceMappingURL=audit-trail.component.d.ts.map