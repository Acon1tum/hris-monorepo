import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface JobPosting {
    id: string;
    position_title: string;
    department_id: string;
    department?: {
        department_name: string;
    };
    job_description: string;
    qualifications: string;
    technical_competencies: string;
    salary_range: string;
    employment_type: string;
    num_vacancies: number;
    application_deadline: string;
    posting_status: string;
    created_at: string;
    updated_at: string;
}
export interface SalaryRange {
    range: string;
    count: number;
    value?: string;
    label?: string;
}
export interface JobFilters {
    keywords?: string;
    department?: string;
    salary_range?: string;
}
export declare class JobPortalService {
    private http;
    private currentApplicantSubject;
    currentApplicant$: Observable<any>;
    constructor(http: HttpClient);
    getJobs(filters?: JobFilters): Observable<JobPosting[]>;
    getJob(id: string): Observable<JobPosting>;
    getSalaryRanges(): Observable<string[]>;
    getDepartments(): Observable<string[]>;
    applyToJob(jobId: string, applicationData: any): Observable<any>;
    getCurrentApplicant(): any;
    setCurrentApplicant(applicant: any): void;
    isAuthenticated(): boolean;
    getToken(): string | null;
    logout(): void;
}
//# sourceMappingURL=job-portal.service.d.ts.map