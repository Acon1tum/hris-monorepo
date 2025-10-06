import { OnInit } from '@angular/core';
import { EmployeeSelfService, EmployeeDocument } from '../../../services/employee-self.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface ReportDocument {
    id: number;
    name: string;
    description: string;
    type: 'pdf' | 'doc' | 'excel' | 'image';
    dateGenerated: Date;
    size: string;
    downloadUrl?: string;
    isAvailable: boolean;
}
export interface RequestReport {
    id: number;
    requestType: string;
    dateFiled: Date;
    status: 'approved' | 'pending' | 'rejected' | 'cancelled';
    dateApproved?: Date;
    approvedBy?: string;
}
export interface ReportTab {
    id: string;
    label: string;
    count?: number;
}
export interface ReportFilter {
    year: number;
    requestType: string;
    status: string;
}
export declare class MyReportsComponent implements OnInit {
    private employeeSelfService;
    private sanitizer;
    title: string;
    Math: Math;
    activeTab: string;
    showUploadModal: boolean;
    uploading: boolean;
    uploadError: string | null;
    selectedFile: File | null;
    uploadForm: {
        title: string;
        description: string;
        category: string;
    };
    tabs: ReportTab[];
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    filters: ReportFilter;
    availableYears: number[];
    requestTypes: string[];
    statusOptions: string[];
    showDocumentModal: boolean;
    showRequestDetailModal: boolean;
    selectedDocument: ReportDocument | null;
    selectedRequest: RequestReport | null;
    uploadedDocuments: EmployeeDocument[];
    requestReports: RequestReport[];
    showUploadedDocumentModal: boolean;
    selectedUploadedDocument: EmployeeDocument | null;
    csvPreviewData: string[][] | null;
    csvPreviewLoading: boolean;
    csvPreviewError: string | null;
    constructor(employeeSelfService: EmployeeSelfService, sanitizer: DomSanitizer);
    ngOnInit(): void;
    loadUploadedDocuments(): void;
    initializeYears(): void;
    setActiveTab(tab: string): void;
    updateTabCounts(): void;
    get filteredDocuments(): EmployeeDocument[];
    get paginatedDocuments(): EmployeeDocument[];
    get filteredRequestReports(): RequestReport[];
    get paginatedRequestReports(): RequestReport[];
    get totalPages(): number;
    get hasNextPage(): boolean;
    get hasPreviousPage(): boolean;
    nextPage(): void;
    previousPage(): void;
    goToPage(page: number): void;
    viewDocument(document: ReportDocument): void;
    closeDocumentModal(): void;
    downloadDocument(document: ReportDocument): void;
    viewRequestReport(request: RequestReport): void;
    closeRequestDetailModal(): void;
    onYearChange(year: number): void;
    onRequestTypeChange(type: string): void;
    onStatusChange(status: string): void;
    clearFilters(): void;
    getDocumentIcon(type: string): string;
    getStatusBadgeClass(status: string): string;
    getStatusIcon(status: string): string;
    formatDate(date: Date): string;
    formatFileSize(sizeBytes: number): string;
    getFileType(mimeType: string): string;
    generateDocument(type: string): void;
    openUploadModal(): void;
    closeUploadModal(): void;
    onFileSelected(event: any): void;
    uploadDocument(): void;
    deleteUploadedDocument(document: EmployeeDocument): void;
    showToastNotification(message: string): void;
    formatDateString(dateStr: string): string;
    isPdf(urlOrType: string): boolean;
    isImage(urlOrType: string): boolean;
    viewUploadedDocument(document: EmployeeDocument): void;
    closeUploadedDocumentModal(): void;
    getFullFileUrl(fileUrl: string): string;
    getSafeResourceUrl(fileUrl: string): SafeResourceUrl;
    isCsv(urlOrType: string): boolean;
    isExcel(urlOrType: string): boolean;
    parseCsv(csv: string): string[][];
    downloadDocumentFromModal(doc: ReportDocument): void;
    downloadUploadedDocumentFromModal(doc: EmployeeDocument): void;
    downloadFileWithProperName(fileUrl: string, title: string, fileType: string): void;
    getFileNameWithExtension(title: string, fileType: string): string;
    downloadWithProgress(fileUrl: string, title: string, fileType: string): void;
}
//# sourceMappingURL=my-reports.component.d.ts.map