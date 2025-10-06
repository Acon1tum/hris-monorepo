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
exports.LeaveRequestManagementService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../../environments/environment");
let LeaveRequestManagementService = class LeaveRequestManagementService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/leave`;
    constructor(http) {
        this.http = http;
    }
    /**
     * Get all leave applications with filters
     */
    getLeaveApplications(filters = {}) {
        let params = new http_1.HttpParams();
        Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, value.toString());
            }
        });
        return this.http.get(`${this.apiUrl}/applications`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                // Ensure data is always an array
                const applications = Array.isArray(response.data) ? response.data : [];
                return {
                    applications,
                    pagination: response.pagination || {}
                };
            }
            else {
                throw new Error(response.message || 'Failed to fetch leave applications');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get pending leave applications for approval
     */
    getPendingApplications() {
        return this.http.get(`${this.apiUrl}/applications/pending`)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch pending applications');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Approve a leave application
     */
    approveApplication(id, comments) {
        const requestData = {
            status: 'Approved',
            comments
        };
        return this.http.put(`${this.apiUrl}/applications/${id}/approve`, requestData)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to approve application');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Reject a leave application
     */
    rejectApplication(id, comments) {
        const requestData = {
            status: 'Rejected',
            comments
        };
        return this.http.put(`${this.apiUrl}/applications/${id}/reject`, requestData)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to reject application');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get all departments for filtering
     */
    getDepartments() {
        return this.http.get(`${environment_1.environment.apiUrl}/system/departments`)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch departments');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get all personnel for filtering
     */
    getPersonnel() {
        return this.http.get(`${environment_1.environment.apiUrl}/personnel`)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch personnel');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get supporting document URL for preview
     */
    getSupportingDocumentUrl(documentPath) {
        if (!documentPath)
            return '';
        return `${environment_1.environment.apiUrl.replace('/api', '')}/uploads/${documentPath}`;
    }
    /**
     * Handle HTTP errors
     */
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
                errorMessage = 'Unauthorized access';
            }
            else if (error.status === 403) {
                errorMessage = 'Access forbidden - insufficient permissions';
            }
            else if (error.status === 404) {
                errorMessage = 'Resource not found';
            }
            else if (error.status >= 500) {
                errorMessage = 'Server error occurred';
            }
            else {
                errorMessage = `Error: ${error.status} - ${error.statusText}`;
            }
        }
        console.error('Leave Request Management Service Error:', error);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.LeaveRequestManagementService = LeaveRequestManagementService;
exports.LeaveRequestManagementService = LeaveRequestManagementService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], LeaveRequestManagementService);
//# sourceMappingURL=leave-request-management.service.js.map