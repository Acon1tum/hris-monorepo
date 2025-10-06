import { Router } from '@angular/router';
export declare class RecruitmentComponent {
    private router;
    title: string;
    recruitmentStats: {
        label: string;
        value: string;
        icon: string;
        change: string;
        trend: string;
        color: string;
    }[];
    recruitmentFeatures: {
        name: string;
        description: string;
        icon: string;
        route: string;
        color: string;
        status: string;
    }[];
    recentActivities: {
        action: string;
        user: string;
        time: string;
        type: string;
        status: string;
    }[];
    quickActions: {
        name: string;
        icon: string;
        action: string;
        color: string;
    }[];
    constructor(router: Router);
    navigateToFeature(route: string): void;
    onQuickAction(action: string): void;
}
//# sourceMappingURL=index.component.d.ts.map