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
exports.HeaderComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const auth_service_1 = require("../../services/auth.service");
const forms_1 = require("@angular/forms");
let HeaderComponent = class HeaderComponent {
    authService;
    router;
    isSidebarOpen = false;
    isSidebarCollapsed = false;
    isSidebarOpenInput = true;
    publicMode = false;
    currentUser$;
    userMenuItems = [
        { name: 'Profile', icon: 'person', action: 'profile' },
        { name: 'Settings', icon: 'settings', action: 'settings' },
        { name: 'Logout', icon: 'logout', action: 'logout' }
    ];
    notifications = [
        { id: '1', message: 'New leave request pending', time: '2 min ago', type: 'info' },
        { id: '2', message: 'Payroll processed successfully', time: '1 hour ago', type: 'success' },
        { id: '3', message: 'System maintenance scheduled', time: '3 hours ago', type: 'warning' }
    ];
    showUserMenu = false;
    showNotifications = false;
    searchText = '';
    isOnline = true;
    isMobile = window.innerWidth <= 768;
    toggleSidebar = new core_1.EventEmitter();
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.currentUser$ = this.authService.currentUser$;
    }
    onResize() {
        this.isMobile = window.innerWidth <= 768;
    }
    toggleUserMenu() {
        this.showUserMenu = !this.showUserMenu;
        this.showNotifications = false;
    }
    toggleNotifications() {
        this.showNotifications = !this.showNotifications;
        this.showUserMenu = false;
    }
    clearAllNotifications() {
        this.notifications = [];
        this.showNotifications = false;
    }
    removeNotification(id) {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
    }
    onUserAction(action) {
        console.log('User action:', action);
        this.showUserMenu = false;
        if (action === 'logout') {
            // Get current user before logout
            const currentUser = this.authService.getCurrentUser();
            const isApplicant = currentUser && currentUser.role === 'Applicant';
            this.authService.logout();
            // Redirect based on user role
            if (isApplicant) {
                this.router.navigate(['/online-job-login']);
            }
            else {
                this.router.navigate(['/login']);
            }
        }
    }
    onNotificationClick(notification) {
        console.log('Notification clicked:', notification);
        this.showNotifications = false;
    }
    clearSearch() {
        this.searchText = '';
    }
    onSearchInput() {
        // Optionally, implement search logic here
    }
    ngOnInit() {
        // Initialization logic can go here if needed
    }
    get headerClass() {
        return this.isSidebarCollapsed ? 'collapsed' : '';
    }
    /**
     * Returns the dynamic style object for the header based on sidebar state.
     */
    get headerDynamicStyle() {
        const margin = this.isMobile ? '0.5rem' : '1.5rem';
        // Get current user to check if they are an Applicant
        const currentUser = this.authService.getCurrentUser();
        const isApplicant = currentUser && (currentUser.role === 'Applicant' || currentUser.roles?.includes('Applicant'));
        // Adjust sidebar width based on user role
        const sidebarWidth = this.isSidebarCollapsed ? '80px' : (isApplicant ? '230px' : '290px');
        return {
            left: sidebarWidth,
            width: `calc(100vw - ${sidebarWidth} - (${margin} * 2))`,
            'max-width': `calc(100vw - ${sidebarWidth} - (${margin} * 2))`,
            'border-radius': this.isMobile ? '0 0 1.5rem 1.5rem' : '0 0 2rem 2rem',
            transition: 'left 0.3s cubic-bezier(.4,2,.6,1), width 0.3s cubic-bezier(.4,2,.6,1)',
        };
    }
    emitToggleSidebar() {
        this.toggleSidebar.emit();
    }
    goToLogin() {
        this.router.navigate(['/online-job-login']);
    }
    goToRegister() {
        this.router.navigate(['/online-job-register']);
    }
};
exports.HeaderComponent = HeaderComponent;
__decorate([
    (0, core_1.HostBinding)('class.sidebar-open'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isSidebarOpen", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isSidebarCollapsed", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isSidebarOpenInput", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "publicMode", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "toggleSidebar", void 0);
__decorate([
    (0, core_1.HostListener)('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HeaderComponent.prototype, "onResize", null);
exports.HeaderComponent = HeaderComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-header',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], HeaderComponent);
//# sourceMappingURL=header.component.js.map