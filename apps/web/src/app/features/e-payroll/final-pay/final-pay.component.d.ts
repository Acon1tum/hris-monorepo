interface FinalPay {
    id: string;
    employeeId: string;
    employeeName: string;
    resignationDate: string;
    lastWorkingDay: string;
    clearanceDate: string;
    status: 'Pending' | 'Processing' | 'Cleared' | 'Paid';
    totalAmount: number;
    breakdown: FinalPayBreakdown;
    clearanceItems: ClearanceItem[];
    remarks?: string;
}
interface FinalPayBreakdown {
    basicSalary: number;
    proratedSalary: number;
    unusedLeaves: number;
    leaveMonetization: number;
    overtime: number;
    allowances: number;
    bonuses: number;
    deductions: number;
    taxWithholding: number;
    otherDeductions: number;
    netFinalPay: number;
}
interface ClearanceItem {
    id: string;
    department: string;
    item: string;
    status: 'Pending' | 'Cleared' | 'Not Applicable';
    clearedBy?: string;
    clearedDate?: string;
    remarks?: string;
}
interface LeaveBalance {
    leaveType: string;
    totalDays: number;
    usedDays: number;
    remainingDays: number;
    monetizationRate: number;
    monetizationAmount: number;
}
export declare class FinalPayComponent {
    currentFinalPay: FinalPay;
    leaveBalances: LeaveBalance[];
    showClearanceModal: boolean;
    selectedClearanceItem: ClearanceItem | null;
    getStatusColor(status: string): string;
    getStatusBgColor(status: string): string;
    formatCurrency(amount: number): string;
    formatDate(dateString: string): string;
    getClearanceProgress(): number;
    getTotalLeaveMonetization(): number;
    viewClearanceDetails(item: ClearanceItem): void;
    closeClearanceModal(): void;
    downloadFinalPayslip(): void;
    downloadClearanceReport(): void;
    getTotalClearanceItems(): number;
    getClearedItems(): number;
    getPendingItems(): number;
}
export {};
//# sourceMappingURL=final-pay.component.d.ts.map