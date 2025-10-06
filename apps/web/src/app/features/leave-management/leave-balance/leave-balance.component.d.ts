import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveBalanceService, EmployeeLeaveBalance, Department, LeaveAdjustment, LeaveType } from './leave-balance.service';
import { PersonnelService, Employee } from '../../personnel-information-management/personnel.service';
export declare class LeaveBalanceComponent implements OnInit, OnDestroy {
    private leaveBalanceService;
    private personnelService;
    private formBuilder;
    private destroy$;
    title: string;
    subtitle: string;
    employees: EmployeeLeaveBalance[];
    filteredEmployees: EmployeeLeaveBalance[];
    departments: Department[];
    allPersonnel: Employee[];
    leaveTypes: LeaveType[];
    isLoading: boolean;
    isExporting: boolean;
    isBulkInitializing: boolean;
    error: string;
    searchTerm: string;
    selectedDepartment: string;
    selectedYear: string;
    currentPage: number;
    itemsPerPage: number;
    totalResults: number;
    totalPages: number;
    showEmployeeModal: boolean;
    showEmployeeAdjustModal: boolean;
    showBulkInitializeModal: boolean;
    showBulkInitializeSuccessModal: boolean;
    selectedEmployee: EmployeeLeaveBalance | null;
    selectedEmployeeForAdjust: EmployeeLeaveBalance | null;
    adjustmentForm: FormGroup;
    isSubmittingAdjustment: boolean;
    adjustmentError: string;
    adjustmentHistory: LeaveAdjustment[];
    showAdjustmentHistory: boolean;
    isLoadingHistory: boolean;
    bulkInitializeResult: any;
    personnelToReceiveCredits: any[];
    personnelWithExistingCredits: any[];
    constructor(leaveBalanceService: LeaveBalanceService, personnelService: PersonnelService, formBuilder: FormBuilder);
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
     * Load leave balances from backend
     */
    loadLeaveBalances(): Promise<void>;
    /**
     * Load all personnel for employee dropdown
     */
    private loadAllPersonnel;
    /**
     * Load leave types for the adjustment modal
     */
    private loadLeaveTypes;
    /**
     * Apply search and pagination filters
     */
    applyFilters(): void;
    /**
     * Handle search input changes
     */
    onSearchChange(): void;
    /**
     * Handle department filter changes
     */
    onDepartmentChange(): void;
    /**
     * Handle year filter changes
     */
    onYearChange(): void;
    /**
     * Handle pagination changes
     */
    onPageChange(page: number): void;
    /**
     * Get pagination pages array
     */
    getPaginationPages(): number[];
    /**
     * Refresh data
     */
    refreshData(): void;
    /**
     * View employee details
     */
    viewDetails(employee: EmployeeLeaveBalance): void;
    /**
     * Close employee details modal
     */
    closeEmployeeModal(): void;
    /**
     * Open adjust credits modal
     */
    adjustCredits(employee?: EmployeeLeaveBalance): void;
    /**
     * Close adjust credits modal
     */
    closeEmployeeAdjustModal(): void;
    /**
     * Export to CSV
     */
    exportToCSV(): void;
    /**
     * Export to PDF
     */
    exportToPDF(): void;
    /**
     * Initialize leave balance for specific employee
     */
    initializeBalance(employee: EmployeeLeaveBalance): void;
    /**
     * Bulk initialize leave credits for all personnel without credits
     */
    bulkInitializeCredits(): void;
    /**
     * Close bulk initialize modal
     */
    closeBulkInitializeModal(): void;
    /**
     * Confirm bulk initialize leave credits
     */
    confirmBulkInitialize(): void;
    /**
     * Close bulk initialize success modal
     */
    closeBulkInitializeSuccessModal(): void;
    /**
     * Get leave balance by type name
     */
    getLeaveBalanceByType(employee: EmployeeLeaveBalance, leaveTypeName: string): number;
    /**
     * Get total accrued credits for display
     */
    getTotalAccrued(employee: EmployeeLeaveBalance): number;
    /**
     * Get total used credits for display
     */
    getTotalUsed(employee: EmployeeLeaveBalance): number;
    /**
     * Get total remaining credits for display
     */
    getTotalRemaining(employee: EmployeeLeaveBalance): number;
    /**
     * Get progress percentage for remaining credits
     */
    getProgressPercentage(employee: EmployeeLeaveBalance): number;
    /**
     * Get progress bar color based on remaining percentage
     */
    getProgressColor(percentage: number): string;
    /**
     * Get year options for filter
     */
    getYearOptions(): number[];
    /**
     * Submit leave credit adjustment
     */
    submitAdjustment(): void;
    /**
     * Load adjustment history for employee
     */
    loadAdjustmentHistory(employee: EmployeeLeaveBalance): void;
    /**
     * Close adjustment history modal
     */
    closeAdjustmentHistory(): void;
    /**
     * Get available leave types for selected employee
     */
    getAvailableLeaveTypes(): LeaveType[];
    /**
     * Get current balance for selected leave type
     */
    getCurrentBalance(): number;
    /**
     * Format adjustment type for display
     */
    formatAdjustmentType(type: string): string;
    /**
     * Get adjustment type class for styling
     */
    getAdjustmentTypeClass(type: string): string;
    /**
     * Handle employee selection change
     */
    onEmployeeSelectionChange(): void;
}
//# sourceMappingURL=leave-balance.component.d.ts.map