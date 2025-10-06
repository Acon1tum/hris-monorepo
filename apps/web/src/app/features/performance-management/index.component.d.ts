import { OnInit, ChangeDetectorRef } from '@angular/core';
interface PerformanceEmployee {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    suffix?: string;
    email: string;
    number?: string;
    department: string;
    position: string;
    performanceScore: number;
    satisfaction: number;
    resolutionTime: string;
    retentionRate: number;
    monthlySatisfaction?: number[];
    monthlyResolutionTime?: number[];
}
interface DepartmentStat {
    name: string;
    count: number;
    percentage: number;
}
export declare class PerformanceManagementComponent implements OnInit {
    private cdr;
    title: string;
    performanceFeatures: {
        name: string;
        description: string;
        icon: string;
    }[];
    selectedDepartment: string;
    hoveredDept: string | null;
    rolesByDepartment: {
        [dept: string]: string[];
    };
    selectedRole: string;
    customKPIs: {
        title: string;
        value: string;
        checked: boolean;
        department: string;
        role: string;
    }[];
    checkedFilter: 'all' | 'checked' | 'unchecked';
    get filteredCustomKPIs(): {
        title: string;
        value: string;
        checked: boolean;
        department: string;
        role: string;
    }[];
    showCustomKpiModal: boolean;
    customKpiTitle: string;
    customKpiValue: string;
    engagementByDepartment: {
        [dept: string]: number;
    };
    attendanceByDepartment: {
        [dept: string]: number;
    };
    taskCompletionByDepartment: {
        [dept: string]: number;
    };
    qualityScoreByDepartment: {
        [dept: string]: string;
    };
    getAvgDummy(deptMap: {
        [dept: string]: number;
    }, department: string | null): string;
    getMostCommonDummy(deptMap: {
        [dept: string]: string;
    }, department: string | null): string;
    getDefaultKpiValue(title: string, department: string): string;
    getKpiForDepartment(department: string | null, kpi: 'satisfaction' | 'resolutionTime' | 'retentionRate'): string;
    saveCustomKpisToStorage(): void;
    loadCustomKpisFromStorage(): void;
    ngOnInit(): void;
    openCustomKpiModal(): void;
    closeCustomKpiModal(): void;
    saveCustomKpi(): void;
    toggleKpiChecked(index: number): void;
    get roles(): string[];
    employees: PerformanceEmployee[];
    get departmentStats(): DepartmentStat[];
    get filteredDepartments(): DepartmentStat[];
    get filteredEmployees(): PerformanceEmployee[];
    get overallSatisfaction(): string;
    get avgResolutionTime(): string;
    get avgRetentionRate(): string;
    get employeeTable(): PerformanceEmployee[];
    get departmentTable(): DepartmentStat[];
    get satisfactionTrends(): number[];
    get resolutionTimeByDepartment(): {
        [dept: string]: number;
    };
    getSatisfactionTrendsPath(trends: number[]): string;
    getSatisfactionTrendsLine(trends: number[]): string;
    getMaxDeptResolutionTime(): number;
    private departmentColors;
    getDepartmentBarColor(deptName: string, alpha?: number): string;
    updateAllCustomKpiValues(): void;
    fadeInChecklist: boolean;
    moveDownChecklist: boolean;
    constructor(cdr: ChangeDetectorRef);
    triggerChecklistFadeIn(): void;
    triggerChecklistMoveDown(): void;
    onDepartmentChange(): void;
    onRoleChange(): void;
    getKpiDepartmentLabel(kpi: {
        department: string;
    }): string;
    getKpiRoleLabel(kpi: {
        role: string;
    }): string;
    onCheckedFilterChange(): void;
    notifyEmployees: boolean;
    effectiveFrom: string;
    showAddKpiModal: boolean;
    newKpi: {
        name: string;
        description: string;
        targetValue: string;
        unit: string;
        frequency: string;
        weight: string;
    };
    kpiTableData: Array<any>;
    editKpiIndex: number | null;
    editKpiData: any;
    showDeleteConfirm: boolean;
    deleteKpiIndex: number | null;
    openDeleteKpiConfirm(index: number): void;
    confirmDeleteKpi(): void;
    cancelDeleteKpi(): void;
    deleteKpi(index: number): void;
    openEditKpiModal(index: number): void;
    saveEditKpi(): void;
    cancelEditKpi(): void;
    openAddKpiModal(): void;
    closeAddKpiModal(): void;
    addKpiToTable(): void;
}
export {};
//# sourceMappingURL=index.component.d.ts.map