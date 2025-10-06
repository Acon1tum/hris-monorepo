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
exports.SessionWarningDialogComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const inactivity_service_1 = require("../../../services/inactivity.service");
let SessionWarningDialogComponent = class SessionWarningDialogComponent {
    inactivityService;
    isVisible = false;
    timeLeft = 0;
    subscriptions = [];
    constructor(inactivityService) {
        this.inactivityService = inactivityService;
    }
    ngOnInit() {
        this.subscriptions.push(this.inactivityService.isWarningShown$.subscribe(isShowing => {
            this.isVisible = isShowing;
        }));
        this.subscriptions.push(this.inactivityService.timeLeft$.subscribe(timeLeft => {
            this.timeLeft = timeLeft;
        }));
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    extendSession() {
        this.inactivityService.extendSession();
    }
    logout() {
        this.inactivityService.forceLogout();
    }
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
};
exports.SessionWarningDialogComponent = SessionWarningDialogComponent;
exports.SessionWarningDialogComponent = SessionWarningDialogComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-session-warning-dialog',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './session-warning-dialog.component.html',
        styleUrls: ['./session-warning-dialog.component.scss']
    }),
    __metadata("design:paramtypes", [inactivity_service_1.InactivityService])
], SessionWarningDialogComponent);
//# sourceMappingURL=session-warning-dialog.component.js.map