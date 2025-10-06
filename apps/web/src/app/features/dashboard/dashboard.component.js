"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let DashboardComponent = class DashboardComponent {
    title = 'Dashboard';
    dashboardStats = [
        { label: 'Total Employees', value: '1,234', icon: '👥', change: '+12%', trend: 'up' },
        { label: 'Active Projects', value: '45', icon: '📊', change: '+8%', trend: 'up' },
        { label: 'Leave Requests', value: '23', icon: '📅', change: '-5%', trend: 'down' },
        { label: 'Payroll Due', value: '$125K', icon: '💰', change: '+15%', trend: 'up' }
    ];
    recentActivities = [
        { action: 'New employee registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
        { action: 'Leave request approved', user: 'Jane Smith', time: '15 minutes ago', type: 'approval' },
        { action: 'Payroll processed', user: 'System', time: '1 hour ago', type: 'system' },
        { action: 'Performance review completed', user: 'Mike Johnson', time: '2 hours ago', type: 'review' }
    ];
    quickActions = [
        { name: 'Add Employee', icon: '➕', action: 'add-employee' },
        { name: 'Process Payroll', icon: '💰', action: 'process-payroll' },
        { name: 'Generate Report', icon: '📊', action: 'generate-report' },
        { name: 'Schedule Meeting', icon: '📅', action: 'schedule-meeting' }
    ];
    onQuickAction(action) {
        console.log('Quick action:', action);
    }
};
exports.DashboardComponent = DashboardComponent;
exports.DashboardComponent = DashboardComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-dashboard',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.scss']
    })
], DashboardComponent);
//# sourceMappingURL=dashboard.component.js.map