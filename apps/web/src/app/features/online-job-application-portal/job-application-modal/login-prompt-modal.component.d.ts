import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
export declare class LoginPromptModalComponent {
    private router;
    job: any;
    showModal: boolean;
    close: EventEmitter<void>;
    continueToLogin: EventEmitter<void>;
    constructor(router: Router);
    closeModal(): void;
    navigateToLogin(): void;
}
//# sourceMappingURL=login-prompt-modal.component.d.ts.map