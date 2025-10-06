import { BaseEntity } from './common';
export interface Document extends BaseEntity {
    documentName: string;
    documentType?: string;
    filePath: string;
    uploadedBy: string;
    uploadDate: Date;
    relatedToTable?: string;
    relatedToId?: string;
    description?: string;
    isPublic: boolean;
}
export interface EmployeeDocument extends BaseEntity {
    personnelId?: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    isPrivate: boolean;
}
export interface CreateDocumentRequest {
    documentName: string;
    documentType?: string;
    filePath: string;
    relatedToTable?: string;
    relatedToId?: string;
    description?: string;
    isPublic?: boolean;
}
export interface UpdateDocumentRequest {
    documentName?: string;
    documentType?: string;
    description?: string;
    isPublic?: boolean;
}
export interface CreateEmployeeDocumentRequest {
    personnelId?: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    isPrivate?: boolean;
}
export interface UpdateEmployeeDocumentRequest {
    title?: string;
    description?: string;
    category?: string;
    isPrivate?: boolean;
}
//# sourceMappingURL=document.d.ts.map