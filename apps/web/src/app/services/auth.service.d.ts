import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth.interface';
export declare class AuthService {
    private http;
    private currentUserSubject;
    currentUser$: Observable<User | null>;
    constructor(http: HttpClient);
    private loadUserFromStorage;
    private enhanceUserData;
    private generateAvatarUrl;
    login(email: string, password: string): Observable<User>;
    logout(reason?: string): void;
    getCurrentUser(): User | null;
    setCurrentUser(user: User): void;
    isAuthenticated(): boolean;
    getToken(): string | null;
    getAndClearLogoutReason(): string | null;
    hasRole(role: string): boolean;
    hasAnyRole(roles: string[]): boolean;
    /**
     * Get the appropriate landing page based on user role
     */
    getLandingPageByRole(role: string): string;
    /**
     * Get the appropriate landing page for the current user
     */
    getCurrentUserLandingPage(): string;
    refreshToken(): Observable<string>;
    changePassword(currentPassword: string, newPassword: string): Observable<any>;
    demoLogin(role: string): Observable<User>;
    /**
     * Get retry information for rate limited requests
     * @param retryAfterSeconds - Retry-After header value in seconds
     * @returns Object with retry information
     */
    getRetryInfo(retryAfterSeconds?: number): {
        canRetry: boolean;
        retryAfter: Date;
        message: string;
    };
    /**
     * Clear any stored rate limiting information
     * This can be called when a user wants to reset their session
     */
    clearRateLimitInfo(): Observable<any>;
    private handleError;
}
//# sourceMappingURL=auth.service.d.ts.map