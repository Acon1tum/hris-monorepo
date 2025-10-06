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
exports.LeaveBalanceComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const leave_balance_service_1 = require("./leave-balance.service");
const personnel_service_1 = require("../../personnel-information-management/personnel.service");
let LeaveBalanceComponent = class LeaveBalanceComponent {
    leaveBalanceService;
    personnelService;
    formBuilder;
    destroy$ = new rxjs_1.Subject();
    // Component state
    title = 'Leave Balances';
    subtitle = 'Manage and view leave balances for all employees.';
    // Data properties
    employees = [];
    filteredEmployees = [];
    departments = [];
    allPersonnel = []; // For employee dropdown in adjust modal
    leaveTypes = []; // For leave type dropdown in adjust modal
    // UI state
    isLoading = false;
    isExporting = false;
    isBulkInitializing = false;
    error = '';
    // Filters
    searchTerm = '';
    selectedDepartment = '';
    selectedYear = new Date().getFullYear().toString();
    // Pagination
    currentPage = 1;
    itemsPerPage = 10;
    totalResults = 0;
    totalPages = 0;
    // Modal states
    showEmployeeModal = false;
    showEmployeeAdjustModal = false;
    showBulkInitializeModal = false;
    showBulkInitializeSuccessModal = false;
    selectedEmployee = null;
    selectedEmployeeForAdjust = null;
    // Adjustment form
    adjustmentForm;
    isSubmittingAdjustment = false;
    adjustmentError = '';
    // Adjustment history
    adjustmentHistory = [];
    showAdjustmentHistory = false;
    isLoadingHistory = false;
    // Bulk initialization result
    bulkInitializeResult = null;
    personnelToReceiveCredits = [];
    personnelWithExistingCredits = [];
    constructor(leaveBalanceService, personnelService, formBuilder) {
        this.leaveBalanceService = leaveBalanceService;
        this.personnelService = personnelService;
        this.formBuilder = formBuilder;
        this.adjustmentForm = this.formBuilder.group({
            personnel_id: ['', forms_1.Validators.required],
            leave_type_id: ['', forms_1.Validators.required],
            year: [new Date().getFullYear().toString(), forms_1.Validators.required],
            adjustment_type: ['increase', forms_1.Validators.required],
            adjustment_amount: [0, [forms_1.Validators.required, forms_1.Validators.min(0.01)]],
            reason: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]]
        });
    }
    ngOnInit() {
        this.initializeData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        // Clean up modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Initialize component data
     */
    async initializeData() {
        try {
            await Promise.all([
                this.loadDepartments(),
                this.loadLeaveBalances(),
                this.loadAllPersonnel(),
                this.loadLeaveTypes() // Load leave types here
            ]);
        }
        catch (error) {
            console.error('Error initializing data:', error);
        }
    }
    /**
     * Load departments for filtering
     */
    loadDepartments() {
        return new Promise((resolve) => {
            this.leaveBalanceService.getDepartments()
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
     * Load leave balances from backend
     */
    loadLeaveBalances() {
        return new Promise((resolve, reject) => {
            this.isLoading = true;
            this.error = '';
            const filters = {};
            if (this.selectedDepartment) {
                filters.department_id = this.selectedDepartment;
            }
            if (this.selectedYear) {
                filters.year = this.selectedYear;
            }
            this.leaveBalanceService.getLeaveBalanceReport(filters)
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (employees) => {
                    this.employees = employees;
                    this.applyFilters();
                    this.isLoading = false;
                    resolve();
                },
                error: (error) => {
                    this.error = error.message;
                    this.employees = [];
                    this.filteredEmployees = [];
                    this.isLoading = false;
                    reject(error);
                }
            });
        });
    }
    /**
     * Load all personnel for employee dropdown
     */
    loadAllPersonnel() {
        return new Promise((resolve) => {
            this.personnelService.getPersonnel(1, 1000, '') // Get all personnel (1000 limit should be enough)
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (response) => {
                    this.allPersonnel = response.data;
                    resolve();
                },
                error: (error) => {
                    console.error('Error loading personnel:', error);
                    resolve();
                }
            });
        });
    }
    /**
     * Load leave types for the adjustment modal
     */
    loadLeaveTypes() {
        return new Promise((resolve) => {
            this.leaveBalanceService.getLeaveTypes()
                .pipe((0, rxjs_1.takeUntil)(this.destroy$))
                .subscribe({
                next: (leaveTypes) => {
                    this.leaveTypes = leaveTypes;
                    resolve();
                },
                error: (error) => {
                    console.error('Error loading leave types:', error);
                    resolve(); // Don't fail the whole initialization
                }
            });
        });
    }
    /**
     * Apply search and pagination filters
     */
    applyFilters() {
        let filtered = [...this.employees];
        // Apply search filter
        if (this.searchTerm.trim()) {
            const searchLower = this.searchTerm.toLowerCase();
            filtered = filtered.filter(employee => employee.name.toLowerCase().includes(searchLower) ||
                employee.id.toLowerCase().includes(searchLower) ||
                employee.department.toLowerCase().includes(searchLower));
        }
        this.totalResults = filtered.length;
        this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
        // Apply pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.filteredEmployees = filtered.slice(startIndex, endIndex);
    }
    /**
     * Handle search input changes
     */
    onSearchChange() {
        this.currentPage = 1;
        this.applyFilters();
    }
    /**
     * Handle department filter changes
     */
    onDepartmentChange() {
        this.currentPage = 1;
        this.loadLeaveBalances();
    }
    /**
     * Handle year filter changes
     */
    onYearChange() {
        this.currentPage = 1;
        this.loadLeaveBalances();
    }
    /**
     * Handle pagination changes
     */
    onPageChange(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.applyFilters();
        }
    }
    /**
     * Get pagination pages array
     */
    getPaginationPages() {
        const pages = [];
        const maxVisiblePages = 5;
        if (this.totalPages <= maxVisiblePages) {
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            const halfVisible = Math.floor(maxVisiblePages / 2);
            let start = Math.max(1, this.currentPage - halfVisible);
            let end = Math.min(this.totalPages, start + maxVisiblePages - 1);
            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(1, end - maxVisiblePages + 1);
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        return pages;
    }
    /**
     * Refresh data
     */
    refreshData() {
        this.loadLeaveBalances();
    }
    /**
     * View employee details
     */
    viewDetails(employee) {
        this.selectedEmployee = employee;
        this.showEmployeeModal = true;
        // Add modal-open class to body to darken sidebar
        document.body.classList.add('modal-open');
    }
    /**
     * Close employee details modal
     */
    closeEmployeeModal() {
        this.showEmployeeModal = false;
        this.selectedEmployee = null;
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Open adjust credits modal
     */
    adjustCredits(employee) {
        this.selectedEmployeeForAdjust = employee || null;
        this.adjustmentError = '';
        if (employee) {
            this.adjustmentForm.patchValue({
                personnel_id: employee.id,
                year: this.selectedYear
            });
        }
        else {
            this.adjustmentForm.patchValue({
                personnel_id: '',
                year: this.selectedYear
            });
        }
        this.showEmployeeAdjustModal = true;
        // Add modal-open class to body to darken sidebar
        document.body.classList.add('modal-open');
    }
    /**
     * Close adjust credits modal
     */
    closeEmployeeAdjustModal() {
        this.showEmployeeAdjustModal = false;
        this.selectedEmployeeForAdjust = null;
        this.adjustmentForm.reset({
            personnel_id: '',
            leave_type_id: '',
            year: new Date().getFullYear().toString(),
            adjustment_type: 'increase',
            adjustment_amount: 0,
            reason: ''
        });
        this.adjustmentError = '';
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Export to CSV
     */
    exportToCSV() {
        if (this.employees.length === 0) {
            alert('No data to export');
            return;
        }
        this.isExporting = true;
        try {
            this.leaveBalanceService.exportToCSV(this.employees);
        }
        catch (error) {
            console.error('Error exporting to CSV:', error);
            alert('Error exporting to CSV');
        }
        finally {
            this.isExporting = false;
        }
    }
    /**
     * Export to PDF
     */
    exportToPDF() {
        if (this.employees.length === 0) {
            alert('No data to export');
            return;
        }
        this.isExporting = true;
        try {
            this.leaveBalanceService.exportToPDF(this.employees);
        }
        catch (error) {
            console.error('Error exporting to PDF:', error);
            alert('Error exporting to PDF');
        }
        finally {
            this.isExporting = false;
        }
    }
    /**
     * Initialize leave balance for specific employee
     */
    initializeBalance(employee) {
        this.leaveBalanceService.initializeLeaveBalance(employee.id)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: () => {
                this.refreshData();
            },
            error: (error) => {
                console.error('Error initializing balance:', error);
                alert('Error initializing leave balance');
            }
        });
    }
    /**
     * Bulk initialize leave credits for all personnel without credits
     */
    bulkInitializeCredits() {
        this.isBulkInitializing = true;
        this.error = '';
        // First, get the preview data to show what will be created
        this.leaveBalanceService.previewBulkInitializeLeaveBalances(this.selectedYear)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (result) => {
                this.isBulkInitializing = false;
                this.personnelToReceiveCredits = result.personnelToReceiveCredits || [];
                this.personnelWithExistingCredits = result.personnelWithExistingCredits || [];
                this.showBulkInitializeModal = true;
                // Add modal-open class to body to darken sidebar
                document.body.classList.add('modal-open');
            },
            error: (error) => {
                this.isBulkInitializing = false;
                this.error = error.message || 'An error occurred while loading personnel data';
                console.error('Error loading personnel data:', error);
                alert('Error: ' + this.error);
            }
        });
    }
    /**
     * Close bulk initialize modal
     */
    closeBulkInitializeModal() {
        this.showBulkInitializeModal = false;
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Confirm bulk initialize leave credits
     */
    confirmBulkInitialize() {
        this.isBulkInitializing = true;
        this.error = '';
        this.leaveBalanceService.bulkInitializeLeaveBalances(this.selectedYear)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (result) => {
                this.isBulkInitializing = false;
                this.refreshData();
                this.closeBulkInitializeModal();
                this.showBulkInitializeSuccessModal = true;
                this.bulkInitializeResult = result; // Store result for display
                this.personnelToReceiveCredits = result.personnel_to_receive_credits || [];
                this.personnelWithExistingCredits = result.personnel_with_existing_credits || [];
                // Add modal-open class to body to darken sidebar
                document.body.classList.add('modal-open');
            },
            error: (error) => {
                this.isBulkInitializing = false;
                this.error = error.message || 'An error occurred while bulk initializing leave credits';
                console.error('Error bulk initializing leave credits:', error);
                alert('Error: ' + this.error);
            }
        });
    }
    /**
     * Close bulk initialize success modal
     */
    closeBulkInitializeSuccessModal() {
        this.showBulkInitializeSuccessModal = false;
        this.bulkInitializeResult = null;
        this.personnelToReceiveCredits = [];
        this.personnelWithExistingCredits = [];
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    /**
     * Get leave balance by type name
     */
    getLeaveBalanceByType(employee, leaveTypeName) {
        const balance = employee.leave_balances.find(balance => balance.leave_type.leave_type_name === leaveTypeName);
        return balance ? (balance.total_credits - balance.used_credits) : 0;
    }
    /**
     * Get total accrued credits for display
     */
    getTotalAccrued(employee) {
        return employee.total_accrued;
    }
    /**
     * Get total used credits for display
     */
    getTotalUsed(employee) {
        return employee.total_used;
    }
    /**
     * Get total remaining credits for display
     */
    getTotalRemaining(employee) {
        return employee.total_remaining;
    }
    /**
     * Get progress percentage for remaining credits
     */
    getProgressPercentage(employee) {
        if (employee.total_accrued === 0)
            return 0;
        return Math.round((employee.total_remaining / employee.total_accrued) * 100);
    }
    /**
     * Get progress bar color based on remaining percentage
     */
    getProgressColor(percentage) {
        if (percentage <= 25)
            return 'danger';
        if (percentage <= 50)
            return 'warning';
        return 'success';
    }
    /**
     * Get year options for filter
     */
    getYearOptions() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 2; i <= currentYear + 1; i++) {
            years.push(i);
        }
        return years;
    }
    /**
     * Submit leave credit adjustment
     */
    submitAdjustment() {
        if (this.adjustmentForm.invalid) {
            this.adjustmentError = 'Please fill in all required fields correctly.';
            // Mark all fields as touched to show validation errors
            Object.keys(this.adjustmentForm.controls).forEach(key => {
                this.adjustmentForm.get(key)?.markAsTouched();
            });
            return;
        }
        // Additional validation for adjustment amount vs current balance
        if (this.adjustmentForm.get('adjustment_type')?.value === 'decrease') {
            const currentBalance = this.getCurrentBalance();
            const adjustmentAmount = this.adjustmentForm.get('adjustment_amount')?.value;
            if (adjustmentAmount > currentBalance) {
                this.adjustmentError = `Adjustment amount (${adjustmentAmount}) cannot exceed current balance (${currentBalance})`;
                return;
            }
        }
        this.isSubmittingAdjustment = true;
        this.adjustmentError = '';
        const adjustmentRequest = this.adjustmentForm.value;
        this.leaveBalanceService.createLeaveAdjustment(adjustmentRequest)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (adjustment) => {
                this.isSubmittingAdjustment = false;
                this.closeEmployeeAdjustModal();
                this.refreshData();
                alert('Leave credit adjustment created successfully!');
            },
            error: (error) => {
                this.isSubmittingAdjustment = false;
                this.adjustmentError = error.message || 'An error occurred while creating the adjustment';
                console.error('Error creating adjustment:', error);
            }
        });
    }
    /**
     * Load adjustment history for employee
     */
    loadAdjustmentHistory(employee) {
        this.isLoadingHistory = true;
        this.selectedEmployeeForAdjust = employee;
        this.leaveBalanceService.getPersonnelAdjustments(employee.id, this.selectedYear)
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe({
            next: (result) => {
                this.adjustmentHistory = result.adjustments;
                this.isLoadingHistory = false;
                this.showAdjustmentHistory = true;
            },
            error: (error) => {
                this.isLoadingHistory = false;
                console.error('Error loading adjustment history:', error);
                alert('Error loading adjustment history');
            }
        });
    }
    /**
     * Close adjustment history modal
     */
    closeAdjustmentHistory() {
        this.showAdjustmentHistory = false;
        this.adjustmentHistory = [];
        this.selectedEmployeeForAdjust = null;
    }
    /**
     * Get available leave types for selected employee
     */
    getAvailableLeaveTypes() {
        return this.leaveTypes;
    }
    /**
     * Get current balance for selected leave type
     */
    getCurrentBalance() {
        const personnelId = this.adjustmentForm.get('personnel_id')?.value;
        const leaveTypeId = this.adjustmentForm.get('leave_type_id')?.value;
        if (!personnelId || !leaveTypeId)
            return 0;
        const employee = this.employees.find(emp => emp.id === personnelId);
        if (!employee) {
            // If employee not found in leave balance data, return 0 (no balance yet)
            return 0;
        }
        const balance = employee.leave_balances.find(bal => bal.leave_type.id === leaveTypeId);
        return balance ? balance.total_credits : 0;
    }
    /**
     * Format adjustment type for display
     */
    formatAdjustmentType(type) {
        return type === 'increase' ? 'Credit' : 'Debit';
    }
    /**
     * Get adjustment type class for styling
     */
    getAdjustmentTypeClass(type) {
        return type === 'increase' ? 'text-green-600' : 'text-red-600';
    }
    /**
     * Handle employee selection change
     */
    onEmployeeSelectionChange() {
        // Reset leave type when employee changes
        this.adjustmentForm.patchValue({
            leave_type_id: ''
        });
    }
};
exports.LeaveBalanceComponent = LeaveBalanceComponent;
exports.LeaveBalanceComponent = LeaveBalanceComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-leave-balance',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        templateUrl: './leave-balance.component.html',
        styleUrls: ['./leave-balance.component.scss']
    }),
    __metadata("design:paramtypes", [leave_balance_service_1.LeaveBalanceService,
        personnel_service_1.PersonnelService,
        forms_1.FormBuilder])
], LeaveBalanceComponent);
//# sourceMappingURL=leave-balance.component.js.map