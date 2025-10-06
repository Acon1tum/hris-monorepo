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
exports.ThirteenMonthPayComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
let ThirteenMonthPayComponent = class ThirteenMonthPayComponent {
    fb;
    router;
    activeTab = 'compute';
    selectedEmployees = [];
    selectedThirteenMonthPays = [];
    computationInProgress = false;
    releaseInProgress = false;
    showComputationModal = false;
    showReleaseModal = false;
    showSettingsModal = false;
    computeForm;
    settingsForm;
    releaseForm;
    employees = [];
    thirteenMonthPays = [];
    computationSettings = {
        year: new Date().getFullYear(),
        computationDate: new Date(),
        includeOvertime: true,
        includeAllowances: true,
        includeBonuses: false,
        proRataBasis: true,
        minimumMonthsWorked: 1,
        taxExemptionLimit: 90000
    };
    constructor(fb, router) {
        this.fb = fb;
        this.router = router;
        this.computeForm = this.fb.group({
            year: [new Date().getFullYear(), [forms_1.Validators.required, forms_1.Validators.min(2020)]],
            includeOvertime: [true],
            includeAllowances: [true],
            includeBonuses: [false],
            proRataBasis: [true],
            selectedEmployees: [[]]
        });
        this.settingsForm = this.fb.group({
            year: [new Date().getFullYear(), [forms_1.Validators.required, forms_1.Validators.min(2020)]],
            includeOvertime: [true],
            includeAllowances: [true],
            includeBonuses: [false],
            proRataBasis: [true],
            minimumMonthsWorked: [1, [forms_1.Validators.required, forms_1.Validators.min(1), forms_1.Validators.max(12)]],
            taxExemptionLimit: [90000, [forms_1.Validators.required, forms_1.Validators.min(0)]]
        });
        this.releaseForm = this.fb.group({
            releaseDate: [new Date(), [forms_1.Validators.required]],
            paymentMethod: ['bank_transfer', [forms_1.Validators.required]],
            remarks: ['']
        });
    }
    ngOnInit() {
        this.loadEmployees();
        this.loadThirteenMonthPays();
        this.loadComputationSettings();
    }
    loadEmployees() {
        // Simulated employee data
        this.employees = [
            {
                id: '1',
                employeeId: 'EMP001',
                name: 'Juan Dela Cruz',
                department: 'Engineering',
                position: 'Software Engineer',
                basicSalary: 45000,
                hireDate: new Date('2022-03-15'),
                employmentStatus: 'active'
            },
            {
                id: '2',
                employeeId: 'EMP002',
                name: 'Maria Santos',
                department: 'Human Resources',
                position: 'HR Specialist',
                basicSalary: 38000,
                hireDate: new Date('2021-08-20'),
                employmentStatus: 'active'
            },
            {
                id: '3',
                employeeId: 'EMP003',
                name: 'Pedro Reyes',
                department: 'Finance',
                position: 'Accountant',
                basicSalary: 42000,
                hireDate: new Date('2023-01-10'),
                employmentStatus: 'active'
            },
            {
                id: '4',
                employeeId: 'EMP004',
                name: 'Ana Garcia',
                department: 'Marketing',
                position: 'Marketing Manager',
                basicSalary: 55000,
                hireDate: new Date('2020-11-05'),
                employmentStatus: 'active'
            },
            {
                id: '5',
                employeeId: 'EMP005',
                name: 'Luis Martinez',
                department: 'Sales',
                position: 'Sales Representative',
                basicSalary: 35000,
                hireDate: new Date('2022-06-12'),
                employmentStatus: 'terminated',
                terminationDate: new Date('2024-09-30')
            }
        ];
    }
    loadThirteenMonthPays() {
        // Simulated 13th month pay data
        this.thirteenMonthPays = [
            {
                id: '1',
                employeeId: 'EMP001',
                employeeName: 'Juan Dela Cruz',
                department: 'Engineering',
                year: 2024,
                basicSalary: 45000,
                monthsWorked: 12,
                totalEarnings: 540000,
                thirteenthMonthPay: 45000,
                status: 'computed',
                computedAt: new Date('2024-12-01'),
                remarks: 'Full year computation'
            },
            {
                id: '2',
                employeeId: 'EMP002',
                employeeName: 'Maria Santos',
                department: 'Human Resources',
                year: 2024,
                basicSalary: 38000,
                monthsWorked: 12,
                totalEarnings: 456000,
                thirteenthMonthPay: 38000,
                status: 'approved',
                computedAt: new Date('2024-12-01'),
                approvedAt: new Date('2024-12-02'),
                approvedBy: 'HR Manager',
                remarks: 'Approved for release'
            },
            {
                id: '3',
                employeeId: 'EMP003',
                employeeName: 'Pedro Reyes',
                department: 'Finance',
                year: 2024,
                basicSalary: 42000,
                monthsWorked: 12,
                totalEarnings: 504000,
                thirteenthMonthPay: 42000,
                status: 'released',
                computedAt: new Date('2024-12-01'),
                approvedAt: new Date('2024-12-02'),
                releasedAt: new Date('2024-12-05'),
                approvedBy: 'HR Manager',
                releasedBy: 'Finance Manager',
                remarks: 'Released via bank transfer'
            },
            {
                id: '4',
                employeeId: 'EMP004',
                employeeName: 'Ana Garcia',
                department: 'Marketing',
                year: 2024,
                basicSalary: 55000,
                monthsWorked: 12,
                totalEarnings: 660000,
                thirteenthMonthPay: 55000,
                status: 'pending',
                remarks: 'Pending computation'
            },
            {
                id: '5',
                employeeId: 'EMP005',
                employeeName: 'Luis Martinez',
                department: 'Sales',
                year: 2024,
                basicSalary: 35000,
                monthsWorked: 9,
                totalEarnings: 315000,
                thirteenthMonthPay: 26250,
                status: 'computed',
                computedAt: new Date('2024-12-01'),
                remarks: 'Pro-rated computation (9 months)'
            }
        ];
    }
    loadComputationSettings() {
        this.settingsForm.patchValue(this.computationSettings);
    }
    // Employee selection methods
    selectAllEmployees() {
        this.selectedEmployees = this.employees
            .filter(emp => emp.employmentStatus === 'active')
            .map(emp => emp.id);
    }
    deselectAllEmployees() {
        this.selectedEmployees = [];
    }
    toggleEmployeeSelection(employeeId) {
        const index = this.selectedEmployees.indexOf(employeeId);
        if (index > -1) {
            this.selectedEmployees.splice(index, 1);
        }
        else {
            this.selectedEmployees.push(employeeId);
        }
    }
    isEmployeeSelected(employeeId) {
        return this.selectedEmployees.includes(employeeId);
    }
    // 13th Month Pay selection methods
    selectAllThirteenMonthPays() {
        this.selectedThirteenMonthPays = this.thirteenMonthPays
            .filter(pay => pay.status === 'approved')
            .map(pay => pay.id);
    }
    deselectAllThirteenMonthPays() {
        this.selectedThirteenMonthPays = [];
    }
    toggleThirteenMonthPaySelection(payId) {
        const index = this.selectedThirteenMonthPays.indexOf(payId);
        if (index > -1) {
            this.selectedThirteenMonthPays.splice(index, 1);
        }
        else {
            this.selectedThirteenMonthPays.push(payId);
        }
    }
    isThirteenMonthPaySelected(payId) {
        return this.selectedThirteenMonthPays.includes(payId);
    }
    // Computation methods
    computeThirteenMonthPay() {
        if (this.computeForm.valid && this.selectedEmployees.length > 0) {
            this.computationInProgress = true;
            // Simulate computation process
            setTimeout(() => {
                const year = this.computeForm.get('year')?.value;
                const settings = this.computeForm.value;
                this.selectedEmployees.forEach(employeeId => {
                    const employee = this.employees.find(emp => emp.id === employeeId);
                    if (employee) {
                        const thirteenthMonthPay = this.calculateThirteenMonthPay(employee, year, settings);
                        // Check if already exists
                        const existingIndex = this.thirteenMonthPays.findIndex(pay => pay.employeeId === employee.employeeId && pay.year === year);
                        if (existingIndex > -1) {
                            // Update existing
                            this.thirteenMonthPays[existingIndex] = {
                                ...this.thirteenMonthPays[existingIndex],
                                ...thirteenthMonthPay,
                                status: 'computed',
                                computedAt: new Date()
                            };
                        }
                        else {
                            // Add new
                            this.thirteenMonthPays.push({
                                id: Date.now().toString(),
                                employeeId: employee.employeeId,
                                employeeName: employee.name,
                                department: employee.department,
                                year: year,
                                basicSalary: employee.basicSalary,
                                monthsWorked: thirteenthMonthPay.monthsWorked,
                                totalEarnings: thirteenthMonthPay.totalEarnings,
                                thirteenthMonthPay: thirteenthMonthPay.thirteenthMonthPay,
                                status: 'computed',
                                computedAt: new Date(),
                                remarks: thirteenthMonthPay.remarks
                            });
                        }
                    }
                });
                this.computationInProgress = false;
                this.showComputationModal = false;
                this.selectedEmployees = [];
            }, 2000);
        }
    }
    calculateThirteenMonthPay(employee, year, settings) {
        const startDate = new Date(year, 0, 1); // January 1st of the year
        const endDate = new Date(year, 11, 31); // December 31st of the year
        let monthsWorked = 12;
        let remarks = 'Full year computation';
        // Check if employee was hired during the year
        if (employee.hireDate.getFullYear() === year) {
            const hireMonth = employee.hireDate.getMonth();
            monthsWorked = 12 - hireMonth;
            remarks = `Pro-rated computation (${monthsWorked} months)`;
        }
        // Check if employee was terminated during the year
        if (employee.employmentStatus === 'terminated' && employee.terminationDate) {
            if (employee.terminationDate.getFullYear() === year) {
                const terminationMonth = employee.terminationDate.getMonth();
                monthsWorked = terminationMonth + 1;
                remarks = `Pro-rated computation (${monthsWorked} months) - Terminated`;
            }
        }
        // Calculate total earnings
        let totalEarnings = employee.basicSalary * monthsWorked;
        // Apply settings
        if (settings.includeOvertime) {
            totalEarnings += (employee.basicSalary * 0.1 * monthsWorked); // 10% overtime allowance
        }
        if (settings.includeAllowances) {
            totalEarnings += (employee.basicSalary * 0.05 * monthsWorked); // 5% allowance
        }
        if (settings.includeBonuses) {
            totalEarnings += (employee.basicSalary * 0.5); // 50% bonus
        }
        // Calculate 13th month pay
        let thirteenthMonthPay = totalEarnings / 12;
        // Apply pro-rata if needed
        if (settings.proRataBasis && monthsWorked < 12) {
            thirteenthMonthPay = (thirteenthMonthPay * monthsWorked) / 12;
        }
        return {
            monthsWorked,
            totalEarnings,
            thirteenthMonthPay: Math.round(thirteenthMonthPay),
            remarks
        };
    }
    // Approval and release methods
    approveThirteenMonthPay(payId) {
        const pay = this.thirteenMonthPays.find(p => p.id === payId);
        if (pay && pay.status === 'computed') {
            pay.status = 'approved';
            pay.approvedAt = new Date();
            pay.approvedBy = 'HR Manager';
        }
    }
    releaseThirteenMonthPay() {
        if (this.releaseForm.valid && this.selectedThirteenMonthPays.length > 0) {
            this.releaseInProgress = true;
            setTimeout(() => {
                const releaseDate = this.releaseForm.get('releaseDate')?.value;
                const paymentMethod = this.releaseForm.get('paymentMethod')?.value;
                const remarks = this.releaseForm.get('remarks')?.value;
                this.selectedThirteenMonthPays.forEach(payId => {
                    const pay = this.thirteenMonthPays.find(p => p.id === payId);
                    if (pay && pay.status === 'approved') {
                        pay.status = 'released';
                        pay.releasedAt = releaseDate;
                        pay.releasedBy = 'Finance Manager';
                        pay.remarks = remarks || `Released via ${paymentMethod}`;
                    }
                });
                this.releaseInProgress = false;
                this.showReleaseModal = false;
                this.selectedThirteenMonthPays = [];
            }, 1500);
        }
    }
    // Filter methods
    getThirteenMonthPaysByStatus(status) {
        return this.thirteenMonthPays.filter(pay => pay.status === status);
    }
    getThirteenMonthPayCountByStatus(status) {
        return this.thirteenMonthPays.filter(pay => pay.status === status).length;
    }
    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    }
    formatDate(date) {
        return new Intl.DateTimeFormat('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
    formatDateTime(date) {
        return new Intl.DateTimeFormat('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
    getStatusColor(status) {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'computed': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'released': return 'bg-purple-100 text-purple-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    getStatusIcon(status) {
        switch (status) {
            case 'pending': return 'schedule';
            case 'computed': return 'calculate';
            case 'approved': return 'check_circle';
            case 'released': return 'payment';
            case 'cancelled': return 'cancel';
            default: return 'help';
        }
    }
    // Modal methods
    openComputationModal() {
        this.showComputationModal = true;
    }
    closeComputationModal() {
        this.showComputationModal = false;
    }
    openReleaseModal() {
        this.showReleaseModal = true;
    }
    closeReleaseModal() {
        this.showReleaseModal = false;
    }
    openSettingsModal() {
        this.showSettingsModal = true;
    }
    closeSettingsModal() {
        this.showSettingsModal = false;
    }
    saveSettings() {
        if (this.settingsForm.valid) {
            this.computationSettings = { ...this.settingsForm.value };
            this.closeSettingsModal();
        }
    }
};
exports.ThirteenMonthPayComponent = ThirteenMonthPayComponent;
exports.ThirteenMonthPayComponent = ThirteenMonthPayComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-thirteen-month-pay',
        standalone: true,
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
        ],
        templateUrl: './thirteen-month-pay.component.html',
        styleUrls: ['./thirteen-month-pay.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router])
], ThirteenMonthPayComponent);
//# sourceMappingURL=thirteen-month-pay.component.js.map