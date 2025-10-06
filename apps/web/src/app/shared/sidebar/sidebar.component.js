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
exports.SidebarComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const auth_service_1 = require("../../services/auth.service");
let SidebarComponent = class SidebarComponent {
    authService;
    router;
    isOpen = false;
    isCollapsed = false;
    isSidebarCollapsed = false;
    stateChange = new core_1.EventEmitter();
    menuItems = [];
    currentUser$;
    expandedItem = null;
    isMobile = window.innerWidth <= 768;
    // Tooltip state for collapsed sidebar
    tooltip = {
        visible: false,
        text: '',
        x: 0,
        y: 0
    };
    // Add static app links for the APP section
    appLinks = [
        { name: 'Webflow', icon: 'apps' },
        { name: 'Framer', icon: 'dashboard_customize' },
        { name: 'Typeform', icon: 'description' }
    ];
    // Replace menuItemsConfig with a grouped config by role
    menuItemsByRole = {
        Admin: [
            { name: 'Dashboard', icon: 'dashboard', path: '/admin-dashboard' },
            { name: 'System Administration', icon: 'admin_panel_settings', path: '/system-administration', children: [
                    { name: 'User Management', icon: 'manage_accounts', path: '/system-administration/user-management' },
                    { name: 'Audit Trail', icon: 'history', path: '/system-administration/audit-trail' },
                    { name: 'System Parameters', icon: 'settings', path: '/system-administration/system-parameters' }
                ] },
            { name: 'Personnel Information', icon: 'people', path: '/personnel-information-management', children: [
                    { name: 'Admin Dashboard', icon: 'analytics', path: '/personnel-information-management/admin-dashboard' },
                    { name: 'Admin Custom', icon: 'build', path: '/personnel-information-management/admin-custom' },
                    { name: 'Admin Request', icon: 'build', path: '/personnel-information-management/admin-request' },
                    { name: 'Personnel 201 File', icon: 'folder', path: '/personnel-information-management/personnel-201-file' },
                    { name: 'Personnel Movement', icon: 'swap_horiz', path: '/personnel-information-management/personnel-movement' }
                ] },
            { name: 'Employee Self-Service', icon: 'person', path: '/employee-self-service', children: [
                    { name: 'My Profile', icon: 'person', path: '/employee-self-service/my-profile' },
                    { name: 'My Requests', icon: 'request_page', path: '/employee-self-service/my-requests' },
                    { name: 'My Reports', icon: 'report', path: '/employee-self-service/my-reports' }
                ] },
            { name: 'Timekeeping & Attendance', icon: 'schedule', path: '/timekeeping-attendance', children: [
                    { name: 'Attendance Overview', icon: 'analytics', path: '/timekeeping-attendance/attendance-overview' },
                    { name: 'Attendance Logs', icon: 'history', path: '/timekeeping-attendance/attendance-logs' },
                    { name: 'Time Schedules', icon: 'schedule', path: '/timekeeping-attendance/time-schedules' },
                    { name: 'DTR Adjustment', icon: 'adjust', path: '/timekeeping-attendance/dtr-adjustment' },
                    { name: 'Employee Attendance', icon: 'person', path: '/timekeeping-attendance/employee-attendance' }
                ] },
            { name: 'Payroll Management', icon: 'payments', path: '/payroll-management', children: [
                    { name: 'Run Payroll', icon: 'payments', path: '/payroll-management/run-payroll' },
                    { name: 'Payslip Center', icon: 'payments', path: '/payroll-management/payslip-center' },
                    { name: 'Thirteen Month Pay', icon: 'payments', path: '/payroll-management/thirteen-month-pay' },
                    { name: 'Final Pay Process', icon: 'payments', path: '/payroll-management/final-pay-process' }
                ] },
            { name: 'Leave Management', icon: 'event', path: '/leave-management', children: [
                    { name: 'Leave Request Management', icon: 'event', path: '/leave-management/leave-request-management' },
                    { name: 'Leave Type Management', icon: 'event', path: '/leave-management/leave-type-management' },
                    { name: 'Leave Balance', icon: 'event', path: '/leave-management/leave-balance' },
                    { name: 'Leave Employee', icon: 'event', path: '/leave-management/leave-employee' }
                ] },
            { name: 'Job Management', icon: 'work', path: '/job-management', children: [
                    { name: 'Recruitment', icon: 'work', path: '/recruitment' },
                    { name: 'Job Portal Management', icon: 'admin_panel_settings', path: '/job-portal-management' }
                ] },
            { name: 'Report Generation', icon: 'assessment', path: '/report-generation' },
            { name: 'Performance Management', icon: 'trending_up', path: '/performance-management' },
            { name: 'Learning & Development', icon: 'school', path: '/learning-development' },
            { name: 'Health & Wellness', icon: 'health_and_safety', path: 'https://quanby-health-care.vercel.app/', external: true, target: '_blank' }
        ],
        HR: [
            { name: 'Personnel Information', icon: 'people', path: '/personnel-information-management', children: [
                    { name: 'Admin Dashboard', icon: 'analytics', path: '/personnel-information-management/admin-dashboard' },
                    { name: 'Admin Custom', icon: 'build', path: '/personnel-information-management/admin-custom' },
                    { name: 'Admin Request', icon: 'build', path: '/personnel-information-management/admin-request' },
                    { name: 'Personnel 201 File', icon: 'folder', path: '/personnel-information-management/personnel-201-file' },
                    { name: 'Personnel Movement', icon: 'swap_horiz', path: '/personnel-information-management/personnel-movement' }
                ] },
            { name: 'Employee Self-Service', icon: 'person', path: '/employee-self-service', children: [
                    { name: 'My Profile', icon: 'person', path: '/employee-self-service/my-profile' },
                    { name: 'My Requests', icon: 'request_page', path: '/employee-self-service/my-requests' },
                    { name: 'My Reports', icon: 'report', path: '/employee-self-service/my-reports' }
                ] },
            { name: 'Timekeeping & Attendance', icon: 'schedule', path: '/timekeeping-attendance', children: [
                    { name: 'Attendance Overview', icon: 'analytics', path: '/timekeeping-attendance/attendance-overview' },
                    { name: 'Attendance Logs', icon: 'history', path: '/timekeeping-attendance/attendance-logs' },
                    { name: 'Time Schedules', icon: 'schedule', path: '/timekeeping-attendance/time-schedules' },
                    { name: 'DTR Adjustment', icon: 'adjust', path: '/timekeeping-attendance/dtr-adjustment' },
                    { name: 'Employee Attendance', icon: 'person', path: '/timekeeping-attendance/employee-attendance' }
                ] },
            { name: 'Payroll Management', icon: 'payments', path: '/payroll-management', children: [
                    { name: 'Payroll Overview', icon: 'analytics', path: '/payroll-management/payroll-overview' },
                    { name: 'Master Payroll', icon: 'payments', path: '/payroll-management/master-payroll' },
                    { name: 'Deductions', icon: 'payments', path: '/payroll-management/deductions' },
                    { name: 'Loan Management', icon: 'payments', path: '/payroll-management/loan-management' },
                    { name: 'Payroll Adjustment', icon: 'payments', path: '/payroll-management/payroll-adjustment' },
                    { name: 'Payroll Run', icon: 'payments', path: '/payroll-management/payroll-run' },
                    { name: 'Employee Payroll', icon: 'payments', path: '/payroll-management/employee-payroll' }
                ] },
            { name: 'Leave Management', icon: 'event', path: '/leave-management', children: [
                    { name: 'Leave Request Management', icon: 'event', path: '/leave-management/leave-request-management' },
                    { name: 'Leave Type Management', icon: 'event', path: '/leave-management/leave-type-management' },
                    { name: 'Leave Balance', icon: 'event', path: '/leave-management/leave-balance' },
                    { name: 'Leave Employee', icon: 'event', path: '/leave-management/leave-employee' }
                ] },
            { name: 'Report Generation', icon: 'assessment', path: '/report-generation' },
            { name: 'Job Management', icon: 'work', path: '/job-management', children: [
                    { name: 'Recruitment', icon: 'work', path: '/recruitment' },
                    { name: 'Job Portal Management', icon: 'admin_panel_settings', path: '/job-portal-management' }
                ] },
            { name: 'Performance Management', icon: 'trending_up', path: '/performance-management' },
            { name: 'Learning & Development', icon: 'school', path: '/learning-development' },
            { name: 'Health & Wellness', icon: 'health_and_safety', path: 'https://quanby-health-care.vercel.app/', external: true, target: '_blank' }
        ],
        Employee: [
            { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
            { name: 'My Profile', icon: 'person', path: '/employee-self-service/my-profile' },
            { name: 'My Requests', icon: 'request_page', path: '/employee-self-service/my-requests' },
            { name: 'My Reports', icon: 'report', path: '/employee-self-service/my-reports' },
            { name: 'Employee Attendance', icon: 'person', path: '/timekeeping-attendance/employee-attendance' },
            { name: 'Leave Employee', icon: 'event', path: '/leave-management/leave-employee' },
            { name: 'E-Payroll', icon: 'payments', path: '/e-payroll', children: [
                    { name: 'Payslips', icon: 'payments', path: '/e-payroll/payslips' },
                    { name: 'Contributions', icon: 'payments', path: '/e-payroll/contributions' },
                    { name: 'Loans', icon: 'payments', path: '/e-payroll/loans' },
                    { name: 'Thirteen Month Pay', icon: 'payments', path: '/e-payroll/thirteenth-month-pay' },
                    { name: 'Final Pay', icon: 'payments', path: '/e-payroll/final-pay' }
                ] },
            { name: 'Performance Management', icon: 'trending_up', path: '/performance-management' },
            { name: 'Health & Wellness', icon: 'health_and_safety', path: 'https://quanby-health-care.vercel.app/', external: true, target: '_blank' }
        ],
        Manager: [
            { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
            { name: 'Team Management', icon: 'groups', path: '/manager/team-management' },
            { name: 'Attendance Overview', icon: 'analytics', path: '/timekeeping-attendance/attendance-overview' },
            { name: 'Attendance Logs', icon: 'history', path: '/timekeeping-attendance/attendance-logs' },
            { name: 'Employee Attendance', icon: 'person', path: '/timekeeping-attendance/employee-attendance' },
            { name: 'Leave Management', icon: 'event', path: '/leave-management', children: [
                    { name: 'Leave Balance', icon: 'event', path: '/leave-management/leave-balance' },
                    { name: 'Leave Employee', icon: 'event', path: '/leave-management/leave-employee' }
                ] },
            { name: 'Performance Management', icon: 'trending_up', path: '/performance-management' },
            { name: 'Learning & Development', icon: 'school', path: '/learning-development' },
            { name: 'Health & Wellness', icon: 'health_and_safety', path: 'https://quanby-health-care.vercel.app/', external: true, target: '_blank' }
        ],
        Applicant: [
            { name: 'Applicant Dashboard', icon: 'dashboard', path: '/applicant-dashboard' },
            { name: 'Job Portal', icon: 'work', path: '/online-job-application-portal' }
        ]
    };
    get currentMenuItems() {
        const user = this.authService.getCurrentUser();
        return user && user.role && this.menuItemsByRole[user.role] ? this.menuItemsByRole[user.role] : [];
    }
    userSub;
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.currentUser$ = this.authService.currentUser$;
    }
    onResize() {
        const wasNotMobile = !this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        if (wasNotMobile && this.isMobile) {
            this.isOpen = false;
            this.emitStateChange();
        }
        else if (!wasNotMobile && !this.isMobile) {
            this.isOpen = true;
            this.isCollapsed = false;
            this.emitStateChange();
        }
    }
    ngOnInit() {
        this.updateMenuItems();
        this.isOpen = !this.isMobile;
        this.isCollapsed = false;
        this.emitStateChange();
        this.userSub = this.currentUser$.subscribe(() => {
            this.updateMenuItems();
        });
        // Listen to route changes to update menu for job portal public mode
        this.router.events.subscribe(event => {
            if (event instanceof router_1.NavigationEnd) {
                this.updateMenuItems();
            }
        });
    }
    ngOnDestroy() {
        this.userSub?.unsubscribe();
    }
    updateMenuItems() {
        // If in job portal public mode and on the job portal route, show only Login/Register
        const publicMode = localStorage.getItem('jobPortalPublicMode') === 'true';
        const onJobPortal = this.router.url.startsWith('/online-job-application-portal');
        if (publicMode && onJobPortal) {
            this.menuItems = [
                { name: 'Login', icon: 'login', path: '/login', roles: [] },
                { name: 'Register', icon: 'person_add', path: '/register', roles: [] }
            ];
            return;
        }
        // If not on the job portal, clear the flag
        if (publicMode && !onJobPortal) {
            localStorage.removeItem('jobPortalPublicMode');
        }
        // Use the imported menu configuration instead of defining items inline
        this.menuItems = this.currentMenuItems;
    }
    toggleMenuItem(itemName, event) {
        event.preventDefault();
        event.stopPropagation();
        // If sidebar is collapsed and not mobile, expand it first
        if (this.isCollapsed && !this.isMobile) {
            this.isCollapsed = false;
            this.isOpen = true;
            this.emitStateChange();
            setTimeout(() => {
                this.expandedItem = itemName;
            }, 200); // Adjust delay as needed for animation
            return;
        }
        // Toggle the submenu expansion state
        if (this.expandedItem === itemName) {
            // If already expanded, collapse it
            this.expandedItem = null;
        }
        else {
            // If not expanded, expand it
            this.expandedItem = itemName;
        }
    }
    isMenuItemExpanded(itemName) {
        return this.expandedItem === itemName;
    }
    onMenuItemClick() {
        if (this.isMobile) {
            this.isOpen = false;
        }
    }
    logout() {
        // Get current user before logout
        const currentUser = this.authService.getCurrentUser();
        const isApplicant = currentUser && currentUser.role === 'Applicant';
        this.authService.logout();
        // Redirect based on user role
        if (isApplicant) {
            this.router.navigate(['/online-job-login']);
        }
        else {
            this.router.navigate(['/login']);
        }
    }
    showTooltip(event, text) {
        if (this.isCollapsed && !this.isMobile) {
            this.tooltip.visible = true;
            this.tooltip.text = text;
            this.setTooltipPosition(event);
        }
    }
    moveTooltip(event) {
        if (this.tooltip.visible) {
            this.setTooltipPosition(event);
        }
    }
    hideTooltip() {
        this.tooltip.visible = false;
    }
    setTooltipPosition(event) {
        // Offset the tooltip a bit to the right of the cursor
        this.tooltip.x = event.clientX + 16;
        this.tooltip.y = event.clientY + 8;
    }
    emitStateChange() {
        this.stateChange.emit({
            isOpen: this.isOpen,
            isCollapsed: this.isCollapsed
        });
    }
};
exports.SidebarComponent = SidebarComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "isOpen", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "isCollapsed", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "isSidebarCollapsed", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], SidebarComponent.prototype, "stateChange", void 0);
__decorate([
    (0, core_1.HostListener)('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SidebarComponent.prototype, "onResize", null);
exports.SidebarComponent = SidebarComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-sidebar',
        standalone: true,
        imports: [common_1.CommonModule, router_1.RouterLink, router_1.RouterLinkActive],
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], SidebarComponent);
//# sourceMappingURL=sidebar.component.js.map