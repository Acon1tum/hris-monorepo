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
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const header_component_1 = require("./shared/header/header.component");
const sidebar_component_1 = require("./shared/sidebar/sidebar.component");
const login_component_1 = require("./auth/login/login.component");
const session_warning_dialog_component_1 = require("./shared/components/session-warning-dialog/session-warning-dialog.component");
const auth_service_1 = require("./services/auth.service");
const inactivity_service_1 = require("./services/inactivity.service");
let AppComponent = class AppComponent {
    authService;
    inactivityService;
    title = 'hris-frontend';
    isSidebarOpen = true;
    isSidebarCollapsed = false;
    currentUser$;
    subscriptions = [];
    features = [
        { name: 'System Administration', icon: '⚙️', route: '/system-administration', description: 'Manage system settings and configurations' },
        { name: 'Personnel Information Management', icon: '👥', route: '/personnel-information-management', description: 'Manage employee information and records' },
        { name: 'Employee Self-Service', icon: '👤', route: '/employee-self-service', description: 'Employee portal for self-service functions' },
        { name: 'Timekeeping & Attendance', icon: '⏰', route: '/timekeeping-attendance', description: 'Track employee time and attendance' },
        { name: 'Payroll Management', icon: '💰', route: '/payroll-management', description: 'Manage payroll processing and calculations' },
        { name: 'Leave Management', icon: '📅', route: '/leave-management', description: 'Handle leave requests and approvals' },
        { name: 'Report Generation', icon: '📊', route: '/report-generation', description: 'Generate and view reports' },
        { name: 'Recruitment', icon: '🎯', route: '/recruitment', description: 'Manage recruitment and hiring process' },
        { name: 'Online Job Application Portal', icon: '🌐', route: '/online-job-application-portal', description: 'External job application portal' },
        { name: 'Performance Management', icon: '📈', route: '/performance-management', description: 'Track and manage employee performance' },
        { name: 'Learning & Development', icon: '🎓', route: '/learning-development', description: 'Manage training and development programs' },
        { name: 'Health & Wellness', icon: '🏥', route: '/health-wellness', description: 'Health and wellness programs' }
    ];
    constructor(authService, inactivityService) {
        this.authService = authService;
        this.inactivityService = inactivityService;
        this.currentUser$ = this.authService.currentUser$;
    }
    ngOnInit() {
        // Check screen size on init
        this.checkScreenSize();
        // Listen for window resize
        window.addEventListener('resize', () => this.checkScreenSize());
        // Initialize inactivity service when user is authenticated
        this.subscriptions.push(this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.inactivityService.initialize();
            }
            else {
                this.inactivityService.destroy();
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.inactivityService.destroy();
    }
    checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.isSidebarOpen = false;
            this.isSidebarCollapsed = false;
        }
        else {
            this.isSidebarOpen = true;
            this.isSidebarCollapsed = false;
        }
    }
    onLoginSuccess() {
        // Login success is handled by the AuthService
    }
    onLogout() {
        this.authService.logout();
    }
    toggleSidebar() {
        if (window.innerWidth <= 768) {
            // On mobile, just toggle open/closed
            this.isSidebarOpen = !this.isSidebarOpen;
            this.isSidebarCollapsed = false;
        }
        else {
            // On desktop, toggle between open and collapsed only
            if (this.isSidebarOpen && !this.isSidebarCollapsed) {
                // Currently open, collapse it
                this.isSidebarCollapsed = true;
            }
            else {
                // If collapsed or closed, open it
                this.isSidebarOpen = true;
                this.isSidebarCollapsed = false;
            }
        }
    }
    onSidebarStateChange(state) {
        this.isSidebarOpen = state.isOpen;
        this.isSidebarCollapsed = state.isCollapsed;
    }
    isFeaturePage() {
        const currentUrl = window.location.pathname;
        return currentUrl !== '/' && currentUrl !== '/dashboard' && currentUrl !== '/login';
    }
    onSidebarCollapse(collapsed) {
        this.isSidebarCollapsed = collapsed;
    }
};
exports.AppComponent = AppComponent;
exports.AppComponent = AppComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        standalone: true,
        imports: [
            common_1.CommonModule,
            router_1.RouterOutlet,
            router_1.RouterLink,
            header_component_1.HeaderComponent,
            sidebar_component_1.SidebarComponent,
            login_component_1.LoginComponent,
            session_warning_dialog_component_1.SessionWarningDialogComponent
        ],
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        inactivity_service_1.InactivityService])
], AppComponent);
//# sourceMappingURL=app.component.js.map