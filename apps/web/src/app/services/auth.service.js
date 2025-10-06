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
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
let AuthService = class AuthService {
    http;
    currentUserSubject = new rxjs_1.BehaviorSubject(null);
    currentUser$ = this.currentUserSubject.asObservable();
    constructor(http) {
        this.http = http;
        // Check if user is logged in from localStorage
        this.loadUserFromStorage();
    }
    loadUserFromStorage() {
        const token = localStorage.getItem(environment_1.environment.auth.tokenKey);
        const userData = localStorage.getItem(environment_1.environment.auth.userKey);
        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                this.currentUserSubject.next(user);
            }
            catch (error) {
                console.error('Error parsing stored user data:', error);
                this.logout();
            }
        }
    }
    enhanceUserData(user) {
        const enhancedUser = { ...user };
        // Set display name from personnel data
        if (user.personnel && user.personnel.length > 0) {
            const personnel = user.personnel[0];
            enhancedUser.name = `${personnel.first_name} ${personnel.last_name}`;
        }
        else {
            enhancedUser.name = user.username;
        }
        // Fix: Map single role to roles array if needed
        if (!user.roles && user.role) {
            enhancedUser.roles = [user.role];
        }
        // Set primary role for display
        if (enhancedUser.roles && enhancedUser.roles.length > 0) {
            enhancedUser.role = enhancedUser.roles[0];
        }
        else {
            enhancedUser.role = 'User';
        }
        enhancedUser.avatar = user.avatar || this.generateAvatarUrl(enhancedUser.name || user.username);
        return enhancedUser;
    }
    generateAvatarUrl(name) {
        // Generate a default avatar URL using a service like UI Avatars or similar
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=40`;
    }
    login(email, password) {
        const loginData = { email, password };
        return this.http.post(`${environment_1.environment.apiUrl}/auth/login`, loginData)
            .pipe((0, operators_1.map)(response => {
            if (response.success && response.data) {
                const { user, token, refreshToken } = response.data;
                // Enhance user data with display properties
                const enhancedUser = this.enhanceUserData(user);
                // Store tokens and user data
                localStorage.setItem(environment_1.environment.auth.tokenKey, token);
                if (refreshToken) {
                    localStorage.setItem(environment_1.environment.auth.refreshTokenKey, refreshToken);
                }
                localStorage.setItem(environment_1.environment.auth.userKey, JSON.stringify(enhancedUser));
                // Update current user
                this.currentUserSubject.next(enhancedUser);
                return enhancedUser;
            }
            else {
                throw new Error(response.message || 'Login failed');
            }
        }), (0, operators_1.retryWhen)(errors => errors.pipe((0, operators_1.delayWhen)((error, index) => {
            // Only retry for network errors or 5xx server errors, not for 429 or 401
            if (error.status === 429 || error.status === 401) {
                return (0, rxjs_1.throwError)(() => error);
            }
            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.min(1000 * Math.pow(2, index), 4000);
            return (0, rxjs_1.timer)(delay);
        }), (0, operators_1.take)(3) // Retry up to 3 times
        )), (0, operators_1.catchError)(this.handleError));
    }
    logout(reason) {
        localStorage.removeItem(environment_1.environment.auth.tokenKey);
        localStorage.removeItem(environment_1.environment.auth.userKey);
        localStorage.removeItem(environment_1.environment.auth.refreshTokenKey);
        // Store logout reason for display on login page
        if (reason) {
            localStorage.setItem('logout_reason', reason);
        }
        this.currentUserSubject.next(null);
    }
    getCurrentUser() {
        return this.currentUserSubject.value;
    }
    setCurrentUser(user) {
        this.currentUserSubject.next(user);
    }
    isAuthenticated() {
        const token = localStorage.getItem(environment_1.environment.auth.tokenKey);
        const user = this.currentUserSubject.value;
        return !!(token && user);
    }
    getToken() {
        return localStorage.getItem(environment_1.environment.auth.tokenKey);
    }
    getAndClearLogoutReason() {
        const reason = localStorage.getItem('logout_reason');
        if (reason) {
            localStorage.removeItem('logout_reason');
        }
        return reason;
    }
    hasRole(role) {
        const user = this.getCurrentUser();
        return user?.role === role;
    }
    hasAnyRole(roles) {
        const user = this.getCurrentUser();
        return user ? roles.some(role => this.hasRole(role)) : false;
    }
    /**
     * Get the appropriate landing page based on user role
     */
    getLandingPageByRole(role) {
        console.log('Getting landing page for role:', role);
        let landingPage;
        switch (role) {
            case 'Admin':
                landingPage = '/admin-dashboard';
                break;
            case 'HR':
                landingPage = '/admin-dashboard'; // HR users also get admin dashboard access
                break;
            case 'Manager':
                landingPage = '/dashboard'; // Regular dashboard for managers
                break;
            case 'Employee':
                landingPage = '/dashboard'; // Regular dashboard for employees
                break;
            case 'Applicant':
                landingPage = '/job-portal'; // Job portal for applicants
                break;
            default:
                landingPage = '/dashboard'; // Default fallback
                break;
        }
        console.log('Landing page determined:', landingPage);
        return landingPage;
    }
    /**
     * Get the appropriate landing page for the current user
     */
    getCurrentUserLandingPage() {
        const user = this.getCurrentUser();
        if (!user) {
            return '/login';
        }
        return this.getLandingPageByRole(user.role || 'User');
    }
    refreshToken() {
        const refreshToken = localStorage.getItem(environment_1.environment.auth.refreshTokenKey);
        if (!refreshToken) {
            return (0, rxjs_1.throwError)(() => new Error('No refresh token available'));
        }
        return this.http.post(`${environment_1.environment.apiUrl}/auth/refresh-token`, {
            refreshToken
        }).pipe((0, operators_1.map)(response => {
            if (response.success && response.data) {
                const { token } = response.data;
                localStorage.setItem(environment_1.environment.auth.tokenKey, token);
                return token;
            }
            else {
                throw new Error(response.message || 'Token refresh failed');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    changePassword(currentPassword, newPassword) {
        return this.http.post(`${environment_1.environment.apiUrl}/auth/change-password`, {
            currentPassword,
            newPassword
        }).pipe((0, operators_1.catchError)(this.handleError));
    }
    // Demo login functionality for testing
    demoLogin(role) {
        let email;
        let password;
        switch (role.toLowerCase()) {
            case 'admin':
                email = 'secretary@govagency.ph';
                password = 'password123';
                break;
            case 'hr':
                email = 'hr.director@govagency.ph';
                password = 'password123';
                break;
            case 'employee':
                email = 'admin.officer@govagency.ph';
                password = 'password123';
                break;
            default:
                email = 'secretary@govagency.ph';
                password = 'password123';
        }
        return this.login(email, password);
    }
    /**
     * Get retry information for rate limited requests
     * @param retryAfterSeconds - Retry-After header value in seconds
     * @returns Object with retry information
     */
    getRetryInfo(retryAfterSeconds) {
        const defaultRetryAfter = 15 * 60; // 15 minutes default
        const retryAfter = retryAfterSeconds || defaultRetryAfter;
        const retryTime = new Date(Date.now() + retryAfter * 1000);
        const canRetry = Date.now() > retryTime.getTime();
        return {
            canRetry,
            retryAfter: retryTime,
            message: canRetry
                ? 'You can now try logging in again.'
                : `Please wait until ${retryTime.toLocaleTimeString()} before trying again.`
        };
    }
    /**
     * Clear any stored rate limiting information
     * This can be called when a user wants to reset their session
     */
    clearRateLimitInfo() {
        // Clear any stored rate limiting data
        localStorage.removeItem('rate_limit_info');
        localStorage.removeItem('last_login_attempt');
        // Call backend endpoint to clear rate limiting (development only)
        return this.http.post(`${environment_1.environment.apiUrl}/auth/clear-rate-limit`, {})
            .pipe((0, operators_1.catchError)(error => {
            console.warn('Could not clear rate limit on server:', error);
            // Return success even if server call fails
            return [{ success: true, message: 'Rate limit cleared locally' }];
        }));
    }
    handleError = (error) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
        }
        else {
            // Server-side error
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
            else if (error.status === 0) {
                errorMessage = 'Unable to connect to server';
            }
            else if (error.status === 401) {
                errorMessage = 'Invalid credentials';
                this.logout(); // Auto logout on 401
            }
            else if (error.status === 429) {
                errorMessage = 'Too many login attempts. Please wait a few minutes before trying again.';
            }
            else if (error.status >= 500) {
                errorMessage = 'Server error occurred';
            }
            else {
                errorMessage = `Error: ${error.status} - ${error.statusText}`;
            }
        }
        console.error('Auth Service Error:', error);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], AuthService);
//# sourceMappingURL=auth.service.js.map