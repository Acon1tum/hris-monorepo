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
exports.AdminDashboardComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const admin_dashboard_service_1 = require("../../../services/admin-dashboard.service");
let AdminDashboardComponent = class AdminDashboardComponent {
    adminDashboardService;
    router;
    dashboardStats = null;
    loading = true;
    error = false;
    subscription = new rxjs_1.Subscription();
    constructor(adminDashboardService, router) {
        this.adminDashboardService = adminDashboardService;
        this.router = router;
    }
    ngOnInit() {
        console.log('Admin Dashboard Component loaded!');
        this.loadDashboardData();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    loadDashboardData() {
        this.loading = true;
        this.error = false;
        this.subscription.add(this.adminDashboardService.getDashboardStats().subscribe({
            next: (stats) => {
                this.dashboardStats = stats;
                this.loading = false;
                console.log('Dashboard stats loaded:', stats);
            },
            error: (error) => {
                console.error('Error loading dashboard data:', error);
                this.error = true;
                this.loading = false;
            }
        }));
    }
    refreshData() {
        this.loadDashboardData();
    }
    navigateToSection(section) {
        switch (section) {
            case 'personnel':
                this.router.navigate(['/personnel-information-management']);
                break;
            case 'leave':
                this.router.navigate(['/leave-management']);
                break;
            case 'payroll':
                this.router.navigate(['/payroll-management']);
                break;
            case 'attendance':
                this.router.navigate(['/timekeeping-attendance']);
                break;
            case 'reports':
                this.router.navigate(['/report-generation']);
                break;
            case 'system':
                this.router.navigate(['/system-administration']);
                break;
            default:
                break;
        }
    }
    getAttendancePercentage() {
        if (!this.dashboardStats?.attendanceOverview)
            return 0;
        const { present, total } = this.dashboardStats.attendanceOverview;
        return total > 0 ? Math.round((present / total) * 100) : 0;
    }
    getLeavePercentage() {
        if (!this.dashboardStats)
            return 0;
        const { pendingLeaveRequests, totalEmployees } = this.dashboardStats;
        return totalEmployees > 0 ? Math.round((pendingLeaveRequests / totalEmployees) * 100) : 0;
    }
    getDepartmentPercentage(count) {
        if (!this.dashboardStats?.activeEmployees)
            return 0;
        return Math.round((count / this.dashboardStats.activeEmployees) * 100);
    }
    getEmploymentTypePercentage(count) {
        if (!this.dashboardStats?.activeEmployees)
            return 0;
        return Math.round((count / this.dashboardStats.activeEmployees) * 100);
    }
    formatEmploymentType(type) {
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
};
exports.AdminDashboardComponent = AdminDashboardComponent;
exports.AdminDashboardComponent = AdminDashboardComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-admin-dashboard',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './admin-dashboard.component.html',
        styleUrls: ['./admin-dashboard.component.scss']
    }),
    __metadata("design:paramtypes", [admin_dashboard_service_1.AdminDashboardService,
        router_1.Router])
], AdminDashboardComponent);
//# sourceMappingURL=admin-dashboard.component.js.map