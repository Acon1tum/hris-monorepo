import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface JobPosting {
    id?: string;
    position_title: string;
    department_id: string;
    job_description: string;
    qualifications: string;
    technical_competencies?: string;
    salary_range?: string;
    employment_type: string;
    num_vacancies: number;
    application_deadline: string;
    posting_status: string;
    created_by?: string;
    created_at?: string;
    department?: {
        id: string;
        department_name: string;
    };
    created_by_user?: {
        id: string;
        username: string;
        email: string;
    };
    _count?: {
        job_applications: number;
    };
}
export interface Department {
    id: string;
    department_name: string;
    description?: string;
}
export interface SalaryRange {
    id: string;
    range: string;
    min: number;
    max: number | null;
}
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
export declare class JobPortalManagementService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    getAllJobPostings(page?: number, limit?: number, filters?: any): Observable<ApiResponse<JobPosting[]>>;
    getAllJobPostingsUnlimited(): Observable<ApiResponse<JobPosting[]>>;
    getJobPosting(id: string): Observable<ApiResponse<JobPosting>>;
    createJobPosting(job: Partial<JobPosting>): Observable<ApiResponse<JobPosting>>;
    updateJobPosting(id: string, job: Partial<JobPosting>): Observable<ApiResponse<JobPosting>>;
    deleteJobPosting(id: string): Observable<ApiResponse<any>>;
    updateJobPostingStatus(id: string, status: string): Observable<ApiResponse<JobPosting>>;
    getDepartments(): Observable<ApiResponse<Department[]>>;
    getSalaryRanges(): Observable<ApiResponse<SalaryRange[]>>;
}
//# sourceMappingURL=job-portal-management.service.d.ts.map