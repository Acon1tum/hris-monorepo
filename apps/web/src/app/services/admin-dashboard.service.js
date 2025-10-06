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
exports.AdminDashboardService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
let AdminDashboardService = class AdminDashboardService {
    http;
    apiUrl = environment_1.environment.apiUrl;
    constructor(http) {
        this.http = http;
    }
    // Get comprehensive dashboard statistics
    getDashboardStats() {
        return this.http.get(`${this.apiUrl}/personnel/dashboard-stats`)
            .pipe((0, operators_1.map)(response => ({
            totalEmployees: response.data.total,
            activeEmployees: response.data.active,
            pendingLeaveRequests: 0, // This would come from leave service
            payrollStatus: 'Ready', // This would come from payroll service
            departmentStats: response.data.departmentStats || [],
            employmentTypeStats: response.data.employmentTypeStats || [],
            recentActivities: response.data.recentActivities || [],
            attendanceOverview: response.data.attendanceOverview || {
                present: 0,
                absent: 0,
                late: 0,
                onLeave: 0,
                total: 0
            }
        })), (0, operators_1.catchError)(error => {
            console.error('Error fetching dashboard stats:', error);
            return (0, rxjs_1.of)(this.getDefaultStats());
        }));
    }
    // Get personnel statistics
    getPersonnelStats() {
        return this.http.get(`${this.apiUrl}/personnel/stats`)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(error => {
            console.error('Error fetching personnel stats:', error);
            return (0, rxjs_1.of)({
                total: 0,
                active: 0,
                inactive: 0,
                departmentStats: [],
                employmentTypeStats: []
            });
        }));
    }
    // Get leave statistics
    getLeaveStats() {
        return this.http.get(`${this.apiUrl}/leave/applications/pending`)
            .pipe((0, operators_1.map)(response => ({
            pending: response.data?.length || 0,
            approved: 0, // Would need separate endpoint
            rejected: 0, // Would need separate endpoint
            total: 0 // Would need separate endpoint
        })), (0, operators_1.catchError)(error => {
            console.error('Error fetching leave stats:', error);
            return (0, rxjs_1.of)({
                pending: 0,
                approved: 0,
                rejected: 0,
                total: 0
            });
        }));
    }
    // Get attendance statistics
    getAttendanceStats() {
        // This would need a proper attendance endpoint
        return (0, rxjs_1.of)({
            present: 892,
            absent: 45,
            late: 23,
            onLeave: 12,
            total: 972
        });
    }
    // Get recent activities
    getRecentActivities() {
        // This would need a proper activities/audit log endpoint
        return (0, rxjs_1.of)([
            {
                action: 'New employee onboarded',
                user: 'John Smith',
                time: '2 hours ago',
                type: 'success'
            },
            {
                action: 'Leave request approved',
                user: 'Sarah Johnson',
                time: '4 hours ago',
                type: 'info'
            },
            {
                action: 'Payroll processed',
                user: 'System',
                time: '6 hours ago',
                type: 'success'
            },
            {
                action: 'Performance review due',
                user: 'Mike Wilson',
                time: '1 day ago',
                type: 'warning'
            }
        ]);
    }
    // Get dashboard employees (simplified list)
    getDashboardEmployees() {
        return this.http.get(`${this.apiUrl}/personnel/dashboard-employees`)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(error => {
            console.error('Error fetching dashboard employees:', error);
            return (0, rxjs_1.of)([]);
        }));
    }
    // Get leave applications for approval
    getPendingLeaveApplications() {
        return this.http.get(`${this.apiUrl}/leave/applications/pending`)
            .pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(error => {
            console.error('Error fetching pending leave applications:', error);
            return (0, rxjs_1.of)([]);
        }));
    }
    // Get system health status
    getSystemHealth() {
        return this.http.get(`${this.apiUrl}/health`)
            .pipe((0, operators_1.catchError)(error => {
            console.error('Error fetching system health:', error);
            return (0, rxjs_1.of)({ status: 'Unknown' });
        }));
    }
    // Default stats for fallback
    getDefaultStats() {
        return {
            totalEmployees: 0,
            activeEmployees: 0,
            pendingLeaveRequests: 0,
            payrollStatus: 'Unknown',
            departmentStats: [],
            employmentTypeStats: [],
            recentActivities: [],
            attendanceOverview: {
                present: 0,
                absent: 0,
                late: 0,
                onLeave: 0,
                total: 0
            }
        };
    }
};
exports.AdminDashboardService = AdminDashboardService;
exports.AdminDashboardService = AdminDashboardService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], AdminDashboardService);
//# sourceMappingURL=admin-dashboard.service.js.map