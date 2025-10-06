import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export interface UserDetails {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    contact_number?: string;
    phone?: string;
}
export interface UserDetailsResponse {
    success: boolean;
    data?: UserDetails;
    message?: string;
}
export declare class UserDetailsService {
    private http;
    private authService;
    constructor(http: HttpClient, authService: AuthService);
    /**
     * Fetch current user details from the database
     */
    getCurrentUserDetails(): Observable<UserDetails>;
    /**
     * Fetch user details by user ID
     */
    getUserDetailsById(userId: string): Observable<UserDetails>;
}
//# sourceMappingURL=user-details.service.d.ts.map