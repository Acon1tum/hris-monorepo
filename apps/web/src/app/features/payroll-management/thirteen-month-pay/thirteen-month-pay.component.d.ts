import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
interface Employee {
    id: string;
    employeeId: string;
    name: string;
    department: string;
    position: string;
    basicSalary: number;
    hireDate: Date;
    employmentStatus: 'active' | 'terminated' | 'resigned';
    terminationDate?: Date;
}
interface ThirteenMonthPay {
    id: string;
    employeeId: string;
    employeeName: string;
    department: string;
    year: number;
    basicSalary: number;
    monthsWorked: number;
    totalEarnings: number;
    thirteenthMonthPay: number;
    status: 'pending' | 'computed' | 'approved' | 'released' | 'cancelled';
    computedAt?: Date;
    approvedAt?: Date;
    releasedAt?: Date;
    approvedBy?: string;
    releasedBy?: string;
    remarks?: string;
}
interface ComputationSettings {
    year: number;
    computationDate: Date;
    includeOvertime: boolean;
    includeAllowances: boolean;
    includeBonuses: boolean;
    proRataBasis: boolean;
    minimumMonthsWorked: number;
    taxExemptionLimit: number;
}
export declare class ThirteenMonthPayComponent implements OnInit {
    private fb;
    private router;
    activeTab: 'compute' | 'history' | 'settings';
    selectedEmployees: string[];
    selectedThirteenMonthPays: string[];
    computationInProgress: boolean;
    releaseInProgress: boolean;
    showComputationModal: boolean;
    showReleaseModal: boolean;
    showSettingsModal: boolean;
    computeForm: FormGroup;
    settingsForm: FormGroup;
    releaseForm: FormGroup;
    employees: Employee[];
    thirteenMonthPays: ThirteenMonthPay[];
    computationSettings: ComputationSettings;
    constructor(fb: FormBuilder, router: Router);
    ngOnInit(): void;
    loadEmployees(): void;
    loadThirteenMonthPays(): void;
    loadComputationSettings(): void;
    selectAllEmployees(): void;
    deselectAllEmployees(): void;
    toggleEmployeeSelection(employeeId: string): void;
    isEmployeeSelected(employeeId: string): boolean;
    selectAllThirteenMonthPays(): void;
    deselectAllThirteenMonthPays(): void;
    toggleThirteenMonthPaySelection(payId: string): void;
    isThirteenMonthPaySelected(payId: string): boolean;
    computeThirteenMonthPay(): void;
    calculateThirteenMonthPay(employee: Employee, year: number, settings: any): any;
    approveThirteenMonthPay(payId: string): void;
    releaseThirteenMonthPay(): void;
    getThirteenMonthPaysByStatus(status: string): ThirteenMonthPay[];
    getThirteenMonthPayCountByStatus(status: string): number;
    formatCurrency(amount: number): string;
    formatDate(date: Date): string;
    formatDateTime(date: Date): string;
    getStatusColor(status: string): string;
    getStatusIcon(status: string): string;
    openComputationModal(): void;
    closeComputationModal(): void;
    openReleaseModal(): void;
    closeReleaseModal(): void;
    openSettingsModal(): void;
    closeSettingsModal(): void;
    saveSettings(): void;
}
export {};
//# sourceMappingURL=thirteen-month-pay.component.d.ts.map