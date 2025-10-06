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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineJobLoginComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const job_portal_auth_service_1 = require("../job-portal-auth.service");
const lottie_web_1 = __importDefault(require("lottie-web"));
let OnlineJobLoginComponent = class OnlineJobLoginComponent {
    router;
    activatedRoute;
    jobPortalAuthService;
    lottieContainer;
    loginData = {
        email: '',
        password: '',
        rememberMe: false
    };
    isLoading = false;
    showPassword = false;
    errorMessage = null;
    sessionTimeoutMessage = null;
    animationState = 'fade-up-enter';
    successMessage = null;
    constructor(router, activatedRoute, jobPortalAuthService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.jobPortalAuthService = jobPortalAuthService;
    }
    ngOnInit() {
        setTimeout(() => {
            this.animationState = '';
        }, 500); // Remove 
        // class after animation
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['reason'] === 'session_timeout') {
                this.sessionTimeoutMessage = 'Your session has expired. Please log in again.';
            }
        });
    }
    ngAfterViewInit() {
        lottie_web_1.default.loadAnimation({
            container: this.lottieContainer.nativeElement,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/images/register.json'
        });
    }
    onLogin() {
        if (!this.loginData.email || !this.loginData.password) {
            this.errorMessage = 'Please enter both email and password';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.jobPortalAuthService.login(this.loginData.email, this.loginData.password).subscribe({
            next: (applicant) => {
                console.log('Login successful:', applicant);
                this.isLoading = false;
                this.successMessage = 'Login successful! Redirecting...';
                // Navigate to the applicant dashboard
                setTimeout(() => {
                    this.router.navigate(['/applicant-dashboard']);
                }, 1000);
            },
            error: (error) => {
                console.error('Login error:', error);
                this.errorMessage = error.message || 'Login failed. Please check your credentials and try again.';
                this.isLoading = false;
            }
        });
    }
    onDemoLogin() {
        this.loginData.email = 'demo@example.com';
        this.loginData.password = 'demo123';
        this.onLogin();
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    onForgotPassword() {
        // Implement forgot password functionality for job portal
        console.log('Forgot password clicked');
        // You can navigate to a forgot password page or show a modal
    }
    goToRegister() {
        this.animationState = 'fade-down-leave';
        setTimeout(() => {
            this.router.navigate(['/online-job-register']);
        }, 500); // Match animation duration
    }
};
exports.OnlineJobLoginComponent = OnlineJobLoginComponent;
__decorate([
    (0, core_1.ViewChild)('lottieContainer', { static: true }),
    __metadata("design:type", core_1.ElementRef)
], OnlineJobLoginComponent.prototype, "lottieContainer", void 0);
exports.OnlineJobLoginComponent = OnlineJobLoginComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-online-job-login',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './online-job-login.component.html',
        styleUrls: ['./online-job-login.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        job_portal_auth_service_1.JobPortalAuthService])
], OnlineJobLoginComponent);
//# sourceMappingURL=online-job-login.component.js.map