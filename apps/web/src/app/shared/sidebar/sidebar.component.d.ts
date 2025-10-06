import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from '../../interfaces/auth.interface';
export declare class SidebarComponent implements OnInit, OnDestroy {
    private authService;
    private router;
    isOpen: boolean;
    isCollapsed: boolean;
    isSidebarCollapsed: boolean;
    stateChange: EventEmitter<{
        isOpen: boolean;
        isCollapsed: boolean;
    }>;
    menuItems: MenuItem[];
    currentUser$: any;
    expandedItem: string | null;
    isMobile: boolean;
    tooltip: {
        visible: boolean;
        text: string;
        x: number;
        y: number;
    };
    appLinks: {
        name: string;
        icon: string;
    }[];
    menuItemsByRole: {
        [role: string]: MenuItem[];
    };
    get currentMenuItems(): MenuItem[];
    private userSub;
    constructor(authService: AuthService, router: Router);
    onResize(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateMenuItems;
    toggleMenuItem(itemName: string, event: Event): void;
    isMenuItemExpanded(itemName: string): boolean;
    onMenuItemClick(): void;
    logout(): void;
    showTooltip(event: MouseEvent, text: string): void;
    moveTooltip(event: MouseEvent): void;
    hideTooltip(): void;
    private setTooltipPosition;
    private emitStateChange;
}
//# sourceMappingURL=sidebar.component.d.ts.map