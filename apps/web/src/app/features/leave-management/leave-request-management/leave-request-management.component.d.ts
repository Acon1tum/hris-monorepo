import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveRequestManagementService, LeaveApplication, LeaveApplicationFilter, Department, Personnel } from './leave-request-management.service';
export declare class LeaveRequestManagementComponent implements OnInit, OnDestroy {
    private leaveRequestService;
    private fb;
    private destroy$;
    leaveApplications: LeaveApplication[];
    departments: Department[];
    personnel: Personnel[];
    isLoading: boolean;
    error: string | null;
    filters: LeaveApplicationFilter;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    searchTerm: string;
    showApprovalModal: boolean;
    selectedApplication: LeaveApplication | null;
    approvalType: 'approve' | 'reject';
    approvalForm: FormGroup;
    isSubmitting: boolean;
    toast: {
        show: boolean;
        message: string;
        type: string;
    };
    statusOptions: {
        label: string;
        value: string;
    }[];
    constructor(leaveRequestService: LeaveRequestManagementService, fb: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Initialize component data
     */
    private initializeData;
    /**
     * Load departments for filtering
     */
    private loadDepartments;
    /**
     * Load personnel for filtering
     */
    private loadPersonnel;
    /**
     * Load leave applications with current filters
     */
    loadLeaveApplications(): Promise<void>;
    /**
     * Apply filters and reload data
     */
    onApplyFilters(): void;
    /**
     * Clear all filters
     */
    onClearFilters(): void;
    /**
     * Handle search input
     */
    onSearch(): void;
    /**
     * Handle pagination change
     */
    onPageChange(page: number): void;
    /**
     * Open approval modal
     */
    openApprovalModal(application: LeaveApplication, type: 'approve' | 'reject'): void;
    /**
     * Close approval modal
     */
    closeApprovalModal(): void;
    /**
     * Submit approval/rejection
     */
    onSubmitApproval(): void;
    /**
     * Get supporting document URL
     */
    getSupportingDocumentUrl(documentPath: string): string;
    /**
     * Format date for display
     */
    formatDate(dateString: string): string;
    /**
     * Get status badge class
     */
    getStatusBadgeClass(status: string): string;
    /**
     * Get full employee name
     */
    getEmployeeName(application: LeaveApplication): string;
    /**
     * Get department name
     */
    getDepartmentName(application: LeaveApplication): string;
    /**
     * Show toast notification
     */
    showToast(message: string, type?: string): void;
    /**
     * Track by function for ngFor
     */
    trackByApplicationId(index: number, application: LeaveApplication): string;
    /**
     * Check if document is an image
     */
    isImageFile(filename: string | undefined): boolean;
    /**
     * Check if document is a PDF
     */
    isPdfFile(filename: string | undefined): boolean;
    /**
     * Retry loading data
     */
    retryLoad(): void;
    /**
     * Handle image loading errors
     */
    onImageError(event: Event): void;
    /**
     * Get pagination pages array
     */
    getPaginationPages(): number[];
}
//# sourceMappingURL=leave-request-management.component.d.ts.map