export declare class DashboardComponent {
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
        action: string;
    }[];
    onQuickAction(action: string): void;
}
//# sourceMappingURL=dashboard.component.d.ts.map