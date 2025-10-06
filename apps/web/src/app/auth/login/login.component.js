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
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const auth_service_1 = require("../../services/auth.service");
let LoginComponent = class LoginComponent {
    router;
    activatedRoute;
    authService;
    loginSuccess = new core_1.EventEmitter();
    loginData = {
        email: '',
        password: '',
        rememberMe: false
    };
    isLoading = false;
    showPassword = false;
    errorMessage = '';
    sessionTimeoutMessage = '';
    constructor(router, activatedRoute, authService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
    }
    ngOnInit() {
        // Check for session timeout reason from URL parameters
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['reason'] === 'session_timeout') {
                this.sessionTimeoutMessage = 'Your session has expired due to inactivity. Please log in again.';
            }
        });
        // Check for logout reason from auth service
        const logoutReason = this.authService.getAndClearLogoutReason();
        if (logoutReason === 'session_timeout') {
            this.sessionTimeoutMessage = 'Your session has expired due to inactivity. Please log in again.';
        }
    }
    onLogin() {
        if (!this.loginData.email || !this.loginData.password) {
            this.errorMessage = 'Please enter both email and password.';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        this.authService.login(this.loginData.email, this.loginData.password).subscribe({
            next: (user) => {
                console.log('Login successful:', user);
                // Check if user is an Applicant
                if (user.role === 'Applicant') {
                    // Logout the user since they shouldn't be using this login
                    this.authService.logout();
                    this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
                    this.isLoading = false;
                    return;
                }
                // Emit login success event
                this.loginSuccess.emit();
                // Navigate to appropriate dashboard based on role
                const landingPage = this.authService.getLandingPageByRole(user.role || 'User');
                this.router.navigate([landingPage]);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Login error:', error);
                // Handle rate limiting specifically
                if (error.message && error.message.includes('Too many login attempts')) {
                    const retryInfo = this.authService.getRetryInfo();
                    this.errorMessage = `${error.message} ${retryInfo.message}`;
                }
                else {
                    this.errorMessage = error.message || 'Login failed. Please try again.';
                }
                this.isLoading = false;
            }
        });
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    onForgotPassword() {
        // Implement forgot password functionality
        console.log('Forgot password clicked');
        // You can navigate to a forgot password page or show a modal
    }
    onDemoLogin(role) {
        this.isLoading = true;
        this.errorMessage = '';
        // Check if trying to login as Applicant
        if (role.toLowerCase() === 'applicant') {
            this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
            this.isLoading = false;
            return;
        }
        // Set demo credentials based on seed data
        switch (role.toLowerCase()) {
            case 'admin':
                this.loginData.email = 'secretary@govagency.ph';
                this.loginData.password = 'password123';
                break;
            case 'hr':
                this.loginData.email = 'hr.director@govagency.ph';
                this.loginData.password = 'password123';
                break;
            case 'employee':
                this.loginData.email = 'admin.officer@govagency.ph';
                this.loginData.password = 'password123';
                break;
            default:
                this.loginData.email = 'secretary@govagency.ph';
                this.loginData.password = 'password123';
        }
        // Use the demoLogin method from auth service for consistency
        this.authService.demoLogin(role).subscribe({
            next: (user) => {
                console.log('Demo login successful:', user);
                // Check if user is an Applicant (double-check)
                if (user.role === 'Applicant') {
                    // Logout the user since they shouldn't be using this login
                    this.authService.logout();
                    this.errorMessage = 'Applicant accounts should use the Job Portal Login. Please use the link below.';
                    this.isLoading = false;
                    return;
                }
                // Emit login success event
                this.loginSuccess.emit();
                // Navigate to appropriate dashboard based on role
                const landingPage = this.authService.getLandingPageByRole(user.role || 'User');
                this.router.navigate([landingPage]);
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Demo login error:', error);
                // Handle rate limiting specifically
                if (error.message && error.message.includes('Too many login attempts')) {
                    const retryInfo = this.authService.getRetryInfo();
                    this.errorMessage = `${error.message} ${retryInfo.message}`;
                }
                else {
                    this.errorMessage = error.message || 'Demo login failed. Please try again.';
                }
                this.isLoading = false;
            }
        });
    }
    openJobPortal() {
        // Set a flag to indicate public job portal mode
        localStorage.setItem('jobPortalPublicMode', 'true');
        this.router.navigate(['/online-job-application-portal']);
    }
    goToJobPortalLogin() {
        this.router.navigate(['/online-job-login']);
    }
    onResetRateLimit() {
        // Clear rate limiting information
        this.authService.clearRateLimitInfo().subscribe({
            next: (response) => {
                this.errorMessage = '';
                console.log('Rate limit information cleared:', response);
            },
            error: (error) => {
                console.error('Error clearing rate limit:', error);
                // Still clear the error message even if server call fails
                this.errorMessage = '';
            }
        });
    }
};
exports.LoginComponent = LoginComponent;
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "loginSuccess", void 0);
exports.LoginComponent = LoginComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-login',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        auth_service_1.AuthService])
], LoginComponent);
//# sourceMappingURL=login.component.js.map