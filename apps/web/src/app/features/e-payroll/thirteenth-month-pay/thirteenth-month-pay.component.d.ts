interface ThirteenthMonthPay {
    id: string;
    year: number;
    basicSalary: number;
    totalEarnings: number;
    thirteenthMonthPay: number;
    status: 'Pending' | 'Processing' | 'Paid' | 'Released';
    releaseDate?: string;
    paymentMethod: string;
    remarks?: string;
}
interface MonthlyEarnings {
    month: string;
    basicSalary: number;
    allowances: number;
    overtime: number;
    bonuses: number;
    deductions: number;
    netPay: number;
}
interface ThirteenthMonthCalculation {
    totalBasicSalary: number;
    totalAllowances: number;
    totalOvertime: number;
    totalBonuses: number;
    totalDeductions: number;
    totalEarnings: number;
    thirteenthMonthPay: number;
    taxWithholding: number;
    netThirteenthMonthPay: number;
}
export declare class ThirteenthMonthPayComponent {
    currentYear: number;
    selectedYear: number;
    thirteenthMonthPayHistory: ThirteenthMonthPay[];
    monthlyEarnings: MonthlyEarnings[];
    currentCalculation: ThirteenthMonthCalculation;
    selectedThirteenthMonth: ThirteenthMonthPay | null;
    showDetailsModal: boolean;
    get currentYearData(): ThirteenthMonthPay | undefined;
    getStatusColor(status: string): string;
    getStatusBgColor(status: string): string;
    formatCurrency(amount: number): string;
    formatDate(dateString: string): string;
    viewDetails(thirteenthMonth: ThirteenthMonthPay): void;
    closeDetails(): void;
    downloadReport(): void;
    calculateThirteenthMonthPay(): number;
    getTotalEarnings(): number;
}
export {};
//# sourceMappingURL=thirteenth-month-pay.component.d.ts.map