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
exports.LeaveRequestManagementComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const forms_2 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const leave_request_management_service_1 = require("./leave-request-management.service");
let LeaveRequestManagementComponent = class LeaveRequestManagementComponent {
    leaveRequestService;
    fb;
    destroy$ = new rxjs_1.Subject();
    // Data properties
    leaveApplications = [];
    departments = [];
    personnel = [];
    // Loading and error states
    isLoading = false;
    error = null;
    // Filtering and pagination
    filters = {};
    currentPage = 1;
    itemsPerPage = 10;
    totalItems = 0;
    totalPages = 0;
    // Search
    searchTerm = '';
    // Modal states
    showApprovalModal = false;
    selectedApplication = null;
    approvalType = 'approve';
    approvalForm;
    isSubmitting = false;
    // Toast notification
    toast = {
        show: false,
        message: '',
        type: 'info'
    };
    // Filter options
    statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
    ];
    constructor(leaveRequestService, fb) {
        this.leaveRequestService = leaveRequestService;
        this.fb = fb;
        this.approvalForm = this.fb.group({
            comments: ['', [forms_1.Validators.maxLength(500)]]
        });
    }
    ngOnInit() {
        this.initializeData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Initialize component data
     */
    async initializeData() {
        this.isLoading = true;
        this.error = null;
        try {
            // Load filter options
            await Promise.all([
                this.loadDepartments(),
                this.loadPersonnel()
            ]);
            // Load leave applications
            await this.loadLeaveApplications();
        }
        catch (error) {
            this.error = error.message || 'Failed to load data';
        }
        finally {
            this.isLoading = false;
        }
    }
    /**
     * Load departments for filtering
     */
    loadDepartments() {
        return new Promise((resolve, reject) => {
            this.leaveRequestService.getDepartments()
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (departments) => {
                    this.departments = departments;
                    resolve();
                },
                error: (error) => {
                    console.error('Error loading departments:', error);
                    resolve(); // Don't fail the whole initialization
                }
            });
        });
    }
    /**
     * Load personnel for filtering
     */
    loadPersonnel() {
        return new Promise((resolve, reject) => {
            this.leaveRequestService.getPersonnel()
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (personnel) => {
                    this.personnel = personnel;
                    resolve();
                },
                error: (error) => {
                    console.error('Error loading personnel:', error);
                    resolve(); // Don't fail the whole initialization
                }
            });
        });
    }
    /**
     * Load leave applications with current filters
     */
    loadLeaveApplications() {
        return new Promise((resolve, reject) => {
            this.isLoading = true;
            const filterParams = {
                ...this.filters,
                page: this.currentPage,
                limit: this.itemsPerPage
            };
            this.leaveRequestService.getLeaveApplications(filterParams)
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (result) => {
                    // Ensure applications is always an array
                    this.leaveApplications = Array.isArray(result.applications) ? result.applications : [];
                    this.totalItems = result.pagination?.total || 0;
                    this.totalPages = result.pagination?.totalPages || 0;
                    this.isLoading = false;
                    resolve();
                },
                error: (error) => {
                    this.error = error.message;
                    this.leaveApplications = []; // Reset to empty array on error
                    this.isLoading = false;
                    reject(error);
                }
            });
        });
    }
    /**
     * Apply filters and reload data
     */
    onApplyFilters() {
        this.currentPage = 1;
        this.loadLeaveApplications();
    }
    /**
     * Clear all filters
     */
    onClearFilters() {
        this.filters = {};
        this.searchTerm = '';
        this.currentPage = 1;
        this.loadLeaveApplications();
    }
    /**
     * Handle search input
     */
    onSearch() {
        // Implement search logic if needed
        this.onApplyFilters();
    }
    /**
     * Handle pagination change
     */
    onPageChange(page) {
        this.currentPage = page;
        this.loadLeaveApplications();
    }
    /**
     * Open approval modal
     */
    openApprovalModal(application, type) {
        this.selectedApplication = application;
        this.approvalType = type;
        this.showApprovalModal = true;
        this.approvalForm.reset();
    }
    /**
     * Close approval modal
     */
    closeApprovalModal() {
        this.showApprovalModal = false;
        this.selectedApplication = null;
        this.approvalForm.reset();
    }
    /**
     * Submit approval/rejection
     */
    onSubmitApproval() {
        if (!this.selectedApplication || this.isSubmitting)
            return;
        this.isSubmitting = true;
        const comments = this.approvalForm.get('comments')?.value || '';
        const request = this.approvalType === 'approve'
            ? this.leaveRequestService.approveApplication(this.selectedApplication.id, comments)
            : this.leaveRequestService.rejectApplication(this.selectedApplication.id, comments);
        request.pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (updatedApplication) => {
                this.showToast(`Leave application ${this.approvalType === 'approve' ? 'approved' : 'rejected'} successfully!`, 'success');
                this.closeApprovalModal();
                this.loadLeaveApplications();
                this.isSubmitting = false;
            },
            error: (error) => {
                this.showToast(`Failed to ${this.approvalType} application: ${error.message}`, 'error');
                this.isSubmitting = false;
            }
        });
    }
    /**
     * Get supporting document URL
     */
    getSupportingDocumentUrl(documentPath) {
        return this.leaveRequestService.getSupportingDocumentUrl(documentPath);
    }
    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    /**
     * Get status badge class
     */
    getStatusBadgeClass(status) {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'approved':
                return 'status-approved';
            case 'rejected':
                return 'status-rejected';
            default:
                return 'status-default';
        }
    }
    /**
     * Get full employee name
     */
    getEmployeeName(application) {
        return `${application.personnel.first_name} ${application.personnel.last_name}`;
    }
    /**
     * Get department name
     */
    getDepartmentName(application) {
        return application.personnel.department?.department_name || 'No Department';
    }
    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        this.toast.show = true;
        this.toast.message = message;
        this.toast.type = type;
        setTimeout(() => {
            this.toast.show = false;
        }, 5000);
    }
    /**
     * Track by function for ngFor
     */
    trackByApplicationId(index, application) {
        return application.id;
    }
    /**
     * Check if document is an image
     */
    isImageFile(filename) {
        if (!filename)
            return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
        return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    }
    /**
     * Check if document is a PDF
     */
    isPdfFile(filename) {
        if (!filename)
            return false;
        return filename.toLowerCase().endsWith('.pdf');
    }
    /**
     * Retry loading data
     */
    retryLoad() {
        this.initializeData();
    }
    /**
     * Handle image loading errors
     */
    onImageError(event) {
        const target = event.target;
        target.style.display = 'none';
    }
    /**
     * Get pagination pages array
     */
    getPaginationPages() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
};
exports.LeaveRequestManagementComponent = LeaveRequestManagementComponent;
exports.LeaveRequestManagementComponent = LeaveRequestManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-leave-request-management',
        standalone: true,
        imports: [common_1.CommonModule, forms_2.FormsModule, forms_1.ReactiveFormsModule],
        templateUrl: './leave-request-management.component.html',
        styleUrls: ['./leave-request-management.component.scss']
    }),
    __metadata("design:paramtypes", [leave_request_management_service_1.LeaveRequestManagementService,
        forms_1.FormBuilder])
], LeaveRequestManagementComponent);
//# sourceMappingURL=leave-request-management.component.js.map