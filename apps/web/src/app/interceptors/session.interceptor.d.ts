import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InactivityService } from '../services/inactivity.service';
export declare class SessionInterceptor implements HttpInterceptor {
    private authService;
    private inactivityService;
    constructor(authService: AuthService, inactivityService: InactivityService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
//# sourceMappingURL=session.interceptor.d.ts.map