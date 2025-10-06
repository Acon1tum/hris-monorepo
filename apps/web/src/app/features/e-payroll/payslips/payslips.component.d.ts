interface PayslipHistory {
    month: string;
    year: number;
    netPay: number;
    grossPay: number;
    deductions: number;
    status: 'paid' | 'pending' | 'processing';
    payDate: string;
}
interface PayslipDetails {
    month: string;
    year: number;
    grossPay: number;
    netPay: number;
    deductions: {
        tax: number;
        insurance: number;
        retirement: number;
        other: number;
    };
    earnings: {
        basicSalary: number;
        overtime: number;
        bonus: number;
        allowance: number;
    };
}
interface FilterOptions {
    year: number | null;
    month: string | null;
    status: string | null;
    minAmount: number | null;
    maxAmount: number | null;
    dateRange: {
        start: string | null;
        end: string | null;
    };
}
export declare class PayslipsComponent {
    userName: string;
    currentYearSalary: number;
    previousYearSalary: number;
    salaryGrowth: number;
    grossPay: number;
    deductions: number;
    netPay: number;
    selectedChartType: string;
    selectedTimeRange: string;
    activeTab: string;
    showDetailsModal: boolean;
    selectedPayslip: PayslipDetails | null;
    showFilters: boolean;
    filterOptions: FilterOptions;
    availableYears: number[];
    availableMonths: string[];
    availableStatuses: string[];
    payslipHistory: PayslipHistory[];
    get filteredPayslips(): PayslipHistory[];
    get displayedPayslips(): PayslipHistory[];
    get previousPayslips(): PayslipHistory[];
    get hasActiveFilters(): boolean;
    onTabChange(tabName: string): void;
    onChartTypeChange(chartType: string): void;
    onTimeRangeChange(timeRange: string): void;
    toggleFilters(): void;
    applyFilters(): void;
    clearFilters(): void;
    getStatusColor(status: string): string;
    getStatusIcon(status: string): string;
    viewPayslip(payslip: PayslipHistory): void;
    closeDetailsModal(): void;
    downloadPayslip(): void;
    downloadHistoricalPayslip(payslip: PayslipHistory): void;
    downloadAsPDF(payslip: PayslipHistory | null): void;
    viewInBrowser(payslip: PayslipHistory | null): void;
    printPayslip(payslip: PayslipHistory | null): void;
    getSelectedPayslipHistory(): PayslipHistory | null;
    private getMonthNumber;
}
export {};
//# sourceMappingURL=payslips.component.d.ts.map