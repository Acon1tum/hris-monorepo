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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPortalAuthService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../environments/environment");
const auth_service_1 = require("src/app/services/auth.service");
let JobPortalAuthService = class JobPortalAuthService {
    http;
    authService;
    currentApplicantSubject = new rxjs_1.BehaviorSubject(null);
    currentApplicant$ = this.currentApplicantSubject.asObservable();
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    login(email, password) {
        // Generate a unique request ID for tracking
        const requestId = Math.random().toString(36).substring(2, 15);
        const startTime = Date.now();
        // Helper function for consistent logging
        const log = (message, data) => {
            const timestamp = new Date().toISOString();
            const logData = data ? JSON.stringify(data, null, 2) : '';
            console.log(`[${timestamp}] [${requestId}] ${message}`, logData);
        };
        log('=== Job Portal Login Request ===');
        log('Email:', email);
        log('Environment API URL:', environment_1.environment.apiUrl);
        // Input validation
        if (!email?.trim()) {
            const errorMsg = 'Email is required';
            log('Validation error:', errorMsg);
            return (0, rxjs_1.throwError)(() => new Error(errorMsg));
        }
        if (!password) {
            const errorMsg = 'Password is required';
            log('Validation error:', errorMsg);
            return (0, rxjs_1.throwError)(() => new Error(errorMsg));
        }
        log('Sending login request to server...');
        return this.http.post(`${environment_1.environment.apiUrl}/job-applications/login`, {
            email: email.trim(),
            password: password
        }).pipe((0, operators_1.map)(response => {
            log('Login response received:', {
                success: response?.success,
                hasToken: !!response?.token,
                hasUserData: !!response?.data?.user,
                hasApplicantData: !!response?.data?.applicant,
                responseTime: `${Date.now() - startTime}ms`
            });
            if (response && response.success && response.token && response.data) {
                // Store the authentication data using the main auth service
                const { user, applicant } = response.data;
                // Store token in localStorage
                localStorage.setItem(environment_1.environment.auth.tokenKey, response.token);
                localStorage.setItem(environment_1.environment.auth.userKey, JSON.stringify(user));
                // Update the main auth service
                this.authService.setCurrentUser(user);
                // Update the current applicant subject
                this.currentApplicantSubject.next(applicant);
                log('User authenticated successfully', {
                    userId: user?.id,
                    email: user?.email,
                    role: user?.role,
                    applicantId: applicant?.id
                });
                return applicant;
            }
            else {
                log('Login response missing required data', response);
                throw new Error(response?.message || 'Invalid response from server');
            }
        }), (0, operators_1.catchError)(error => {
            log('Login error:', {
                status: error.status,
                message: error.message,
                error: error.error,
                responseTime: `${Date.now() - startTime}ms`
            });
            // Enhance error message based on status code
            let userFriendlyMessage = 'Login failed. Please try again.';
            if (error.status === 0) {
                userFriendlyMessage = 'Cannot connect to server. Please check your internet connection.';
            }
            else if (error.status === 400) {
                userFriendlyMessage = error.error?.message || 'Invalid request. Please check your input.';
            }
            else if (error.status === 401) {
                userFriendlyMessage = 'Invalid email or password. Please try again.';
            }
            else if (error.status === 403) {
                userFriendlyMessage = 'Access denied. This portal is for applicants only.';
            }
            else if (error.status === 404) {
                userFriendlyMessage = 'User not found. Please check your email or register for an account.';
            }
            else if (error.status === 500) {
                userFriendlyMessage = 'A server error occurred. Please try again later.';
                log('Server error details:', error.error);
            }
            return (0, rxjs_1.throwError)(() => new Error(userFriendlyMessage));
        }));
    }
    logout() {
        // Use the main auth service to log out
        this.authService.logout();
        // Clear any applicant-specific data
        this.currentApplicantSubject.next(null);
    }
    isAuthenticated() {
        // Defer to the main auth service
        return this.authService.isAuthenticated();
    }
    getToken() {
        // Get token from the main auth service
        return this.authService.getToken();
    }
    getCurrentApplicant() {
        return this.currentApplicantSubject.value;
    }
    getCurrentApplicantProfile() {
        return this.http.get(`${environment_1.environment.apiUrl}/job-applications/current-profile`).pipe((0, operators_1.map)(response => response.data));
    }
    register(registrationData) {
        return this.http.post(`${environment_1.environment.apiUrl}/job-applications/register`, registrationData);
    }
    getProfile(applicantId) {
        return this.http.get(`${environment_1.environment.apiUrl}/job-applications/profile?applicantId=${applicantId}`).pipe((0, operators_1.map)(response => response.data));
    }
    updateProfile(applicantId, updateData) {
        return this.http.put(`${environment_1.environment.apiUrl}/job-applications/profile?applicantId=${applicantId}`, updateData).pipe((0, operators_1.map)(response => response.data));
    }
};
exports.JobPortalAuthService = JobPortalAuthService;
exports.JobPortalAuthService = JobPortalAuthService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient, typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], JobPortalAuthService);
//# sourceMappingURL=job-portal-auth.service.js.map