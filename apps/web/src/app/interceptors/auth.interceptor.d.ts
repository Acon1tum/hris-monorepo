import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
export declare class AuthInterceptor implements HttpInterceptor {
    private authService;
    private isRefreshing;
    private refreshTokenSubject;
    constructor(authService: AuthService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private addTokenHeader;
    private handle401Error;
    private isApiUrl;
    private isAuthEndpoint;
}
//# sourceMappingURL=auth.interceptor.d.ts.map