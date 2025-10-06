import { BaseEntity } from './common';
export interface Report extends BaseEntity {
    reportName: string;
    generatedBy: string;
    filePath: string;
    digitalSignature?: string;
    createdAt: Date;
}
export interface CreateReportRequest {
    reportName: string;
    filePath: string;
    digitalSignature?: string;
}
export interface GenerateReportRequest {
    reportType: string;
    parameters: Record<string, any>;
    format: 'PDF' | 'Excel' | 'CSV';
}
//# sourceMappingURL=report.d.ts.map