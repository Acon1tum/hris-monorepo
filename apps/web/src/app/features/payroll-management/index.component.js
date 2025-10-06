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
exports.PayrollManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
let PayrollManagementComponent = class PayrollManagementComponent {
    router;
    title = 'Payroll Management';
    constructor(router) {
        this.router = router;
    }
    payrollFeatures = [
        { name: 'Salary Processing', description: 'Calculate and process employee salaries', icon: '💰', route: '/payroll-management/payroll-overview' },
        { name: 'Master Payroll', description: 'Manage employee master payroll records', icon: '👥', route: '/payroll-management/master-payroll' },
        { name: 'Deduction Formulas', description: 'Configure tax tables and deduction formulas', icon: '🧮', route: '/payroll-management/deductions' },
        { name: 'Benefits Deductions', description: 'Manage benefits and insurance deductions', icon: '🏥', route: null },
        { name: 'Payslip Generation', description: 'Generate and distribute payslips', icon: '📄', route: null },
        { name: 'Payroll Reports', description: 'Comprehensive payroll reporting and analytics', icon: '📊', route: null }
    ];
    navigateToFeature(feature) {
        if (feature.route) {
            this.router.navigate([feature.route]);
        }
        else {
            console.log(`Feature ${feature.name} not yet implemented`);
        }
    }
    navigateToMasterPayroll() {
        this.router.navigate(['/payroll-management/master-payroll']);
    }
    navigateToPayrollOverview() {
        this.router.navigate(['/payroll-management/payroll-overview']);
    }
    navigateToDeductions() {
        this.router.navigate(['/payroll-management/deductions']);
    }
};
exports.PayrollManagementComponent = PayrollManagementComponent;
exports.PayrollManagementComponent = PayrollManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-payroll-management',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], PayrollManagementComponent);
//# sourceMappingURL=index.component.js.map