"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let LeaveManagementComponent = class LeaveManagementComponent {
    title = 'Leave Management';
    leaveFeatures = [
        { name: 'Leave Requests', description: 'Submit and approve leave applications', icon: '📝' },
        { name: 'Leave Balance', description: 'Track available leave days and balances', icon: '📊' },
        { name: 'Leave Calendar', description: 'Visual calendar for leave planning', icon: '📅' },
        { name: 'Leave Policies', description: 'Configure leave types and policies', icon: '📋' },
        { name: 'Approval Workflow', description: 'Multi-level approval process', icon: '✅' },
        { name: 'Leave Reports', description: 'Generate leave analytics and reports', icon: '📈' }
    ];
};
exports.LeaveManagementComponent = LeaveManagementComponent;
exports.LeaveManagementComponent = LeaveManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-leave-management',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    })
], LeaveManagementComponent);
//# sourceMappingURL=index.component.js.map