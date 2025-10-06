"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const router_1 = require("@angular/router");
const http_1 = require("@angular/common/http");
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const app_routes_1 = require("./app.routes");
const auth_service_1 = require("./services/auth.service");
const inactivity_service_1 = require("./services/inactivity.service");
const environment_1 = require("../environments/environment");
const PUBLIC_URLS = [
    '/job-portal/register',
    '/job-portal/login',
    '/auth/login',
    '/auth/register'
];
// Create functional interceptors for Angular 18+
const authInterceptor = (req, next) => {
    const authService = (0, core_1.inject)(auth_service_1.AuthService);
    // Check if this is a public URL that doesn't need authentication
    const isPublicUrl = PUBLIC_URLS.some(url => req.url.includes(url));
    // Only add auth header for API requests that are not public
    if (req.url.startsWith(environment_1.environment.apiUrl) && !isPublicUrl) {
        const token = authService.getToken();
        if (token) {
            console.log('🔐 Adding auth token to request:', req.url);
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next(authReq);
        }
        else {
            console.warn('❌ No token found for request:', req.url);
        }
    }
    return next(req);
};
const sessionInterceptor = (req, next) => {
    const authService = (0, core_1.inject)(auth_service_1.AuthService);
    const inactivityService = (0, core_1.inject)(inactivity_service_1.InactivityService);
    // Reset inactivity timer on API calls (user activity)
    if (authService.isAuthenticated()) {
        inactivityService.resetTimer();
    }
    return next(req);
};
exports.appConfig = {
    providers: [
        (0, router_1.provideRouter)(app_routes_1.routes),
        (0, platform_browser_1.provideClientHydration)(),
        (0, http_1.provideHttpClient)((0, http_1.withInterceptors)([authInterceptor, sessionInterceptor]))
    ]
};
//# sourceMappingURL=app.config.js.map