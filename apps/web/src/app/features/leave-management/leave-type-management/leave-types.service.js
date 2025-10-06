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
exports.LeaveTypesService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../../environments/environment");
let LeaveTypesService = class LeaveTypesService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/leave/types`;
    constructor(http) {
        this.http = http;
    }
    /**
     * Get all leave types
     */
    getLeaveTypes() {
        return this.http.get(this.apiUrl)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch leave types');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Create a new leave type
     */
    createLeaveType(leaveType) {
        return this.http.post(this.apiUrl, leaveType)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to create leave type');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Update an existing leave type
     */
    updateLeaveType(id, leaveType) {
        return this.http.put(`${this.apiUrl}/${id}`, leaveType)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to update leave type');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Delete a leave type (hard delete)
     */
    deleteLeaveType(id) {
        return this.http.delete(`${this.apiUrl}/${id}`)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to delete leave type');
            }
        }), (0, operators_1.catchError)(this.handleError));
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
                errorMessage = 'Leave type not found';
            }
            else if (error.status >= 500) {
                errorMessage = 'Server error occurred';
            }
            else {
                errorMessage = `Error: ${error.status} - ${error.statusText}`;
            }
        }
        console.error('Leave Types Service Error:', error);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.LeaveTypesService = LeaveTypesService;
exports.LeaveTypesService = LeaveTypesService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], LeaveTypesService);
//# sourceMappingURL=leave-types.service.js.map