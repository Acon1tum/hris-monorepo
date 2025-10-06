import { EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
export declare class LoginComponent implements OnInit {
    private router;
    private activatedRoute;
    private authService;
    loginSuccess: EventEmitter<void>;
    loginData: {
        email: string;
        password: string;
        rememberMe: boolean;
    };
    isLoading: boolean;
    showPassword: boolean;
    errorMessage: string;
    sessionTimeoutMessage: string;
    constructor(router: Router, activatedRoute: ActivatedRoute, authService: AuthService);
    ngOnInit(): void;
    onLogin(): void;
    togglePasswordVisibility(): void;
    onForgotPassword(): void;
    onDemoLogin(role: string): void;
    openJobPortal(): void;
    goToJobPortalLogin(): void;
    onResetRateLimit(): void;
}
//# sourceMappingURL=login.component.d.ts.map