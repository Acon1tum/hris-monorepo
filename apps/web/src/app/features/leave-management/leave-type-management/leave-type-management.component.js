"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const leave_types_service_1 = require("./leave-types.service");
let LeaveTypeManagementComponent = class LeaveTypeManagementComponent {
    leaveTypesService;
    destroy$ = new rxjs_1.Subject();
    searchTerm = '';
    leaveTypes = [];
    // Loading and error states
    isLoading = false;
    isSubmitting = false;
    error = null;
    // Pagination properties
    currentPage = 1;
    itemsPerPage = 10;
    // Add modal state
    showAddModal = false;
    addForm = {
        leave_type_name: '',
        description: '',
        requires_document: false,
        max_days: undefined
    };
    addValidation = {};
    // Edit modal state
    showEditModal = false;
    editForm = {
        id: '',
        leave_type_name: '',
        description: '',
        requires_document: false,
        max_days: undefined,
        is_active: true
    };
    editValidation = {};
    // Delete confirmation modal state
    showDeleteModal = false;
    leaveTypeToDelete = null;
    // Toast notification state
    toast = { show: false, message: '', type: '' };
    toastTimeout = null;
    constructor(leaveTypesService) {
        this.leaveTypesService = leaveTypesService;
    }
    ngOnInit() {
        this.loadLeaveTypes();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        // Clean up modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Load leave types from the API
     */
    loadLeaveTypes() {
        this.isLoading = true;
        this.error = null;
        this.leaveTypesService.getLeaveTypes()
            .pipe((0, operators_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (leaveTypes) => {
                this.leaveTypes = leaveTypes;
                this.isLoading = false;
            },
            error: (error) => {
                this.error = error.message;
                this.isLoading = false;
                this.showToast('Failed to load leave types: ' + error.message, 'error');
            }
        });
    }
    /**
     * Search functionality
     */
    onSearch(event) {
        const target = event.target;
        this.searchTerm = target.value;
        this.currentPage = 1; // Reset to first page when searching
    }
    /**
     * Open add modal
     */
    onAddLeaveType() {
        this.addForm = {
            leave_type_name: '',
            description: '',
            requires_document: false,
            max_days: undefined
        };
        this.addValidation = {};
        this.showAddModal = true;
        // Add modal-open class to body to darken sidebar
        document.body.classList.add('modal-open');
    }
    /**
     * Open edit modal
     */
    onEditLeaveType(leaveType) {
        this.editForm = {
            id: leaveType.id,
            leave_type_name: leaveType.leave_type_name,
            description: leaveType.description || '',
            requires_document: leaveType.requires_document || false,
            max_days: leaveType.max_days,
            is_active: leaveType.is_active
        };
        this.editValidation = {};
        this.showEditModal = true;
        // Add modal-open class to body to darken sidebar
        document.body.classList.add('modal-open');
    }
    /**
     * Open delete confirmation modal
     */
    onDeleteLeaveType(leaveType) {
        this.leaveTypeToDelete = leaveType;
        this.showDeleteModal = true;
        // Add modal-open class to body to darken sidebar
        document.body.classList.add('modal-open');
    }
    /**
     * Validate add form
     */
    validateAddForm() {
        this.addValidation = {};
        let valid = true;
        if (!this.addForm.leave_type_name?.trim()) {
            this.addValidation.leave_type_name = 'Leave type name is required.';
            valid = false;
        }
        if (!this.addForm.description?.trim()) {
            this.addValidation.description = 'Description is required.';
            valid = false;
        }
        if (this.addForm.max_days !== undefined && this.addForm.max_days < 0) {
            this.addValidation.max_days = 'Max days must be a positive number.';
            valid = false;
        }
        return valid;
    }
    /**
     * Submit add form
     */
    submitAddLeaveType() {
        if (!this.validateAddForm())
            return;
        this.isSubmitting = true;
        const leaveTypeData = {
            leave_type_name: this.addForm.leave_type_name.trim(),
            description: this.addForm.description?.trim(),
            requires_document: this.addForm.requires_document || false,
            max_days: this.addForm.max_days
        };
        this.leaveTypesService.createLeaveType(leaveTypeData)
            .pipe((0, operators_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (newLeaveType) => {
                // Reload data from server to ensure consistency
                this.loadLeaveTypes();
                this.showAddModal = false;
                this.isSubmitting = false;
                // Remove modal-open class from body
                document.body.classList.remove('modal-open');
                this.showToast('Leave type created successfully!', 'success');
            },
            error: (error) => {
                this.isSubmitting = false;
                this.showToast('Failed to create leave type: ' + error.message, 'error');
            }
        });
    }
    /**
     * Validate edit form
     */
    validateEditForm() {
        this.editValidation = {};
        let valid = true;
        if (!this.editForm.leave_type_name?.trim()) {
            this.editValidation.leave_type_name = 'Leave type name is required.';
            valid = false;
        }
        if (!this.editForm.description?.trim()) {
            this.editValidation.description = 'Description is required.';
            valid = false;
        }
        if (this.editForm.max_days !== undefined && this.editForm.max_days < 0) {
            this.editValidation.max_days = 'Max days must be a positive number.';
            valid = false;
        }
        return valid;
    }
    /**
     * Submit edit form
     */
    submitEditLeaveType() {
        if (!this.validateEditForm())
            return;
        this.isSubmitting = true;
        const updateData = {
            leave_type_name: this.editForm.leave_type_name?.trim(),
            description: this.editForm.description?.trim(),
            requires_document: this.editForm.requires_document,
            max_days: this.editForm.max_days,
            is_active: this.editForm.is_active
        };
        this.leaveTypesService.updateLeaveType(this.editForm.id, updateData)
            .pipe((0, operators_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (updatedLeaveType) => {
                // Reload data from server to ensure consistency
                this.loadLeaveTypes();
                this.showEditModal = false;
                this.isSubmitting = false;
                // Remove modal-open class from body
                document.body.classList.remove('modal-open');
                this.showToast('Leave type updated successfully!', 'success');
            },
            error: (error) => {
                this.isSubmitting = false;
                this.showToast('Failed to update leave type: ' + error.message, 'error');
            }
        });
    }
    /**
     * Confirm delete leave type
     */
    confirmDeleteLeaveType() {
        if (!this.leaveTypeToDelete)
            return;
        this.isSubmitting = true;
        this.leaveTypesService.deleteLeaveType(this.leaveTypeToDelete.id)
            .pipe((0, operators_1.takeUntil)(this.destroy$))
            .subscribe({
            next: () => {
                // Reload data from server to ensure consistency
                this.loadLeaveTypes();
                this.showDeleteModal = false;
                this.leaveTypeToDelete = null;
                this.isSubmitting = false;
                // Remove modal-open class from body
                document.body.classList.remove('modal-open');
                this.showToast('Leave type deleted successfully!', 'success');
            },
            error: (error) => {
                this.isSubmitting = false;
                this.showToast('Failed to delete leave type: ' + error.message, 'error');
            }
        });
    }
    /**
     * Cancel delete operation
     */
    cancelDeleteLeaveType() {
        this.showDeleteModal = false;
        this.leaveTypeToDelete = null;
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 3000) {
        this.toast.show = true;
        this.toast.message = message;
        this.toast.type = type;
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        this.toastTimeout = setTimeout(() => {
            this.toast.show = false;
        }, duration);
    }
    /**
     * Retry loading leave types
     */
    retryLoad() {
        this.loadLeaveTypes();
    }
    // Computed properties for filtered and paginated data
    get filteredLeaveTypes() {
        if (!this.searchTerm) {
            return this.leaveTypes;
        }
        return this.leaveTypes.filter(leaveType => leaveType.leave_type_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (leaveType.description && leaveType.description.toLowerCase().includes(this.searchTerm.toLowerCase())));
    }
    get paginatedLeaveTypes() {
        const filtered = this.filteredLeaveTypes;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filtered.slice(startIndex, endIndex);
    }
    get totalPages() {
        return Math.ceil(this.filteredLeaveTypes.length / this.itemsPerPage);
    }
    get displayStart() {
        if (this.filteredLeaveTypes.length === 0)
            return 0;
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }
    get displayEnd() {
        const end = this.currentPage * this.itemsPerPage;
        return Math.min(end, this.filteredLeaveTypes.length);
    }
    get displayTotal() {
        return this.filteredLeaveTypes.length;
    }
    // Pagination methods
    onPageChange(page) {
        this.currentPage = page;
    }
    getPaginationPages() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    onNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
    get canGoToPrevious() {
        return this.currentPage > 1;
    }
    get canGoToNext() {
        return this.currentPage < this.totalPages;
    }
    trackByLeaveTypeId(index, leaveType) {
        return leaveType.id;
    }
};
exports.LeaveTypeManagementComponent = LeaveTypeManagementComponent;
exports.LeaveTypeManagementComponent = LeaveTypeManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-leave-type-management',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './leave-type-management.component.html',
        styleUrls: ['./leave-type-management.component.scss']
    }),
    __metadata("design:paramtypes", [leave_types_service_1.LeaveTypesService])
], LeaveTypeManagementComponent);
//# sourceMappingURL=leave-type-management.component.js.map