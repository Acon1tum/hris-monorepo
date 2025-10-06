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
exports.SessionInterceptor = void 0;
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("../services/auth.service");
const inactivity_service_1 = require("../services/inactivity.service");
let SessionInterceptor = class SessionInterceptor {
    authService;
    inactivityService;
    constructor(authService, inactivityService) {
        this.authService = authService;
        this.inactivityService = inactivityService;
    }
    intercept(req, next) {
        // Don't add auth header here - let AuthInterceptor handle it
        // Just handle session management
        // Reset inactivity timer on API calls (user activity)
        if (this.authService.isAuthenticated()) {
            this.inactivityService.resetTimer();
        }
        return next.handle(req).pipe((0, operators_1.tap)({
            error: (error) => {
                if (error.status === 401 && this.authService.isAuthenticated()) {
                    // Token expired or invalid, logout user
                    this.authService.logout('session_expired');
                }
            }
        }));
    }
};
exports.SessionInterceptor = SessionInterceptor;
exports.SessionInterceptor = SessionInterceptor = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        inactivity_service_1.InactivityService])
], SessionInterceptor);
//# sourceMappingURL=session.interceptor.js.map