import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
interface Payslip {
    id: number;
    employeeId: string;
    employeeName: string;
    department: string;
    position: string;
    payrollPeriod: {
        start: Date;
        end: Date;
    };
    basicSalary: number;
    grossPay: number;
    netPay: number;
    deductions: {
        tax: number;
        insurance: number;
        retirement: number;
        other: number;
    };
    allowances: {
        transportation: number;
        meal: number;
        housing: number;
        other: number;
    };
    overtime: {
        hours: number;
        rate: number;
        amount: number;
    };
    leaveBalance: {
        sick: number;
        vacation: number;
        personal: number;
    };
    status: 'generated' | 'sent' | 'downloaded' | 'failed';
    generatedAt: Date;
    sentAt?: Date;
    downloadedAt?: Date;
    emailSent: boolean;
    emailSentAt?: Date;
    doleCompliant: boolean;
}
export declare class PayslipCenterComponent implements OnInit, OnDestroy {
    private fb;
    private router;
    activeTab: 'view-download' | 'resend';
    payslips: Payslip[];
    filteredPayslips: Payslip[];
    selectedPayslips: number[];
    filterForm: FormGroup;
    availablePayrollPeriods: string[];
    availableDepartments: string[];
    resendForm: FormGroup;
    selectedPayslipsForResend: Payslip[];
    resendInProgress: boolean;
    showBulkActions: boolean;
    allSelected: boolean;
    constructor(fb: FormBuilder, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadPayslips(): void;
    extractFilterOptions(): void;
    setupFilterListeners(): void;
    applyFilters(): void;
    togglePayslipSelection(payslipId: number): void;
    toggleAllPayslips(): void;
    updateBulkSelection(): void;
    downloadPayslip(payslip: Payslip): void;
    downloadSelectedPayslips(): void;
    downloadAllPayslips(): void;
    resendPayslip(payslip: Payslip): void;
    resendSelectedPayslips(): void;
    sendPayslips(): void;
    viewPayslip(payslip: Payslip): void;
    getStatusColor(status: string): string;
    getStatusIcon(status: string): string;
    formatCurrency(amount: number): string;
    formatDate(date: Date): string;
    formatDateTime(date: Date): string;
    showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void;
    getTotalDeductions(payslip: Payslip): number;
    getTotalAllowances(payslip: Payslip): number;
    isDoleCompliant(payslip: Payslip): boolean;
    getCurrentDate(): Date;
}
export {};
//# sourceMappingURL=payslip-center.component.d.ts.map