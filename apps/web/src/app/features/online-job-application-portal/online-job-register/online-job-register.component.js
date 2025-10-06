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
exports.OnlineJobRegisterComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const job_portal_auth_service_1 = require("../job-portal-auth.service");
let OnlineJobRegisterComponent = class OnlineJobRegisterComponent {
    router;
    activatedRoute;
    jobPortalAuthService;
    registerData = {
        firstName: '',
        lastName: '',
        middleName: '',
        suffix: '',
        gender: '',
        civilStatus: '',
        contactNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        currentEmployer: '', // <-- Add this
        highestEducation: '' // <-- Add this
    };
    isLoading = false;
    showPassword = false;
    errorMessage = '';
    animationState = 'fade-up-enter';
    constructor(router, activatedRoute, jobPortalAuthService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.jobPortalAuthService = jobPortalAuthService;
    }
    ngOnInit() {
        setTimeout(() => {
            this.animationState = '';
        }, 500); // Remove class after animation
    }
    onRegister() {
        // Validate required fields
        if (!this.registerData.firstName || !this.registerData.lastName ||
            !this.registerData.email || !this.registerData.contactNumber ||
            !this.registerData.password || !this.registerData.confirmPassword) {
            this.errorMessage = 'Please fill in all required fields';
            return;
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.registerData.email)) {
            this.errorMessage = 'Please enter a valid email address';
            return;
        }
        // Validate phone number format (should be numeric and at least 10 digits)
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(this.registerData.contactNumber.replace(/\D/g, ''))) {
            this.errorMessage = 'Please enter a valid phone number (at least 10 digits)';
            return;
        }
        // Validate password length
        if (this.registerData.password.length < 8) {
            this.errorMessage = 'Password must be at least 8 characters long';
            return;
        }
        // Validate password confirmation
        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }
        // Validate terms agreement
        if (!this.registerData.agreeTerms) {
            this.errorMessage = 'Please agree to the Terms of Service and Privacy Policy';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        const payload = {
            first_name: this.registerData.firstName,
            last_name: this.registerData.lastName,
            middle_name: this.registerData.middleName,
            email: this.registerData.email,
            phone: this.registerData.contactNumber,
            password: this.registerData.password,
            current_employer: this.registerData.currentEmployer,
            highest_education: this.registerData.highestEducation
        };
        this.jobPortalAuthService.register(payload)
            .subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res.success) {
                    // Registration successful, show success message and navigate to login
                    this.errorMessage = '';
                    setTimeout(() => {
                        this.router.navigate(['/online-job-login'], {
                            queryParams: {
                                message: 'Registration successful! Please log in with your credentials.'
                            }
                        });
                    }, 1000);
                }
                else {
                    // Show error message from server
                    this.errorMessage = res.message || 'Registration failed. Please try again.';
                }
            },
            error: (err) => {
                this.isLoading = false;
                // Handle error (show error message)
                if (err.error && err.error.message) {
                    this.errorMessage = err.error.message;
                }
                else if (err.status === 400) {
                    this.errorMessage = 'Invalid registration data. Please check your information and try again.';
                }
                else if (err.status === 409) {
                    this.errorMessage = 'Email already registered. Please use a different email or try logging in.';
                }
                else {
                    this.errorMessage = 'An error occurred. Please try again later.';
                }
            }
        });
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    goToLogin() {
        this.animationState = 'fade-down-leave';
        setTimeout(() => {
            this.router.navigate(['/online-job-login']);
        }, 500); // Match animation duration
    }
};
exports.OnlineJobRegisterComponent = OnlineJobRegisterComponent;
exports.OnlineJobRegisterComponent = OnlineJobRegisterComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-online-job-register',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './online-job-register.component.html',
        styleUrls: ['./online-job-register.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        job_portal_auth_service_1.JobPortalAuthService])
], OnlineJobRegisterComponent);
//# sourceMappingURL=online-job-register.component.js.map