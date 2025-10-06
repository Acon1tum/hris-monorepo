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
exports.PermissionGuard = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const auth_service_1 = require("../services/auth.service");
let PermissionGuard = class PermissionGuard {
    authService;
    router;
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        // Get required permissions from route data
        const requiredRoles = route.data['roles'] || [];
        // If no roles required, allow access (public route)
        if (requiredRoles.length === 0) {
            return true;
        }
        // Otherwise, require authentication
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }
        // Check if user has any of the required roles
        const hasRole = this.authService.hasAnyRole(requiredRoles);
        if (!hasRole) {
            // Redirect to user's appropriate dashboard based on their role
            const user = this.authService.getCurrentUser();
            if (user) {
                const landingPage = this.authService.getLandingPageByRole(user.role || 'User');
                this.router.navigate([landingPage]);
            }
            else {
                this.router.navigate(['/dashboard']);
            }
            return false;
        }
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map