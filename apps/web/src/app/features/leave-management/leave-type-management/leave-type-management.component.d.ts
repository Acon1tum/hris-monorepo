import { OnInit, OnDestroy } from '@angular/core';
import { LeaveTypesService, LeaveType, CreateLeaveTypeRequest, UpdateLeaveTypeRequest } from './leave-types.service';
export declare class LeaveTypeManagementComponent implements OnInit, OnDestroy {
    private leaveTypesService;
    private destroy$;
    searchTerm: string;
    leaveTypes: LeaveType[];
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    showAddModal: boolean;
    addForm: CreateLeaveTypeRequest;
    addValidation: any;
    showEditModal: boolean;
    editForm: UpdateLeaveTypeRequest & {
        id: string;
    };
    editValidation: any;
    showDeleteModal: boolean;
    leaveTypeToDelete: LeaveType | null;
    toast: {
        show: boolean;
        message: string;
        type: string;
    };
    toastTimeout: any;
    constructor(leaveTypesService: LeaveTypesService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Load leave types from the API
     */
    loadLeaveTypes(): void;
    /**
     * Search functionality
     */
    onSearch(event: Event): void;
    /**
     * Open add modal
     */
    onAddLeaveType(): void;
    /**
     * Open edit modal
     */
    onEditLeaveType(leaveType: LeaveType): void;
    /**
     * Open delete confirmation modal
     */
    onDeleteLeaveType(leaveType: LeaveType): void;
    /**
     * Validate add form
     */
    validateAddForm(): boolean;
    /**
     * Submit add form
     */
    submitAddLeaveType(): void;
    /**
     * Validate edit form
     */
    validateEditForm(): boolean;
    /**
     * Submit edit form
     */
    submitEditLeaveType(): void;
    /**
     * Confirm delete leave type
     */
    confirmDeleteLeaveType(): void;
    /**
     * Cancel delete operation
     */
    cancelDeleteLeaveType(): void;
    /**
     * Show toast notification
     */
    showToast(message: string, type?: string, duration?: number): void;
    /**
     * Retry loading leave types
     */
    retryLoad(): void;
    get filteredLeaveTypes(): LeaveType[];
    get paginatedLeaveTypes(): LeaveType[];
    get totalPages(): number;
    get displayStart(): number;
    get displayEnd(): number;
    get displayTotal(): number;
    onPageChange(page: number): void;
    getPaginationPages(): number[];
    onPreviousPage(): void;
    onNextPage(): void;
    get canGoToPrevious(): boolean;
    get canGoToNext(): boolean;
    trackByLeaveTypeId(index: number, leaveType: LeaveType): string;
}
//# sourceMappingURL=leave-type-management.component.d.ts.map