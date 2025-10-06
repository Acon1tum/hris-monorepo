import { OnInit } from '@angular/core';
export interface DtrAdjustment {
    id: number;
    employeeId: string;
    employeeName: string;
    submissionDate: Date;
    missedLogDate: Date;
    timeIn: string;
    timeOut: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    evidence?: DtrEvidence;
    approvedBy?: string;
    approvedDate?: Date;
    rejectedBy?: string;
    rejectedDate?: Date;
    remarks?: string;
}
export interface DtrEvidence {
    fileName: string;
    fileSize: string;
    fileType: string;
    thumbnailUrl?: string;
}
export interface AdjustmentSection {
    title: string;
    count: number;
    adjustments: DtrAdjustment[];
}
export declare class DtrAdjustmentComponent implements OnInit {
    title: string;
    searchTerm: string;
    adjustments: DtrAdjustment[];
    constructor();
    ngOnInit(): void;
    get adjustmentSections(): AdjustmentSection[];
    get filteredAdjustments(): DtrAdjustment[];
    getStatusBadgeClass(status: string): string;
    getStatusIcon(status: string): string;
    formatDate(date: Date): string;
    formatDateTime(date: Date): string;
    onSearch(): void;
    onFilter(): void;
    onSort(): void;
    onApproveAdjustment(adjustment: DtrAdjustment): void;
    onRejectAdjustment(adjustment: DtrAdjustment): void;
    onViewAuditTrail(adjustment: DtrAdjustment): void;
    onDownloadEvidence(evidence: DtrEvidence): void;
    trackByAdjustmentId(index: number, adjustment: DtrAdjustment): number;
}
//# sourceMappingURL=dtr-adjustment.component.d.ts.map