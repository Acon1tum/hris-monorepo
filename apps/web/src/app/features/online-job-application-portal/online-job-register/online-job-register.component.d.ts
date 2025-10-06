import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobPortalAuthService } from '../job-portal-auth.service';
export declare class OnlineJobRegisterComponent implements OnInit {
    private router;
    private activatedRoute;
    private jobPortalAuthService;
    registerData: {
        firstName: string;
        lastName: string;
        middleName: string;
        suffix: string;
        gender: string;
        civilStatus: string;
        contactNumber: string;
        email: string;
        password: string;
        confirmPassword: string;
        agreeTerms: boolean;
        currentEmployer: string;
        highestEducation: string;
    };
    isLoading: boolean;
    showPassword: boolean;
    errorMessage: string;
    animationState: string;
    constructor(router: Router, activatedRoute: ActivatedRoute, jobPortalAuthService: JobPortalAuthService);
    ngOnInit(): void;
    onRegister(): void;
    togglePasswordVisibility(): void;
    goToLogin(): void;
}
//# sourceMappingURL=online-job-register.component.d.ts.map