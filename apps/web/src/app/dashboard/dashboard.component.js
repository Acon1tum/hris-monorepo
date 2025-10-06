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
exports.DashboardComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let DashboardComponent = class DashboardComponent {
    isSidebarCollapsed = false;
    isSidebarOpen = false;
    title = 'HRIS Dashboard';
    dashboardStats = [
        { label: 'Total Employees', value: '1,247', icon: '👥', change: '+12', trend: 'up' },
        { label: 'Active Projects', value: '23', icon: '📋', change: '+3', trend: 'up' },
        { label: 'Leave Requests', value: '8', icon: '📅', change: '-2', trend: 'down' },
        { label: 'Payroll Due', value: '$45,230', icon: '💰', change: '+$2,450', trend: 'up' }
    ];
    recentActivities = [
        { action: 'New employee onboarded', user: 'John Smith', time: '2 hours ago', type: 'success' },
        { action: 'Leave request approved', user: 'Sarah Johnson', time: '4 hours ago', type: 'info' },
        { action: 'Payroll processed', user: 'System', time: '6 hours ago', type: 'success' },
        { action: 'Performance review due', user: 'Mike Wilson', time: '1 day ago', type: 'warning' }
    ];
    quickActions = [
        { name: 'Add Employee', icon: '👤', route: '/personnel-information-management' },
        { name: 'Process Payroll', icon: '💰', route: '/payroll-management' },
        { name: 'Generate Report', icon: '📊', route: '/report-generation' },
        { name: 'View Attendance', icon: '⏰', route: '/timekeeping-attendance' }
    ];
    ngOnInit() {
        console.log('Dashboard Component loaded!');
    }
    onSidebarStateChange(state) {
        this.isSidebarCollapsed = state.isCollapsed;
        this.isSidebarOpen = state.isOpen;
    }
};
exports.DashboardComponent = DashboardComponent;
__decorate([
    (0, core_1.HostBinding)('class.sidebar-collapsed'),
    __metadata("design:type", Object)
], DashboardComponent.prototype, "isSidebarCollapsed", void 0);
__decorate([
    (0, core_1.HostBinding)('class.sidebar-open'),
    __metadata("design:type", Object)
], DashboardComponent.prototype, "isSidebarOpen", void 0);
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