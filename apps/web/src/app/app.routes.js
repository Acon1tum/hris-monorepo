"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const login_component_1 = require("./auth/login/login.component");
const dashboard_component_1 = require("./dashboard/dashboard.component");
const permission_guard_1 = require("./guards/permission.guard"); // Rename PermissionGuard to RoleGuard
const online_job_login_component_1 = require("./features/online-job-application-portal/online-job-login/online-job-login.component");
const online_job_register_component_1 = require("./features/online-job-application-portal/online-job-register/online-job-register.component");
exports.routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager', 'Applicant'] }
    },
    {
        path: 'admin-dashboard',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/dashboard/admin-dashboard/admin-dashboard.component'))).then(m => m.AdminDashboardComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'system-administration',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/system-administration/index.component'))).then(m => m.SystemAdministrationComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'system-administration/user-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/system-administration/user-management/user-management.component'))).then(m => m.UserManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'system-administration/audit-trail',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/system-administration/audit-trail/audit-trail.component'))).then(m => m.AuditTrailComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'system-administration/system-parameters',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/system-administration/system-parameters/system-parameters.component'))).then(m => m.SystemParametersComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/index.component'))).then(m => m.PersonnelInformationManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'personnel-information-management/admin-dashboard',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/admin-dashboard/admin-dashboard.component'))).then(m => m.AdminDashboardComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/admin-custom',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/admin-custom/admin-custom.component'))).then(m => m.AdminCustomComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/admin-request',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/admin-request/admin-request.component'))).then(m => m.AdminRequestComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/personnel-201-file',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/personnel-201-file/personnel-201-file.component'))).then(m => m.Personnel201FileComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/personnel-movement',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/personnel-movement/personnel-movement.component'))).then(m => m.PersonnelMovementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/workflows',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/personnel-movement/workflows/workflows.component'))).then(m => m.WorkflowsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'personnel-information-management/audit-trail',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/personnel-information-management/personnel-movement/audit-trail/audit-trail.component'))).then(m => m.AuditTrailComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    {
        path: 'employee-self-service',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/employee-self-service/index.component'))).then(m => m.EmployeeSelfServiceComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'employee-self-service/my-profile',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/employee-self-service/my-profile/my-profile.component'))).then(m => m.MyProfileComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'employee-self-service/my-requests',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/employee-self-service/my-requests/my-requests.component'))).then(m => m.MyRequestsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'employee-self-service/my-reports',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/employee-self-service/my-reports/my-reports.component'))).then(m => m.MyReportsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/index.component'))).then(m => m.TimekeepingAttendanceComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance/attendance-overview',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/attendance-overview/attendance-overview.component'))).then(m => m.AttendanceOverviewComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance/attendance-logs',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/attendance-logs/attendance-logs.component'))).then(m => m.AttendanceLogsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance/time-schedules',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/time-schedules/time-schedules.component'))).then(m => m.TimeSchedulesComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance/dtr-adjustment',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/dtr-adjustment/dtr-adjustment.component'))).then(m => m.DtrAdjustmentComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'timekeeping-attendance/employee-attendance',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/timekeeping-attendance/employee-attendance/employee-attendance.component'))).then(m => m.EmployeeAttendanceComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'payroll-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/payroll-management/index.component'))).then(m => m.PayrollManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'payroll-management/run-payroll',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/payroll-management/run-payroll/run-payroll.component'))).then(m => m.RunPayrollComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'payroll-management/payslip-center',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/payroll-management/payslip-center/payslip-center.component'))).then(m => m.PayslipCenterComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'payroll-management/thirteen-month-pay',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/payroll-management/thirteen-month-pay/thirteen-month-pay.component'))).then(m => m.ThirteenMonthPayComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'payroll-management/final-pay-process',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/payroll-management/final-pay-process/final-pay-process.component'))).then(m => m.FinalPayProcessComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'leave-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/leave-management/index.component'))).then(m => m.LeaveManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'leave-management/leave-request-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/leave-management/leave-request-management/leave-request-management.component'))).then(m => m.LeaveRequestManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'leave-management/leave-type-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/leave-management/leave-type-management/leave-type-management.component'))).then(m => m.LeaveTypeManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'leave-management/leave-balance',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/leave-management/leave-balance/leave-balance.component'))).then(m => m.LeaveBalanceComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Manager'] }
    },
    {
        path: 'leave-management/leave-employee',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/leave-management/leave-employee/leave-employee.component'))).then(m => m.LeaveEmployeeComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'e-payroll',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/e-payroll.component'))).then(m => m.EPayrollComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'e-payroll/payslips',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/payslips/payslips.component'))).then(m => m.PayslipsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'e-payroll/contributions',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/contributions/contributions.component'))).then(m => m.ContributionsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'e-payroll/loans',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/loans/loans.component'))).then(m => m.LoansComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'e-payroll/thirteenth-month-pay',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/thirteenth-month-pay/thirteenth-month-pay.component'))).then(m => m.ThirteenthMonthPayComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'e-payroll/final-pay',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/e-payroll/final-pay/final-pay.component'))).then(m => m.FinalPayComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Employee'] }
    },
    {
        path: 'report-generation',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/report-generation/index.component'))).then(m => m.ReportGenerationComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'recruitment',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/job-management/recruitment/index.component'))).then(m => m.RecruitmentComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'online-job-application-portal',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/online-job-application-portal/index.component'))).then(m => m.OnlineJobApplicationPortalComponent)
    },
    {
        path: 'applicant-dashboard',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/online-job-application-portal/applicant-dashboard/applicant-dashboard.component'))).then(m => m.ApplicantDashboardComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Applicant'] }
    },
    {
        path: 'online-job-login',
        component: online_job_login_component_1.OnlineJobLoginComponent
    },
    {
        path: 'online-job-register',
        component: online_job_register_component_1.OnlineJobRegisterComponent
    },
    {
        path: 'performance-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/performance-management/index.component'))).then(m => m.PerformanceManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager'] }
    },
    {
        path: 'health-wellness',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/health-wellness/index.component'))).then(m => m.HealthWellnessComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager', 'Applicant'] }
    },
    {
        path: 'health-wellness/join-program',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/health-wellness/join-program/join-program.component'))).then(m => m.JoinProgramComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager', 'Applicant'] }
    },
    {
        path: 'health-wellness/wellness-events',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/health-wellness/wellness-events/wellness-events.component'))).then(m => m.WellnessEventsComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin', 'HR', 'Employee', 'Manager', 'Applicant'] }
    },
    {
        path: 'job-portal-management',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/job-management/job-portal-management/index.component'))).then(m => m.JobPortalManagementComponent),
        canActivate: [permission_guard_1.PermissionGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'applicant-interviews',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/online-job-application-portal/applicant-dashboard/interviews/interviews.component'))).then(m => m.InterviewsComponent),
    },
    {
        path: 'calendar',
        loadComponent: () => Promise.resolve().then(() => __importStar(require('./features/online-job-application-portal/applicant-dashboard/calendar/calendar.component'))).then(m => m.CalendarComponent),
    },
    { path: '**', redirectTo: '/login' }
];
//# sourceMappingURL=app.routes.js.map