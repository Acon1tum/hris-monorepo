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
exports.JobPortalService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../environments/environment");
let JobPortalService = class JobPortalService {
    http;
    currentApplicantSubject = new rxjs_1.BehaviorSubject(null);
    currentApplicant$ = this.currentApplicantSubject.asObservable();
    constructor(http) {
        this.http = http;
    }
    // Get all published job postings
    getJobs(filters) {
        let url = `${environment_1.environment.apiUrl}/job-applications/jobs`;
        if (filters) {
            const params = new URLSearchParams();
            if (filters.keywords)
                params.append('keywords', filters.keywords);
            if (filters.department)
                params.append('department', filters.department);
            if (filters.salary_range)
                params.append('salary_range', filters.salary_range);
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
        }
        return this.http.get(url)
            .pipe((0, operators_1.map)(response => response.data || []));
    }
    // Get a specific job posting
    getJob(id) {
        return this.http.get(`${environment_1.environment.apiUrl}/job-applications/jobs/${id}`)
            .pipe((0, operators_1.map)(response => response.data));
    }
    // Get salary ranges
    getSalaryRanges() {
        return this.http.get(`${environment_1.environment.apiUrl}/job-applications/salary-ranges`)
            .pipe((0, operators_1.map)(response => response.data || []));
    }
    // Get departments
    getDepartments() {
        return this.http.get(`${environment_1.environment.apiUrl}/job-applications/departments`)
            .pipe((0, operators_1.map)(response => response.data || []));
    }
    // Apply to a job
    applyToJob(jobId, applicationData) {
        return this.http.post(`${environment_1.environment.apiUrl}/job-applications/applications`, {
            position_id: jobId,
            ...applicationData
        });
    }
    // Get current applicant
    getCurrentApplicant() {
        return this.currentApplicantSubject.value;
    }
    // Set current applicant
    setCurrentApplicant(applicant) {
        this.currentApplicantSubject.next(applicant);
    }
    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('hris_token');
        return !!token;
    }
    // Get authentication token
    getToken() {
        return localStorage.getItem('hris_token');
    }
    // Logout
    logout() {
        localStorage.removeItem('hris_token');
        localStorage.removeItem('hris_user');
        this.currentApplicantSubject.next(null);
    }
};
exports.JobPortalService = JobPortalService;
exports.JobPortalService = JobPortalService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], JobPortalService);
//# sourceMappingURL=job-portal.service.js.map