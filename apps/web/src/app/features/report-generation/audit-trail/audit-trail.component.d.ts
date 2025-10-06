import { OnInit, OnDestroy } from '@angular/core';
import { AuditTrailService, AuditTrail } from '../audit-trail.service';
export declare class AuditTrailComponent implements OnInit, OnDestroy {
    private auditTrailService;
    auditTrails: AuditTrail[];
    private subscription;
    auditFilters: {
        dateRange: string;
        department: string;
        action: string;
        status: string;
        reportType: string;
    };
    showViewModal: boolean;
    selectedAudit: AuditTrail | null;
    showNotification: boolean;
    notificationMessage: string;
    constructor(auditTrailService: AuditTrailService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    showNotificationMessage(message: string): void;
    exportAuditTrail(): void;
    clearAuditTrail(): void;
    filterAuditTrails(): void;
    deleteAuditTrail(id: string): void;
    viewAuditTrail(audit: AuditTrail): void;
    closeViewModal(): void;
    getActionIcon(action: string): string;
    getActionColor(action: string): string;
    getStatusIcon(status: string): string;
    getStatusColor(status: string): string;
    getFormatIcon(format: string): string;
    getFormatColor(format: string): string;
    formatDate(date: Date): string;
    getTimeAgo(date: Date): string;
    addAuditTrailEntry(auditEntry: AuditTrail): void;
    copyAuditDetails(audit: AuditTrail): void;
}
//# sourceMappingURL=audit-trail.component.d.ts.map