import { BaseEntity } from './common';
export interface AuditLog extends BaseEntity {
    userId: string;
    actionType: string;
    tableAffected: string;
    recordId: string;
    actionDetails?: string;
    ipAddress?: string;
    userAgent?: string;
    timestamp: Date;
}
export interface CreateAuditLogRequest {
    userId: string;
    actionType: string;
    tableAffected: string;
    recordId: string;
    actionDetails?: string;
    ipAddress?: string;
    userAgent?: string;
}
//# sourceMappingURL=audit.d.ts.map