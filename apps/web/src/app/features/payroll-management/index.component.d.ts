import { Router } from '@angular/router';
export declare class PayrollManagementComponent {
    private router;
    title: string;
    constructor(router: Router);
    payrollFeatures: ({
        name: string;
        description: string;
        icon: string;
        route: string;
    } | {
        name: string;
        description: string;
        icon: string;
        route: null;
    })[];
    navigateToFeature(feature: any): void;
    navigateToMasterPayroll(): void;
    navigateToPayrollOverview(): void;
    navigateToDeductions(): void;
}
//# sourceMappingURL=index.component.d.ts.map