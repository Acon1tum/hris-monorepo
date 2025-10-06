"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Import module routes
const auth_routes_1 = require("./modules/auth/auth.routes");
const employee_self_service_routes_1 = __importDefault(require("./modules/employee-self-service/employee-self-service.routes"));
const personnel_information_management_routes_1 = __importDefault(require("./modules/personnel-information-management/personnel-information-management.routes"));
const leave_management_routes_1 = __importDefault(require("./modules/leave-management/leave-management.routes"));
const timekeeping_attendance_routes_1 = __importDefault(require("./modules/timekeeping-attendance/timekeeping-attendance.routes"));
const payroll_management_routes_1 = __importDefault(require("./modules/payroll-management/payroll-management.routes"));
const performance_management_routes_1 = __importDefault(require("./modules/performance-management/performance-management.routes"));
const recruitment_routes_1 = __importDefault(require("./modules/recruitment/recruitment.routes"));
const job_portal_management_routes_1 = __importDefault(require("./modules/job-portal-management/job-portal-management.routes"));
const online_job_application_portal_routes_1 = __importDefault(require("./modules/online-job-application-portal/online-job-application-portal.routes"));
const health_wellness_routes_1 = __importDefault(require("./modules/health-wellness/health-wellness.routes"));
const report_generation_routes_1 = __importDefault(require("./modules/report-generation/report-generation.routes"));
const system_administration_routes_1 = __importDefault(require("./modules/system-administration/system-administration.routes"));
const router = (0, express_1.Router)();
// API version info
router.get('/', (req, res) => {
    res.json({
        message: 'HRIS API v1.0.0',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth',
            employees: '/api/employees',
            personnel: '/api/personnel',
            leaves: '/api/leaves',
            timekeeping: '/api/timekeeping',
            payroll: '/api/payroll',
            performance: '/api/performance',
            recruitment: '/api/recruitment',
            jobPortal: '/api/job-portal',
            jobApplications: '/api/job-applications',
            health: '/api/health',
            reports: '/api/reports',
            admin: '/api/admin'
        }
    });
});
// Mount module routes
router.use('/auth', auth_routes_1.authRoutes);
router.use('/employee-self-service', employee_self_service_routes_1.default);
router.use('/personnel', personnel_information_management_routes_1.default);
router.use('/leaves', leave_management_routes_1.default);
router.use('/leave', leave_management_routes_1.default); // Alias for frontend compatibility
router.use('/timekeeping', timekeeping_attendance_routes_1.default);
router.use('/payroll', payroll_management_routes_1.default);
router.use('/performance', performance_management_routes_1.default);
router.use('/recruitment', recruitment_routes_1.default);
router.use('/job-portal', job_portal_management_routes_1.default);
router.use('/job-applications', online_job_application_portal_routes_1.default);
router.use('/health', health_wellness_routes_1.default);
router.use('/reports', report_generation_routes_1.default);
router.use('/admin', system_administration_routes_1.default);
router.use('/system', system_administration_routes_1.default); // Alias for frontend compatibility
exports.default = router;
//# sourceMappingURL=routes.js.map