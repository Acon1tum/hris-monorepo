"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../../environments/environment");
let LeaveBalanceService = class LeaveBalanceService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/leave`;
    constructor(http) {
        this.http = http;
    }
    /**
     * Get leave balance report with filters
     */
    getLeaveBalanceReport(filters = {}) {
        let params = new http_1.HttpParams();
        if (filters.department_id) {
            params = params.set('department_id', filters.department_id);
        }
        if (filters.year) {
            params = params.set('year', filters.year);
        }
        // Add pagination parameters
        params = params.set('page', '1');
        params = params.set('limit', '1000'); // Get all records for now, pagination will be handled in frontend
        return this.http.get(`${this.apiUrl}/reports/balance`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return this.transformLeaveBalances(response.data);
            }
            else {
                throw new Error(response.message || 'Failed to fetch leave balance report');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get my leave balance
     */
    getMyLeaveBalance() {
        return this.http.get(`${this.apiUrl}/balance/my`)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch my leave balance');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get personnel leave balance
     */
    getPersonnelLeaveBalance(personnelId, year) {
        let params = new http_1.HttpParams();
        if (year) {
            params = params.set('year', year);
        }
        return this.http.get(`${this.apiUrl}/balance/${personnelId}`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to fetch personnel leave balance');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Initialize leave balances
     */
    initializeLeaveBalance(personnelId) {
        return this.http.post(`${this.apiUrl}/balance/initialize`, {
            personnel_id: personnelId,
            year: new Date().getFullYear().toString(),
            leave_type_id: '', // This will be set by the backend
            total_credits: 0 // This will be set by the backend
        }).pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to initialize leave balance');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Preview bulk initialize leave balances for all personnel without credits
     */
    previewBulkInitializeLeaveBalances(year) {
        const currentYear = year || new Date().getFullYear().toString();
        const params = new http_1.HttpParams().set('year', currentYear);
        return this.http.get(`${this.apiUrl}/balance/bulk-initialize-preview`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to preview bulk initialize leave balances');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Bulk initialize leave balances for all personnel without credits
     */
    bulkInitializeLeaveBalances(year) {
        const currentYear = year || new Date().getFullYear().toString();
        return this.http.post(`${this.apiUrl}/balance/bulk-initialize`, {
            year: currentYear
        }).pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to bulk initialize leave balances');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Create leave credit adjustment
     */
    createLeaveAdjustment(adjustmentRequest) {
        return this.http.post(`${this.apiUrl}/adjustments`, adjustmentRequest)
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return response.data;
            }
            else {
                throw new Error(response.message || 'Failed to create leave adjustment');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get leave adjustments
     */
    getLeaveAdjustments(filters = {}) {
        let params = new http_1.HttpParams();
        Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (value !== undefined && value !== null && value !== '') {
                params = params.set(key, value.toString());
            }
        });
        return this.http.get(`${this.apiUrl}/adjustments`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return {
                    adjustments: response.data,
                    pagination: response.pagination || {}
                };
            }
            else {
                throw new Error(response.message || 'Failed to fetch leave adjustments');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get personnel adjustments
     */
    getPersonnelAdjustments(personnelId, year) {
        let params = new http_1.HttpParams();
        if (year) {
            params = params.set('year', year);
        }
        return this.http.get(`${this.apiUrl}/adjustments/${personnelId}`, { params })
            .pipe((0, operators_1.map)(response => {
            if (response.success) {
                return {
                    adjustments: response.data,
                    pagination: response.pagination || {}
                };
            }
            else {
                throw new Error(response.message || 'Failed to fetch personnel adjustments');
            }
        }), (0, operators_1.catchError)(this.handleError));
    }
    /**
     * Get departments for filtering
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
     * Get leave types
     */
    getLeaveTypes() {
        return this.http.get(`${this.apiUrl}/types`)
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
     * Transform leave balances grouped by employee
     */
    transformLeaveBalances(leaveBalances) {
        const employeeMap = new Map();
        leaveBalances.forEach(balance => {
            const employeeId = balance.personnel.id;
            const employeeName = `${balance.personnel.first_name} ${balance.personnel.last_name}`;
            const department = balance.personnel.department?.department_name || 'Unknown Department';
            if (!employeeMap.has(employeeId)) {
                employeeMap.set(employeeId, {
                    id: employeeId,
                    name: employeeName,
                    department: department,
                    leave_balances: [],
                    total_accrued: 0,
                    total_used: 0,
                    total_remaining: 0
                });
            }
            const employee = employeeMap.get(employeeId);
            employee.leave_balances.push(balance);
            employee.total_accrued += balance.total_credits;
            employee.total_used += balance.used_credits;
            employee.total_remaining += (balance.total_credits - balance.used_credits);
        });
        return Array.from(employeeMap.values()).sort((a, b) => a.department.localeCompare(b.department) || a.name.localeCompare(b.name));
    }
    /**
     * Export to CSV
     */
    exportToCSV(data) {
        const csvData = this.prepareCSVData(data);
        const csvContent = this.convertToCSV(csvData);
        this.downloadFile(csvContent, 'leave-balances.csv', 'text/csv');
    }
    /**
     * Export to PDF
     */
    exportToPDF(data) {
        // Import jsPDF dynamically
        Promise.resolve().then(() => __importStar(require('jspdf'))).then(({ jsPDF }) => {
            Promise.resolve().then(() => __importStar(require('jspdf-autotable'))).then(() => {
                const doc = new jsPDF();
                // Add title
                doc.setFontSize(16);
                doc.text('Leave Balance Report', 20, 20);
                // Add date
                doc.setFontSize(10);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
                // Prepare table data
                const tableData = data.map(employee => [
                    employee.name,
                    employee.department,
                    employee.total_accrued.toString(),
                    employee.total_used.toString(),
                    employee.total_remaining.toString()
                ]);
                // Add table
                doc.autoTable({
                    head: [['Employee', 'Department', 'Total Credits', 'Used Credits', 'Remaining']],
                    body: tableData,
                    startY: 40,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 2
                    },
                    headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: 255
                    }
                });
                // Save the PDF
                doc.save('leave-balances.pdf');
            });
        });
    }
    /**
     * Prepare CSV data
     */
    prepareCSVData(data) {
        const csvData = [];
        // Add header
        csvData.push({
            'Employee Name': 'Employee Name',
            'Department': 'Department',
            'Total Credits': 'Total Credits',
            'Used Credits': 'Used Credits',
            'Remaining Credits': 'Remaining Credits'
        });
        // Add employee data
        data.forEach(employee => {
            csvData.push({
                'Employee Name': employee.name,
                'Department': employee.department,
                'Total Credits': employee.total_accrued,
                'Used Credits': employee.total_used,
                'Remaining Credits': employee.total_remaining
            });
        });
        return csvData;
    }
    /**
     * Convert data to CSV format
     */
    convertToCSV(data) {
        if (!data || data.length === 0)
            return '';
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.slice(1).map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');
        return csvContent;
    }
    /**
     * Download file
     */
    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
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
        console.error('Leave Balance Service Error:', error);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.LeaveBalanceService = LeaveBalanceService;
exports.LeaveBalanceService = LeaveBalanceService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], LeaveBalanceService);
//# sourceMappingURL=leave-balance.service.js.map