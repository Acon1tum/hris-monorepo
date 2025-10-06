import { OnInit, OnDestroy } from '@angular/core';
import { InactivityService } from '../../../services/inactivity.service';
export declare class SessionWarningDialogComponent implements OnInit, OnDestroy {
    private inactivityService;
    isVisible: boolean;
    timeLeft: number;
    private subscriptions;
    constructor(inactivityService: InactivityService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    extendSession(): void;
    logout(): void;
    formatTime(seconds: number): string;
}
//# sourceMappingURL=session-warning-dialog.component.d.ts.map