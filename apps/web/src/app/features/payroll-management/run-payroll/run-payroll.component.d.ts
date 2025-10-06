import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
interface PayrollRun {
    id: number;
    cutoffStart: Date;
    cutoffEnd: Date;
    totalEmployees: number;
    grossPay: number;
    netPay: number;
    totalDeductions: number;
    totalOvertime: number;
    status: 'draft' | 'pending' | 'approved' | 'released' | 'cancelled';
    createdAt: Date;
    approvedBy?: string;
    approvedAt?: Date;
    releasedAt?: Date;
    notes?: string;
}
interface PayrollEmployee {
    id: number;
    employeeId: string;
    name: string;
    department: string;
    position: string;
    baseSalary: number;
    hoursWorked: number;
    overtimeHours: number;
    grossPay: number;
    deductions: {
        tax: number;
        insurance: number;
        retirement: number;
        other: number;
    };
    netPay: number;
    status: 'included' | 'excluded' | 'pending';
}
interface PayrollSummary {
    totalEmployees: number;
    totalGrossPay: number;
    totalNetPay: number;
    totalDeductions: number;
    totalOvertime: number;
    totalTax: number;
    totalInsurance: number;
    totalRetirement: number;
}
export declare class RunPayrollComponent implements OnInit, OnDestroy {
    private fb;
    private router;
    activeTab: 'new-run' | 'history' | 'preview';
    payrollForm: FormGroup;
    selectedEmployees: PayrollEmployee[];
    payrollSummary: PayrollSummary;
    payrollHistory: PayrollRun[];
    filteredHistory: PayrollRun[];
    historyFilter: string;
    currentPayrollRun?: PayrollRun;
    approvalNotes: string;
    availableEmployees: PayrollEmployee[];
    constructor(fb: FormBuilder, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initializePayrollRun(): void;
    loadPayrollHistory(): void;
    calculatePayrollSummary(): void;
    toggleEmployeeStatus(employee: PayrollEmployee): void;
    filterHistory(status: string): void;
    createNewPayrollRun(): void;
    approvePayrollRun(): void;
    releasePayrollRun(): void;
    cancelPayrollRun(): void;
    getStatusColor(status: string): string;
    formatCurrency(amount: number): string;
    formatDate(date: Date): string;
    formatDateForInput(date: Date): string;
    getEmployeeStatusColor(status: string): string;
}
export {};
//# sourceMappingURL=run-payroll.component.d.ts.map