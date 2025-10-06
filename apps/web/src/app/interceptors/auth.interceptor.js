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
exports.AuthInterceptor = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const auth_service_1 = require("../services/auth.service");
const environment_1 = require("../../environments/environment");
let AuthInterceptor = class AuthInterceptor {
    authService;
    isRefreshing = false;
    refreshTokenSubject = new rxjs_1.BehaviorSubject(null);
    constructor(authService) {
        this.authService = authService;
    }
    intercept(request, next) {
        // Add auth header if token exists and request is to our API
        if (this.isApiUrl(request.url)) {
            request = this.addTokenHeader(request);
        }
        return next.handle(request).pipe((0, operators_1.catchError)((error) => {
            if (error.status === 401 && this.isApiUrl(request.url)) {
                return this.handle401Error(request, next);
            }
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    addTokenHeader(request) {
        const token = this.authService.getToken();
        if (token) {
            console.log('🔐 Adding auth token to request:', request.url);
            return request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }
        else {
            console.warn('❌ No token found for request:', request.url);
        }
        return request;
    }
    handle401Error(request, next) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            // Don't try to refresh on login/register endpoints
            if (this.isAuthEndpoint(request.url)) {
                this.authService.logout();
                return (0, rxjs_1.throwError)(() => new Error('Authentication failed'));
            }
            return this.authService.refreshToken().pipe((0, operators_1.switchMap)((token) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token);
                return next.handle(this.addTokenHeader(request));
            }), (0, operators_1.catchError)((error) => {
                this.isRefreshing = false;
                this.authService.logout();
                return (0, rxjs_1.throwError)(() => error);
            }));
        }
        return this.refreshTokenSubject.pipe((0, operators_1.filter)(token => token !== null), (0, operators_1.take)(1), (0, operators_1.switchMap)(() => next.handle(this.addTokenHeader(request))));
    }
    isApiUrl(url) {
        return url.startsWith(environment_1.environment.apiUrl);
    }
    isAuthEndpoint(url) {
        const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh-token'];
        return authEndpoints.some(endpoint => url.includes(endpoint));
    }
};
exports.AuthInterceptor = AuthInterceptor;
exports.AuthInterceptor = AuthInterceptor = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthInterceptor);
//# sourceMappingURL=auth.interceptor.js.map