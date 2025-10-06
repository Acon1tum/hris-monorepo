import { Observable } from 'rxjs';
declare enum ReportType {
    EMPLOYEE = "employee",
    PAYROLL = "payroll",
    ATTENDANCE = "attendance",
    LEAVE = "leave",
    PERFORMANCE = "performance",
    CUSTOM = "custom"
}
export interface AuditTrail {
    id: string;
    reportName: string;
    reportType: ReportType | string;
    generatedBy: string;
    generatedAt: Date;
    department: string;
    action: string;
    fileSize: string;
    downloadCount: number;
    status: string;
    ipAddress: string;
    userAgent: string;
    filters: string[];
    templateUsed: string;
    exportFormat?: 'csv' | 'excel' | 'pdf' | 'print';
    reportData?: {
        headers: string[];
        rows: any[][];
        totalRecords: number;
        totalValue?: number;
    };
    reportMetadata?: {
        dateRange: string;
        department: string;
        reportType: string;
        appliedFilters: string[];
    };
}
export declare class AuditTrailService {
    private auditTrailsSubject;
    auditTrails$: Observable<AuditTrail[]>;
    constructor();
    getAuditTrails(): AuditTrail[];
    addAuditTrailEntry(auditEntry: AuditTrail): void;
    clearAuditTrails(): void;
    deleteAuditTrail(id: string): void;
    updateAuditTrail(id: string, updates: Partial<AuditTrail>): void;
}
export {};
//# sourceMappingURL=audit-trail.service.d.ts.map