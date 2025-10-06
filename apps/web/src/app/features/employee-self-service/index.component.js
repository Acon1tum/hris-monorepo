"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSelfServiceComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let EmployeeSelfServiceComponent = class EmployeeSelfServiceComponent {
    title = 'Employee Self-Service';
    selfServiceFeatures = [
        { name: 'Profile Management', description: 'Update personal information and preferences', icon: '👤' },
        { name: 'Leave Requests', description: 'Submit and track leave applications', icon: '📝' },
        { name: 'Payroll Information', description: 'View salary and payment details', icon: '💰' },
        { name: 'Time Records', description: 'Check attendance and time logs', icon: '⏰' },
        { name: 'Document Access', description: 'Download payslips and certificates', icon: '📄' },
        { name: 'Benefits Portal', description: 'Manage benefits and insurance', icon: '🎁' }
    ];
};
exports.EmployeeSelfServiceComponent = EmployeeSelfServiceComponent;
exports.EmployeeSelfServiceComponent = EmployeeSelfServiceComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-employee-self-service',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    })
], EmployeeSelfServiceComponent);
//# sourceMappingURL=index.component.js.map