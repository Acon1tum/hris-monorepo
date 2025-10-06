"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThirteenthMonthPayComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let ThirteenthMonthPayComponent = class ThirteenthMonthPayComponent {
    currentYear = new Date().getFullYear();
    selectedYear = this.currentYear;
    thirteenthMonthPayHistory = [
        {
            id: '1',
            year: 2024,
            basicSalary: 25000,
            totalEarnings: 325000,
            thirteenthMonthPay: 27083.33,
            status: 'Paid',
            releaseDate: '2024-12-15',
            paymentMethod: 'Bank Transfer',
            remarks: 'Released on schedule'
        },
        {
            id: '2',
            year: 2023,
            basicSalary: 23000,
            totalEarnings: 299000,
            thirteenthMonthPay: 24916.67,
            status: 'Paid',
            releaseDate: '2023-12-20',
            paymentMethod: 'Bank Transfer',
            remarks: 'Released on schedule'
        },
        {
            id: '3',
            year: 2022,
            basicSalary: 21000,
            totalEarnings: 273000,
            thirteenthMonthPay: 22750.00,
            status: 'Paid',
            releaseDate: '2022-12-18',
            paymentMethod: 'Bank Transfer',
            remarks: 'Released on schedule'
        }
    ];
    monthlyEarnings = [
        {
            month: 'January',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2000,
            bonuses: 0,
            deductions: 1500,
            netPay: 30500
        },
        {
            month: 'February',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 1500,
            bonuses: 0,
            deductions: 1500,
            netPay: 30000
        },
        {
            month: 'March',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 3000,
            bonuses: 5000,
            deductions: 1500,
            netPay: 36500
        },
        {
            month: 'April',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 1800,
            bonuses: 0,
            deductions: 1500,
            netPay: 30300
        },
        {
            month: 'May',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2200,
            bonuses: 0,
            deductions: 1500,
            netPay: 30700
        },
        {
            month: 'June',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2500,
            bonuses: 3000,
            deductions: 1500,
            netPay: 34000
        },
        {
            month: 'July',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 1900,
            bonuses: 0,
            deductions: 1500,
            netPay: 30400
        },
        {
            month: 'August',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2100,
            bonuses: 0,
            deductions: 1500,
            netPay: 30600
        },
        {
            month: 'September',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2800,
            bonuses: 4000,
            deductions: 1500,
            netPay: 35300
        },
        {
            month: 'October',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 1700,
            bonuses: 0,
            deductions: 1500,
            netPay: 30200
        },
        {
            month: 'November',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 2400,
            bonuses: 0,
            deductions: 1500,
            netPay: 30900
        },
        {
            month: 'December',
            basicSalary: 25000,
            allowances: 5000,
            overtime: 3000,
            bonuses: 8000,
            deductions: 1500,
            netPay: 39500
        }
    ];
    currentCalculation = {
        totalBasicSalary: 300000,
        totalAllowances: 60000,
        totalOvertime: 25600,
        totalBonuses: 17000,
        totalDeductions: 18000,
        totalEarnings: 383600,
        thirteenthMonthPay: 31966.67,
        taxWithholding: 3196.67,
        netThirteenthMonthPay: 28770.00
    };
    selectedThirteenthMonth = null;
    showDetailsModal = false;
    get currentYearData() {
        return this.thirteenthMonthPayHistory.find(item => item.year === this.selectedYear);
    }
    getStatusColor(status) {
        switch (status) {
            case 'Paid':
                return '#10b981';
            case 'Processing':
                return '#f59e0b';
            case 'Released':
                return '#3b82f6';
            case 'Pending':
                return '#6b7280';
            default:
                return '#6b7280';
        }
    }
    getStatusBgColor(status) {
        switch (status) {
            case 'Paid':
                return '#d1fae5';
            case 'Processing':
                return '#fef3c7';
            case 'Released':
                return '#dbeafe';
            case 'Pending':
                return '#f3f4f6';
            default:
                return '#f3f4f6';
        }
    }
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    }
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    viewDetails(thirteenthMonth) {
        this.selectedThirteenthMonth = thirteenthMonth;
        this.showDetailsModal = true;
    }
    closeDetails() {
        this.showDetailsModal = false;
        this.selectedThirteenthMonth = null;
    }
    downloadReport() {
        console.log('Downloading thirteenth month pay report...');
    }
    calculateThirteenthMonthPay() {
        const totalBasicSalary = this.monthlyEarnings.reduce((sum, month) => sum + month.basicSalary, 0);
        return totalBasicSalary / 12;
    }
    getTotalEarnings() {
        return this.monthlyEarnings.reduce((sum, month) => sum + month.basicSalary + month.allowances + month.overtime + month.bonuses, 0);
    }
};
exports.ThirteenthMonthPayComponent = ThirteenthMonthPayComponent;
exports.ThirteenthMonthPayComponent = ThirteenthMonthPayComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-thirteenth-month-pay',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './thirteenth-month-pay.component.html',
        styleUrls: ['./thirteenth-month-pay.component.scss']
    })
], ThirteenthMonthPayComponent);
//# sourceMappingURL=thirteenth-month-pay.component.js.map