interface Contribution {
    month: string;
    year: number;
    sss: number;
    philhealth: number;
    pagibig: number;
    bir: number;
    total: number;
    status: 'paid' | 'pending' | 'processing';
    payDate: string;
}
interface YearlySummary {
    year: number;
    sssTotal: number;
    philhealthTotal: number;
    pagibigTotal: number;
    birTotal: number;
    grandTotal: number;
}
interface FilterOptions {
    year: number | null;
    month: string | null;
    status: string | null;
    minAmount: number | null;
    maxAmount: number | null;
}
interface ContributionDetails {
    month: string;
    year: number;
    sss: {
        amount: number;
        percentage: number;
        description: string;
    };
    philhealth: {
        amount: number;
        percentage: number;
        description: string;
    };
    pagibig: {
        amount: number;
        percentage: number;
        description: string;
    };
    bir: {
        amount: number;
        percentage: number;
        description: string;
    };
    total: number;
    status: string;
    payDate: string;
}
export declare class ContributionsComponent {
    userName: string;
    activeTab: string;
    selectedChartType: string;
    selectedYear: number;
    showDetailsModal: boolean;
    selectedContribution: ContributionDetails | null;
    showFilters: boolean;
    filterOptions: FilterOptions;
    availableYears: number[];
    availableMonths: string[];
    availableStatuses: string[];
    monthlyContributions: Contribution[];
    yearlySummary: YearlySummary[];
    get filteredContributions(): Contribution[];
    get currentYearSummary(): YearlySummary | undefined;
    get hasActiveFilters(): boolean;
    onTabChange(tabName: string): void;
    onChartTypeChange(chartType: string): void;
    onYearChange(year: number): void;
    getChartData(): any;
    getComparisonChartData(): any;
    get availableChartYears(): number[];
    get selectedYearTotal(): number;
    get selectedYearGrowth(): number;
    get selectedYearSSS(): number;
    get selectedYearPhilHealth(): number;
    get selectedYearPagIBIG(): number;
    get selectedYearBIR(): number;
    get selectedYearSSSPercentage(): number;
    get selectedYearPhilHealthPercentage(): number;
    get selectedYearPagIBIGPercentage(): number;
    get selectedYearBIRPercentage(): number;
    toggleFilters(): void;
    applyFilters(): void;
    clearFilters(): void;
    getStatusColor(status: string): string;
    getStatusIcon(status: string): string;
    downloadBIR2316(): void;
    viewContributionDetails(contribution: Contribution): void;
    closeDetailsModal(): void;
    getSelectedContributionForDownload(): Contribution | null;
    downloadContributionReport(contribution: Contribution | null): void;
    getContributionPercentage(amount: number, total: number): number;
    getYearlyGrowth(currentYear: number, previousYear: number): number;
    getPreviousYearTotal(): number;
}
export {};
//# sourceMappingURL=contributions.component.d.ts.map