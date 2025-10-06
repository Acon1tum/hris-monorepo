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
exports.UserDetailsService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
const auth_service_1 = require("./auth.service");
let UserDetailsService = class UserDetailsService {
    http;
    authService;
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    /**
     * Fetch current user details from the database
     */
    getCurrentUserDetails() {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) {
            throw new Error('No authenticated user found');
        }
        // Check if user is an applicant
        if (currentUser.role === 'Applicant') {
            // Use job portal endpoint for applicants
            return this.http.get(`${environment_1.environment.apiUrl}/job-portal/current-profile`)
                .pipe((0, operators_1.map)(response => {
                if (response.success && response.data) {
                    // Map job applicant data to UserDetails format
                    return {
                        id: response.data.id,
                        first_name: response.data.first_name,
                        middle_name: response.data.middle_name,
                        last_name: response.data.last_name,
                        email: response.data.email,
                        contact_number: response.data.phone,
                        phone: response.data.phone
                    };
                }
                else {
                    throw new Error('Failed to fetch applicant details');
                }
            }));
        }
        else {
            // Use regular user endpoint for other roles
            return this.http.get(`${environment_1.environment.apiUrl}/system/users/current-user-details`)
                .pipe((0, operators_1.map)(response => {
                if (response.success && response.data) {
                    return response.data;
                }
                else {
                    throw new Error(response.message || 'Failed to fetch user details');
                }
            }));
        }
    }
    /**
     * Fetch user details by user ID
     */
    getUserDetailsById(userId) {
        return this.http.get(`${environment_1.environment.apiUrl}/system/users/${userId}/details`)
            .pipe((0, operators_1.map)(response => {
            if (response.success && response.data) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch user details');
            }
        }));
    }
};
exports.UserDetailsService = UserDetailsService;
exports.UserDetailsService = UserDetailsService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient,
        auth_service_1.AuthService])
], UserDetailsService);
//# sourceMappingURL=user-details.service.js.map