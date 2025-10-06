import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardService, DashboardStats } from '../../../services/admin-dashboard.service';
export declare class AdminDashboardComponent implements OnInit, OnDestroy {
    private adminDashboardService;
    private router;
    dashboardStats: DashboardStats | null;
    loading: boolean;
    error: boolean;
    private subscription;
    constructor(adminDashboardService: AdminDashboardService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    loadDashboardData(): void;
    refreshData(): void;
    navigateToSection(section: string): void;
    getAttendancePercentage(): number;
    getLeavePercentage(): number;
    getDepartmentPercentage(count: number): number;
    getEmploymentTypePercentage(count: number): number;
    formatEmploymentType(type: string): string;
}
//# sourceMappingURL=admin-dashboard.component.d.ts.map