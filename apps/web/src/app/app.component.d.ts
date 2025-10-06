import { OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { InactivityService } from './services/inactivity.service';
export declare class AppComponent implements OnInit, OnDestroy {
    private authService;
    private inactivityService;
    title: string;
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    currentUser$: any;
    private subscriptions;
    features: {
        name: string;
        icon: string;
        route: string;
        description: string;
    }[];
    constructor(authService: AuthService, inactivityService: InactivityService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private checkScreenSize;
    onLoginSuccess(): void;
    onLogout(): void;
    toggleSidebar(): void;
    onSidebarStateChange(state: {
        isOpen: boolean;
        isCollapsed: boolean;
    }): void;
    isFeaturePage(): boolean;
    onSidebarCollapse(collapsed: boolean): void;
}
//# sourceMappingURL=app.component.d.ts.map