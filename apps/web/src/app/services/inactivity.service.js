"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InactivityService = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("./auth.service");
const environment_1 = require("../../environments/environment");
let InactivityService = class InactivityService {
    authService;
    router;
    ngZone;
    INACTIVITY_TIMEOUT = environment_1.environment.session.inactivityTimeout;
    WARNING_TIME = environment_1.environment.session.warningTime;
    CHECK_INTERVAL = environment_1.environment.session.checkInterval;
    isWarningShownSubject = new rxjs_1.BehaviorSubject(false);
    timeLeftSubject = new rxjs_1.BehaviorSubject(0);
    isActiveSubject = new rxjs_1.BehaviorSubject(true);
    isWarningShown$ = this.isWarningShownSubject.asObservable();
    timeLeft$ = this.timeLeftSubject.asObservable();
    isActive$ = this.isActiveSubject.asObservable();
    lastActivity = Date.now();
    warningTimer;
    checkTimer;
    isInitialized = false;
    constructor(authService, router, ngZone) {
        this.authService = authService;
        this.router = router;
        this.ngZone = ngZone;
    }
    initialize() {
        if (this.isInitialized)
            return;
        this.isInitialized = true;
        this.setupActivityListeners();
        this.startInactivityCheck();
        this.resetTimer();
    }
    destroy() {
        this.isInitialized = false;
        this.stopTimers();
        this.isWarningShownSubject.next(false);
        this.isActiveSubject.next(true);
    }
    resetTimer() {
        this.lastActivity = Date.now();
        this.isWarningShownSubject.next(false);
        this.isActiveSubject.next(true);
        // Clear existing warning timer
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
        }
        // Set new warning timer
        this.warningTimer = setTimeout(() => {
            this.showWarning();
        }, this.INACTIVITY_TIMEOUT - this.WARNING_TIME);
    }
    extendSession() {
        this.resetTimer();
    }
    getTimeUntilWarning() {
        const timeSinceLastActivity = Date.now() - this.lastActivity;
        const timeUntilWarning = (this.INACTIVITY_TIMEOUT - this.WARNING_TIME) - timeSinceLastActivity;
        return Math.max(0, timeUntilWarning);
    }
    getTimeUntilLogout() {
        const timeSinceLastActivity = Date.now() - this.lastActivity;
        const timeUntilLogout = this.INACTIVITY_TIMEOUT - timeSinceLastActivity;
        return Math.max(0, timeUntilLogout);
    }
    setupActivityListeners() {
        const events = [
            'mousedown',
            'mousemove',
            'keypress',
            'scroll',
            'touchstart',
            'click'
        ];
        const eventStreams = events.map(event => (0, rxjs_1.fromEvent)(document, event));
        (0, rxjs_1.merge)(...eventStreams)
            .pipe((0, operators_1.debounceTime)(500) // Debounce to avoid excessive resets
        )
            .subscribe(() => {
            this.ngZone.run(() => {
                this.resetTimer();
            });
        });
    }
    startInactivityCheck() {
        this.checkTimer = setInterval(() => {
            this.ngZone.run(() => {
                const timeUntilLogout = this.getTimeUntilLogout();
                if (timeUntilLogout <= 0) {
                    this.performLogout();
                }
                else if (timeUntilLogout <= this.WARNING_TIME) {
                    this.timeLeftSubject.next(Math.ceil(timeUntilLogout / 1000));
                    if (!this.isWarningShownSubject.value) {
                        this.showWarning();
                    }
                }
            });
        }, this.CHECK_INTERVAL);
    }
    showWarning() {
        this.isWarningShownSubject.next(true);
        this.isActiveSubject.next(false);
    }
    performLogout() {
        this.stopTimers();
        // Get current user before logout
        const currentUser = this.authService.getCurrentUser();
        const isApplicant = currentUser && currentUser.role === 'Applicant';
        this.authService.logout('session_timeout');
        // Redirect based on user role
        if (isApplicant) {
            this.router.navigate(['/online-job-login'], {
                queryParams: { reason: 'session_timeout' }
            });
        }
        else {
            this.router.navigate(['/login'], {
                queryParams: { reason: 'session_timeout' }
            });
        }
    }
    stopTimers() {
        if (this.warningTimer) {
            clearTimeout(this.warningTimer);
            this.warningTimer = undefined;
        }
        if (this.checkTimer) {
            clearInterval(this.checkTimer);
            this.checkTimer = undefined;
        }
    }
    // Public methods for manual control
    forceLogout() {
        this.performLogout();
    }
    isUserActive() {
        return this.isActiveSubject.value;
    }
    getInactivityTime() {
        return Date.now() - this.lastActivity;
    }
    // Configuration methods
    setInactivityTimeout(milliseconds) {
        // This would typically be called from a settings service
        // For now, this is just a placeholder for future enhancement
        console.warn('Dynamic timeout configuration not implemented yet');
    }
};
exports.InactivityService = InactivityService;
exports.InactivityService = InactivityService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router,
        core_1.NgZone])
], InactivityService);
//# sourceMappingURL=inactivity.service.js.map