import { JobApplicationForm } from './job-application-modal.component';
import { AuthService } from '../../../services/auth.service';
export declare class JobApplicationModalDemoComponent {
    private authService;
    showApplicationModal: boolean;
    showLoginPromptModal: boolean;
    selectedJob: any;
    constructor(authService: AuthService);
    openModal(): void;
    closeApplicationModal(): void;
    closeLoginPromptModal(): void;
    onLoginPromptContinue(): void;
    onApplicationSubmitted(applicationData: JobApplicationForm): void;
}
//# sourceMappingURL=job-application-modal-demo.component.d.ts.map