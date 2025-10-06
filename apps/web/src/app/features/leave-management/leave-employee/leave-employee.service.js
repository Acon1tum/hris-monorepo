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
exports.LeaveEmployeeService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../../environments/environment");
let LeaveEmployeeService = class LeaveEmployeeService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/leave`;
    constructor(http) {
        this.http = http;
    }
    getLeaveTypes() {
        return this.http.get(`${this.apiUrl}/types`).pipe((0, operators_1.map)(res => {
            if (res.success)
                return res.data;
            throw new Error(res.message || 'Failed to fetch leave types');
        }), (0, operators_1.catchError)(this.handleError));
    }
    getMyLeaveBalance() {
        return this.http.get(`${this.apiUrl}/balance/my`).pipe((0, operators_1.map)(res => {
            if (res.success)
                return res.data;
            throw new Error(res.message || 'Failed to fetch leave balance');
        }), (0, operators_1.catchError)(this.handleError));
    }
    getMyLeaveApplications() {
        return this.http.get(`${this.apiUrl}/applications/my`).pipe((0, operators_1.map)(res => {
            if (res.success)
                return res.data;
            throw new Error(res.message || 'Failed to fetch leave applications');
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Create a leave application. If supporting_document is a File, use FormData. Otherwise, send JSON.
     * Never send personnel_id from the frontend; backend derives it from the logged-in user.
     */
    createLeaveApplication(data) {
        // Debug: Log outgoing payload
        console.log('[LeaveEmployeeService] Creating leave application with:', data);
        if (data.supporting_document && data.supporting_document instanceof File) {
            const formData = new FormData();
            formData.append('leave_type_id', data.leave_type_id);
            formData.append('start_date', data.start_date);
            formData.append('end_date', data.end_date);
            formData.append('total_days', data.total_days.toString());
            if (data.reason)
                formData.append('reason', data.reason);
            formData.append('supporting_document', data.supporting_document);
            return this.http.post(`${this.apiUrl}/applications`, formData).pipe((0, operators_1.map)(res => {
                if (res.success)
                    return res.data;
                throw new Error(res.message || 'Failed to create leave application');
            }), (0, operators_1.catchError)(this.handleError));
        }
        else {
            // Send as JSON
            const payload = {
                leave_type_id: data.leave_type_id,
                start_date: data.start_date,
                end_date: data.end_date,
                total_days: data.total_days,
                reason: data.reason || '',
                supporting_document: data.supporting_document || ''
            };
            // Debug: Log outgoing JSON payload
            console.log('[LeaveEmployeeService] JSON payload:', payload);
            return this.http.post(`${this.apiUrl}/applications`, payload).pipe((0, operators_1.map)(res => {
                if (res.success)
                    return res.data;
                throw new Error(res.message || 'Failed to create leave application');
            }), (0, operators_1.catchError)(this.handleError));
        }
    }
    cancelLeaveApplication(id) {
        return this.http.delete(`${this.apiUrl}/applications/${id}`).pipe((0, operators_1.map)(res => {
            if (res.success)
                return res.data;
            throw new Error(res.message || 'Failed to cancel leave application');
        }), (0, operators_1.catchError)(this.handleError));
    }
    handleError = (error) => {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        }
        else {
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
            else if (error.status === 0) {
                errorMessage = 'Unable to connect to server. Please check if the backend is running.';
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
                errorMessage = 'Server error occurred. Please make sure the database migration has been run.';
            }
            else {
                errorMessage = `Error: ${error.status} - ${error.statusText}`;
            }
        }
        console.error('Leave Employee Service Error:', error);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.LeaveEmployeeService = LeaveEmployeeService;
exports.LeaveEmployeeService = LeaveEmployeeService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], LeaveEmployeeService);
//# sourceMappingURL=leave-employee.service.js.map