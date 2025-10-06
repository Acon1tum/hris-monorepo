import { OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
interface Notification {
    id: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'info';
}
export declare class HeaderComponent implements OnInit {
    private authService;
    private router;
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    isSidebarOpenInput: boolean;
    publicMode: boolean;
    currentUser$: any;
    userMenuItems: {
        name: string;
        icon: string;
        action: string;
    }[];
    notifications: Notification[];
    showUserMenu: boolean;
    showNotifications: boolean;
    searchText: string;
    isOnline: boolean;
    isMobile: boolean;
    toggleSidebar: EventEmitter<void>;
    constructor(authService: AuthService, router: Router);
    onResize(): void;
    toggleUserMenu(): void;
    toggleNotifications(): void;
    clearAllNotifications(): void;
    removeNotification(id: string): void;
    onUserAction(action: string): void;
    onNotificationClick(notification: Notification): void;
    clearSearch(): void;
    onSearchInput(): void;
    ngOnInit(): void;
    get headerClass(): "" | "collapsed";
    /**
     * Returns the dynamic style object for the header based on sidebar state.
     */
    get headerDynamicStyle(): {
        left: string;
        width: string;
        'max-width': string;
        'border-radius': string;
        transition: string;
    };
    emitToggleSidebar(): void;
    goToLogin(): void;
    goToRegister(): void;
}
export {};
//# sourceMappingURL=header.component.d.ts.map