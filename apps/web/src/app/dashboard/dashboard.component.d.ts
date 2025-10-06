import { OnInit } from '@angular/core';
export declare class DashboardComponent implements OnInit {
    isSidebarCollapsed: boolean;
    isSidebarOpen: boolean;
    title: string;
    dashboardStats: {
        label: string;
        value: string;
        icon: string;
        change: string;
        trend: string;
    }[];
    recentActivities: {
        action: string;
        user: string;
        time: string;
        type: string;
    }[];
    quickActions: {
        name: string;
        icon: string;
        route: string;
    }[];
    ngOnInit(): void;
    onSidebarStateChange(state: {
        isOpen: boolean;
        isCollapsed: boolean;
    }): void;
}
//# sourceMappingURL=dashboard.component.d.ts.map