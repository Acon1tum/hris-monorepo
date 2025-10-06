"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let ContributionsComponent = class ContributionsComponent {
    // User data
    userName = 'Olivia';
    // Tab navigation
    activeTab = 'Monthly View';
    // Chart functionality
    selectedChartType = 'Bar Chart';
    selectedYear = 2024;
    // View details modal
    showDetailsModal = false;
    selectedContribution = null;
    // Filter functionality
    showFilters = false;
    filterOptions = {
        year: null,
        month: null,
        status: null,
        minAmount: null,
        maxAmount: null
    };
    // Available filter options
    availableYears = [2024, 2023, 2022];
    availableMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    availableStatuses = ['paid', 'pending', 'processing'];
    // Monthly contributions data
    monthlyContributions = [
        { month: 'December', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-12-31' },
        { month: 'November', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-11-30' },
        { month: 'October', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-10-31' },
        { month: 'September', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-09-30' },
        { month: 'August', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-08-31' },
        { month: 'July', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-07-31' },
        { month: 'June', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-06-30' },
        { month: 'May', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-05-31' },
        { month: 'April', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-04-30' },
        { month: 'March', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-03-31' },
        { month: 'February', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-02-29' },
        { month: 'January', year: 2024, sss: 1200, philhealth: 400, pagibig: 200, bir: 800, total: 2600, status: 'paid', payDate: '2024-01-31' }
    ];
    // Yearly summary data
    yearlySummary = [
        { year: 2024, sssTotal: 14400, philhealthTotal: 4800, pagibigTotal: 2400, birTotal: 9600, grandTotal: 31200 },
        { year: 2023, sssTotal: 13200, philhealthTotal: 4400, pagibigTotal: 2200, birTotal: 8800, grandTotal: 28600 },
        { year: 2022, sssTotal: 12000, philhealthTotal: 4000, pagibigTotal: 2000, birTotal: 8000, grandTotal: 26000 }
    ];
    // Get filtered contributions
    get filteredContributions() {
        return this.monthlyContributions.filter(contribution => {
            // Year filter
            if (this.filterOptions.year && contribution.year !== this.filterOptions.year) {
                return false;
            }
            // Month filter
            if (this.filterOptions.month && contribution.month !== this.filterOptions.month) {
                return false;
            }
            // Status filter
            if (this.filterOptions.status && contribution.status !== this.filterOptions.status) {
                return false;
            }
            // Amount range filter
            if (this.filterOptions.minAmount && contribution.total < this.filterOptions.minAmount) {
                return false;
            }
            if (this.filterOptions.maxAmount && contribution.total > this.filterOptions.maxAmount) {
                return false;
            }
            return true;
        });
    }
    // Get current year summary
    get currentYearSummary() {
        return this.yearlySummary.find(summary => summary.year === new Date().getFullYear());
    }
    // Check if any filters are active
    get hasActiveFilters() {
        return !!(this.filterOptions.year ||
            this.filterOptions.month ||
            this.filterOptions.status ||
            this.filterOptions.minAmount ||
            this.filterOptions.maxAmount);
    }
    // Methods
    onTabChange(tabName) {
        this.activeTab = tabName;
    }
    onChartTypeChange(chartType) {
        this.selectedChartType = chartType;
    }
    onYearChange(year) {
        this.selectedYear = year;
    }
    // Get chart data for selected year
    getChartData() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        if (!yearData)
            return null;
        return {
            labels: ['SSS', 'PhilHealth', 'Pag-IBIG', 'BIR'],
            datasets: [{
                    label: `${this.selectedYear} Contributions`,
                    data: [yearData.sssTotal, yearData.philhealthTotal, yearData.pagibigTotal, yearData.birTotal],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderColor: ['#2563eb', '#059669', '#d97706', '#dc2626'],
                    borderWidth: 2
                }]
        };
    }
    // Get comparison chart data (current vs previous year)
    getComparisonChartData() {
        const currentYearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        const previousYearData = this.yearlySummary.find(summary => summary.year === this.selectedYear - 1);
        if (!currentYearData)
            return null;
        const labels = ['SSS', 'PhilHealth', 'Pag-IBIG', 'BIR'];
        const currentData = [currentYearData.sssTotal, currentYearData.philhealthTotal, currentYearData.pagibigTotal, currentYearData.birTotal];
        const previousData = previousYearData ? [previousYearData.sssTotal, previousYearData.philhealthTotal, previousYearData.pagibigTotal, previousYearData.birTotal] : [0, 0, 0, 0];
        return {
            labels: labels,
            datasets: [
                {
                    label: `${this.selectedYear}`,
                    data: currentData,
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderColor: ['#2563eb', '#059669', '#d97706', '#dc2626'],
                    borderWidth: 2
                },
                {
                    label: `${this.selectedYear - 1}`,
                    data: previousData,
                    backgroundColor: ['#93c5fd', '#6ee7b7', '#fcd34d', '#fca5a5'],
                    borderColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 2
                }
            ]
        };
    }
    // Get available years for chart
    get availableChartYears() {
        return this.yearlySummary.map(summary => summary.year).sort((a, b) => b - a);
    }
    // Get total for selected year
    get selectedYearTotal() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        return yearData ? yearData.grandTotal : 0;
    }
    // Get growth percentage for selected year
    get selectedYearGrowth() {
        const currentYearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        const previousYearData = this.yearlySummary.find(summary => summary.year === this.selectedYear - 1);
        if (!currentYearData || !previousYearData)
            return 0;
        return this.getYearlyGrowth(currentYearData.grandTotal, previousYearData.grandTotal);
    }
    // Helper getters for chart data
    get selectedYearSSS() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        return yearData ? yearData.sssTotal : 0;
    }
    get selectedYearPhilHealth() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        return yearData ? yearData.philhealthTotal : 0;
    }
    get selectedYearPagIBIG() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        return yearData ? yearData.pagibigTotal : 0;
    }
    get selectedYearBIR() {
        const yearData = this.yearlySummary.find(summary => summary.year === this.selectedYear);
        return yearData ? yearData.birTotal : 0;
    }
    get selectedYearSSSPercentage() {
        return this.getContributionPercentage(this.selectedYearSSS, this.selectedYearTotal);
    }
    get selectedYearPhilHealthPercentage() {
        return this.getContributionPercentage(this.selectedYearPhilHealth, this.selectedYearTotal);
    }
    get selectedYearPagIBIGPercentage() {
        return this.getContributionPercentage(this.selectedYearPagIBIG, this.selectedYearTotal);
    }
    get selectedYearBIRPercentage() {
        return this.getContributionPercentage(this.selectedYearBIR, this.selectedYearTotal);
    }
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
    applyFilters() {
        console.log('Filters applied:', this.filterOptions);
    }
    clearFilters() {
        this.filterOptions = {
            year: null,
            month: null,
            status: null,
            minAmount: null,
            maxAmount: null
        };
        console.log('Filters cleared');
    }
    getStatusColor(status) {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'processing':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }
    getStatusIcon(status) {
        switch (status) {
            case 'paid':
                return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
            case 'pending':
                return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
            case 'processing':
                return 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15';
            default:
                return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        }
    }
    downloadBIR2316() {
        console.log('Downloading BIR 2316...');
        alert('BIR 2316 download started! This form is for annual tax filing.');
    }
    viewContributionDetails(contribution) {
        // Create detailed contribution data
        this.selectedContribution = {
            month: contribution.month,
            year: contribution.year,
            sss: {
                amount: contribution.sss,
                percentage: this.getContributionPercentage(contribution.sss, contribution.total),
                description: 'Social Security System contribution for retirement, disability, and death benefits'
            },
            philhealth: {
                amount: contribution.philhealth,
                percentage: this.getContributionPercentage(contribution.philhealth, contribution.total),
                description: 'Philippine Health Insurance Corporation contribution for healthcare coverage'
            },
            pagibig: {
                amount: contribution.pagibig,
                percentage: this.getContributionPercentage(contribution.pagibig, contribution.total),
                description: 'Home Development Mutual Fund contribution for housing loans and savings'
            },
            bir: {
                amount: contribution.bir,
                percentage: this.getContributionPercentage(contribution.bir, contribution.total),
                description: 'Bureau of Internal Revenue tax withholding for income tax obligations'
            },
            total: contribution.total,
            status: contribution.status,
            payDate: contribution.payDate
        };
        this.showDetailsModal = true;
    }
    closeDetailsModal() {
        this.showDetailsModal = false;
        this.selectedContribution = null;
    }
    // Helper method to convert ContributionDetails to Contribution
    getSelectedContributionForDownload() {
        if (this.selectedContribution) {
            return {
                month: this.selectedContribution.month,
                year: this.selectedContribution.year,
                sss: this.selectedContribution.sss.amount,
                philhealth: this.selectedContribution.philhealth.amount,
                pagibig: this.selectedContribution.pagibig.amount,
                bir: this.selectedContribution.bir.amount,
                total: this.selectedContribution.total,
                status: this.selectedContribution.status,
                payDate: this.selectedContribution.payDate
            };
        }
        return null;
    }
    downloadContributionReport(contribution) {
        if (contribution) {
            console.log('Downloading contribution report for:', contribution.month, contribution.year);
            alert(`Downloading ${contribution.month} ${contribution.year} contribution report`);
        }
        else {
            console.log('No contribution selected for download');
            alert('No contribution selected for download');
        }
    }
    getContributionPercentage(amount, total) {
        return Math.round((amount / total) * 100);
    }
    getYearlyGrowth(currentYear, previousYear) {
        if (previousYear === 0)
            return 0;
        return Math.round(((currentYear - previousYear) / previousYear) * 100);
    }
    getPreviousYearTotal() {
        return this.yearlySummary.length > 1 ? this.yearlySummary[1].grandTotal : 0;
    }
};
exports.ContributionsComponent = ContributionsComponent;
exports.ContributionsComponent = ContributionsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-contributions',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './contributions.component.html',
        styleUrls: ['./contributions.component.scss']
    })
], ContributionsComponent);
//# sourceMappingURL=contributions.component.js.map