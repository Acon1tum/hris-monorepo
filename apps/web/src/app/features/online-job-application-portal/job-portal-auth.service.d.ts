import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/auth.interface';
export interface JobApplicant {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone: string;
    current_employer?: string;
    highest_education?: string;
    resume_path?: string;
    is_existing_employee: boolean;
    application_date: string;
}
export interface JobPortalLoginResponse {
    success: boolean;
    token?: string;
    data?: {
        user: User;
        applicant: JobApplicant;
    };
    message?: string;
}
export declare class JobPortalAuthService {
    private http;
    private authService;
    private currentApplicantSubject;
    currentApplicant$: Observable<JobApplicant | null>;
    constructor(http: HttpClient, authService: AuthService);
    login(email: string, password: string): Observable<JobApplicant>;
    logout(): void;
    isAuthenticated(): boolean;
    getToken(): string | null;
    getCurrentApplicant(): JobApplicant | null;
    getCurrentApplicantProfile(): Observable<JobApplicant>;
    register(registrationData: any): Observable<any>;
    getProfile(applicantId: string): Observable<JobApplicant>;
    updateProfile(applicantId: string, updateData: any): Observable<JobApplicant>;
}
//# sourceMappingURL=job-portal-auth.service.d.ts.map