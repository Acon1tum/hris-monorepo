import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobPortalAuthService } from '../job-portal-auth.service';
export declare class OnlineJobLoginComponent implements OnInit, AfterViewInit {
    private router;
    private activatedRoute;
    private jobPortalAuthService;
    lottieContainer: ElementRef;
    loginData: {
        email: string;
        password: string;
        rememberMe: boolean;
    };
    isLoading: boolean;
    showPassword: boolean;
    errorMessage: string | null;
    sessionTimeoutMessage: string | null;
    animationState: string;
    successMessage: string | null;
    constructor(router: Router, activatedRoute: ActivatedRoute, jobPortalAuthService: JobPortalAuthService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onLogin(): void;
    onDemoLogin(): void;
    togglePasswordVisibility(): void;
    onForgotPassword(): void;
    goToRegister(): void;
}
//# sourceMappingURL=online-job-login.component.d.ts.map