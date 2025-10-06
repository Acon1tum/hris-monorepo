import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export declare class InactivityService {
    private authService;
    private router;
    private ngZone;
    private readonly INACTIVITY_TIMEOUT;
    private readonly WARNING_TIME;
    private readonly CHECK_INTERVAL;
    private isWarningShownSubject;
    private timeLeftSubject;
    private isActiveSubject;
    isWarningShown$: Observable<boolean>;
    timeLeft$: Observable<number>;
    isActive$: Observable<boolean>;
    private lastActivity;
    private warningTimer?;
    private checkTimer?;
    private isInitialized;
    constructor(authService: AuthService, router: Router, ngZone: NgZone);
    initialize(): void;
    destroy(): void;
    resetTimer(): void;
    extendSession(): void;
    getTimeUntilWarning(): number;
    getTimeUntilLogout(): number;
    private setupActivityListeners;
    private startInactivityCheck;
    private showWarning;
    private performLogout;
    private stopTimers;
    forceLogout(): void;
    isUserActive(): boolean;
    getInactivityTime(): number;
    setInactivityTimeout(milliseconds: number): void;
}
//# sourceMappingURL=inactivity.service.d.ts.map