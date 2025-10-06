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
exports.JobPortalManagementService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const environment_1 = require("src/environments/environment");
let JobPortalManagementService = class JobPortalManagementService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/job-portal`;
    constructor(http) {
        this.http = http;
    }
    // Get all job postings
    getAllJobPostings(page = 1, limit = 100, filters) {
        let params = `?page=${page}&limit=${limit}`;
        if (filters) {
            if (filters.status)
                params += `&status=${filters.status}`;
            if (filters.department_id)
                params += `&department_id=${filters.department_id}`;
            if (filters.search)
                params += `&search=${filters.search}`;
        }
        // Add all=true parameter to get all jobs without pagination
        params += '&all=true';
        return this.http.get(`${this.apiUrl}/jobs${params}`);
    }
    // Get all job postings without any limits (for testing)
    getAllJobPostingsUnlimited() {
        const params = '?all=true&limit=10000'; // Very high limit to get all jobs
        return this.http.get(`${this.apiUrl}/jobs${params}`);
    }
    // ===== GET JOB POSTING BY ID =====
    getJobPosting(id) {
        console.log('Service: Getting job posting by ID:', id);
        return this.http.get(`${this.apiUrl}/jobs/${id}`);
    }
    // ===== CREATE JOB POSTING =====
    createJobPosting(job) {
        console.log('Service: Creating new job posting');
        console.log('Job data:', job);
        return this.http.post(`${this.apiUrl}/jobs`, job);
    }
    // ===== UPDATE JOB POSTING =====
    updateJobPosting(id, job) {
        console.log('Service: Updating job posting');
        console.log('Job ID:', id);
        console.log('Update data:', job);
        return this.http.put(`${this.apiUrl}/jobs/${id}`, job);
    }
    // ===== DELETE JOB POSTING =====
    deleteJobPosting(id) {
        console.log('Service: Deleting job posting');
        console.log('Job ID:', id);
        return this.http.delete(`${this.apiUrl}/jobs/${id}`);
    }
    // ===== UPDATE JOB POSTING STATUS =====
    updateJobPostingStatus(id, status) {
        console.log('Service: Updating job posting status');
        console.log('Job ID:', id, 'New status:', status);
        return this.http.patch(`${this.apiUrl}/jobs/${id}/status`, { status });
    }
    // ===== GET DEPARTMENTS =====
    getDepartments() {
        console.log('Service: Getting departments');
        console.log('Request URL:', `${this.apiUrl}/departments`);
        return this.http.get(`${this.apiUrl}/departments`);
    }
    // ===== GET SALARY RANGES =====
    getSalaryRanges() {
        console.log('Service: Getting salary ranges');
        console.log('Request URL:', `${this.apiUrl}/salary-ranges`);
        return this.http.get(`${this.apiUrl}/salary-ranges`);
    }
};
exports.JobPortalManagementService = JobPortalManagementService;
exports.JobPortalManagementService = JobPortalManagementService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], JobPortalManagementService);
//# sourceMappingURL=job-portal-management.service.js.map