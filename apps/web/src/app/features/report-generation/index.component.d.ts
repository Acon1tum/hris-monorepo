import { OnInit, OnDestroy } from '@angular/core';
import { AuditTrailService, AuditTrail } from './audit-trail.service';
interface ReportFeature {
    name: string;
    description: string;
    icon: string;
    type: ReportType;
}
interface DashboardMetric {
    label: string;
    value: number;
    trend: number;
    icon: string;
    isUpdated?: boolean;
}
interface ModuleActivity {
    module: string;
    activeUsers: number;
    lastActivity: Date;
    status: 'active' | 'inactive' | 'maintenance';
}
interface DepartmentMetric {
    name: string;
    employeeCount: number;
    activeRequests: number;
    completionRate: number;
}
interface RoleDistribution {
    role: string;
    count: number;
    percentage: number;
}
interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    department: string;
    lastModified: Date;
    status: 'active' | 'draft' | 'archived';
    type: ReportType;
    layout: {
        sections: string[];
        fields: string[];
        styling: {
            headerColor: string;
            fontFamily: string;
            fontSize: string;
        };
    };
}
interface GlobalLayout {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    lastModified: Date;
    config: {
        headerStyle: string;
        footerStyle: string;
        pageSize: string;
        margins: string;
        fontFamily: string;
        colorScheme: string[];
    };
}
interface ScheduledReport {
    id: string;
    name: string;
    description: string;
    reportType: ReportType;
    department: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
    schedule: {
        dayOfWeek?: number;
        dayOfMonth?: number;
        hour: number;
        minute: number;
        timezone: string;
        customCron?: string;
    };
    recipients: string[];
    format: 'pdf' | 'excel' | 'csv' | 'html';
    template?: string;
    filters?: string[];
    status: 'active' | 'paused' | 'draft';
    lastRun?: Date;
    nextRun: Date;
    createdBy: string;
    createdAt: Date;
    autoDelete: boolean;
    retentionDays: number;
}
interface AlertTrigger {
    id: string;
    name: string;
    description: string;
    type: 'data_missing' | 'threshold_exceeded' | 'anomaly_detected' | 'compliance_breach';
    severity: 'low' | 'medium' | 'high' | 'critical';
    conditions: {
        field: string;
        operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'missing' | 'empty';
        value?: any;
        threshold?: number;
    }[];
    scope: 'global' | 'department' | 'role' | 'individual';
    targetDepartment?: string;
    targetRole?: string;
    targetUser?: string;
    notificationChannels: ('email' | 'sms' | 'in_app' | 'webhook')[];
    recipients: string[];
    status: 'active' | 'inactive' | 'draft';
    lastTriggered?: Date;
    triggerCount: number;
    createdBy: string;
    createdAt: Date;
    cooldownMinutes: number;
    autoResolve: boolean;
    resolveConditions?: string[];
}
interface SensitiveReport {
    id: string;
    name: string;
    description: string;
    reportType: ReportType;
    sensitivityLevel: 'low' | 'medium' | 'high' | 'critical';
    category: 'payroll' | 'performance' | 'personal' | 'financial' | 'compliance' | 'audit';
    dataFields: string[];
    retentionPolicy: string;
    encryptionRequired: boolean;
    watermarkEnabled: boolean;
    accessLogging: boolean;
    createdBy: string;
    createdAt: Date;
    lastModified: Date;
    status: 'active' | 'archived' | 'draft';
}
interface RoleAccess {
    id: string;
    roleName: string;
    roleDescription: string;
    permissions: {
        view: boolean;
        generate: boolean;
        export: boolean;
        print: boolean;
        schedule: boolean;
        share: boolean;
        delete: boolean;
    };
    restrictions: {
        timeRestrictions?: string;
        ipRestrictions?: string[];
        deviceRestrictions?: string[];
        dataMasking?: string[];
    };
    assignedReports: string[];
    assignedBy: string;
    assignedAt: Date;
    expiresAt?: Date;
    status: 'active' | 'expired' | 'revoked';
}
interface AccessRequest {
    id: string;
    requester: string;
    requesterRole: string;
    requesterDepartment: string;
    reportId: string;
    reportName: string;
    requestedPermissions: string[];
    reason: string;
    urgency: 'low' | 'medium' | 'high' | 'urgent';
    requestedAt: Date;
    status: 'pending' | 'approved' | 'denied' | 'expired';
    reviewedBy?: string;
    reviewedAt?: Date;
    reviewNotes?: string;
    expiresAt?: Date;
}
interface SavedFilter {
    id: string;
    name: string;
    description: string;
    reportType: string;
    dateStart: string;
    dateEnd: string;
    department: string;
    incomplete: boolean;
    createdBy: string;
    createdAt: Date;
    lastUsed?: Date;
    useCount: number;
    isDefault?: boolean;
}
declare enum ReportType {
    EMPLOYEE = "employee",
    PAYROLL = "payroll",
    ATTENDANCE = "attendance",
    LEAVE = "leave",
    PERFORMANCE = "performance",
    CUSTOM = "custom"
}
export declare class ReportGenerationComponent implements OnInit, OnDestroy {
    private auditTrailService;
    title: string;
    currentView: 'main' | 'templates' | 'audit-trail' | 'scheduled-reports' | 'sensitive-reports' | ReportType;
    keyMetrics: DashboardMetric[];
    moduleActivities: (ModuleActivity & {
        icon: string;
    })[];
    departmentMetrics: (DepartmentMetric & {
        icon: string;
    })[];
    roleDistribution: (RoleDistribution & {
        icon: string;
    })[];
    reportStats: {
        totalGenerated: number;
        thisMonth: number;
        lastMonth: number;
        exportSuccess: number;
        exportTotal: number;
        scheduledActive: number;
        scheduledTotal: number;
        byReportType: {
            employee: number;
            payroll: number;
            attendance: number;
            leave: number;
            performance: number;
            custom: number;
        };
        byDepartment: {
            'Human Resources': number;
            'IT Department': number;
            Finance: number;
            Operations: number;
        };
        byRole: {
            'Report Viewer': number;
            'Report Generator': number;
            'Report Admin': number;
            'Sensitive Data Access': number;
        };
    };
    reportTemplates: ReportTemplate[];
    globalLayouts: GlobalLayout[];
    reportFeatures: ReportFeature[];
    selectedFeature: ReportFeature | null;
    cardStates: {
        [key: string]: 'normal' | 'hovered';
    };
    showTemplateModal: boolean;
    showLayoutModal: boolean;
    selectedTemplate: ReportTemplate | null;
    selectedLayout: GlobalLayout | null;
    auditTrails: AuditTrail[];
    auditFilters: {
        dateRange: string;
        department: string;
        action: string;
        status: string;
        reportType: string;
    };
    scheduledReports: ScheduledReport[];
    alertTriggers: AlertTrigger[];
    showScheduledReportModal: boolean;
    showAlertTriggerModal: boolean;
    selectedScheduledReport: ScheduledReport | null;
    selectedAlertTrigger: AlertTrigger | null;
    sensitiveReports: SensitiveReport[];
    roleAccess: RoleAccess[];
    accessRequests: AccessRequest[];
    showSensitiveReportModal: boolean;
    showRoleAccessModal: boolean;
    showAccessRequestModal: boolean;
    selectedSensitiveReport: SensitiveReport | null;
    selectedRoleAccess: RoleAccess | null;
    selectedAccessRequest: AccessRequest | null;
    showModulesOverview: boolean;
    reportTypes: {
        value: string;
        label: string;
    }[];
    filters: {
        reportType: string;
        dateStart: string;
        dateEnd: string;
        department: string;
        incomplete: boolean;
    };
    filterErrors: string[];
    loadingExport: boolean;
    showSuccessMessage: boolean;
    successMessage: string;
    showReportReadyNotification: boolean;
    reportReadyMessage: string;
    loadingReport: boolean;
    employeeData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        position: string;
        status: string;
        salary: number;
    }[];
    payrollData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        basicPay: number;
        allowances: number;
        deductions: number;
        netPay: number;
    }[];
    attendanceData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        timeIn: string;
        timeOut: string;
        hoursWorked: number;
        status: string;
    }[];
    leaveData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        leaveType: string;
        startDate: string;
        endDate: string;
        days: number;
        status: string;
    }[];
    performanceData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        rating: number;
        goals: number;
        achievements: number;
        status: string;
    }[];
    customData: {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        category: string;
        subcategory: string;
        metric: string;
    }[];
    allResults: ({
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        position: string;
        status: string;
        salary: number;
    } | {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        basicPay: number;
        allowances: number;
        deductions: number;
        netPay: number;
    } | {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        timeIn: string;
        timeOut: string;
        hoursWorked: number;
        status: string;
    } | {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        leaveType: string;
        startDate: string;
        endDate: string;
        days: number;
        status: string;
    } | {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        rating: number;
        goals: number;
        achievements: number;
        status: string;
    } | {
        id: number;
        name: string;
        department: string;
        date: string;
        value: number;
        reportType: string;
        category: string;
        subcategory: string;
        metric: string;
    })[];
    filteredResults: any[];
    savedFilters: SavedFilter[];
    showSaveFilterModal: boolean;
    showLoadFilterModal: boolean;
    selectedSavedFilter: SavedFilter | null;
    newFilterName: string;
    newFilterDescription: string;
    dashboardUpdateHistory: {
        totalReports: number[];
        exportSuccess: number[];
        scheduledReports: number[];
        templates: number[];
        lastUpdate: Date;
    };
    actionTracker: {
        reportsGenerated: number;
        exportsAttempted: number;
        exportsSuccessful: number;
        printsAttempted: number;
        printsSuccessful: number;
        templatesCreated: number;
        templatesModified: number;
        scheduledReportsCreated: number;
        scheduledReportsActivated: number;
        lastAction: string | null;
        lastActionTime: Date | null;
    };
    showRealtimeIndicator: boolean;
    private indicatorTimeout;
    performanceMetrics: {
        dailyReports: number;
        weeklyReports: number;
        monthlyReports: number;
        exportSuccessRate: number;
        averageReportSize: number;
        mostUsedReportType: string;
        peakUsageTime: string;
        departmentUsage: {
            [key: string]: number;
        };
    };
    showPerformanceInsights: boolean;
    private performanceInsightsTimeout;
    constructor(auditTrailService: AuditTrailService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    hideRealtimeIndicator(): void;
    calculateDashboardMetrics(): void;
    calculateReportTypeDistribution(): void;
    calculateDepartmentMetrics(): void;
    calculateModuleActivities(): void;
    updateMetricsOnReportGeneration(reportType: ReportType, department: string): void;
    demonstrateDashboardUpdate(): void;
    showMetricsUpdated(): void;
    onCardHover(type: ReportType, isHovered: boolean): void;
    navigateToReport(feature: ReportFeature): void;
    goBack(): void;
    createTemplate(): void;
    editTemplate(template: ReportTemplate): void;
    deleteTemplate(templateId: string): void;
    createLayout(): void;
    editLayout(layout: GlobalLayout): void;
    deleteLayout(layoutId: string): void;
    setDefaultLayout(layoutId: string): void;
    deleteAuditTrail(auditId: string): void;
    exportAuditTrail(): void;
    clearAuditTrail(): void;
    filterAuditTrails(): void;
    getActionIcon(action: string): string;
    getActionColor(action: string): string;
    getStatusIcon(status: string): string;
    getStatusColor(status: string): string;
    formatFileSize(bytes: string): string;
    getTimeAgo(date: Date): string;
    getReportContent(): any;
    formatDate(date: Date): string;
    getTrendIcon(trend: number): string;
    getTemplateStatusColor(status: string): string;
    createScheduledReport(): void;
    editScheduledReport(report: ScheduledReport): void;
    deleteScheduledReport(reportId: string): void;
    toggleScheduledReportStatus(report: ScheduledReport): void;
    runScheduledReportNow(report: ScheduledReport): void;
    createAlertTrigger(): void;
    editAlertTrigger(trigger: AlertTrigger): void;
    deleteAlertTrigger(triggerId: string): void;
    toggleAlertTriggerStatus(trigger: AlertTrigger): void;
    testAlertTrigger(trigger: AlertTrigger): void;
    getFrequencyLabel(frequency: string): string;
    getSeverityColor(severity: string): string;
    getAlertTypeIcon(type: string): string;
    getFormatIcon(format: string): string;
    getNotificationChannelsText(channels: string[]): string;
    createSensitiveReport(): void;
    editSensitiveReport(report: SensitiveReport): void;
    deleteSensitiveReport(reportId: string): void;
    createRoleAccess(): void;
    editRoleAccess(role: RoleAccess): void;
    deleteRoleAccess(roleId: string): void;
    revokeRoleAccess(role: RoleAccess): void;
    approveAccessRequest(request: AccessRequest): void;
    denyAccessRequest(request: AccessRequest): void;
    viewAccessRequest(request: AccessRequest): void;
    getSensitivityColor(level: string): string;
    getSensitivityIcon(level: string): string;
    getCategoryIcon(category: string): string;
    getUrgencyColor(urgency: string): string;
    getPermissionsText(permissions: any): string;
    getRestrictionsText(restrictions: any): string;
    scrollToSection(sectionId: string): void;
    openModulesOverview(): void;
    closeModulesOverview(): void;
    toggleView(view: 'main' | 'templates' | 'audit-trail' | 'scheduled-reports' | 'sensitive-reports' | ReportType): void;
    onApplyFilters(): void;
    onResetFilters(): void;
    get totalValue(): any;
    getTableHeaders(): string[];
    getTableData(): any[][];
    getReportTitle(): string;
    showSuccess(message: string): void;
    createAuditTrailEntry(action: string, format?: string): void;
    getFileSize(format?: string): string;
    exportCSV(): void;
    exportExcel(): void;
    exportPDF(): void;
    printTable(): void;
    showReportReady(): void;
    openSaveFilterModal(): void;
    closeSaveFilterModal(): void;
    saveCurrentFilter(): void;
    openLoadFilterModal(): void;
    closeLoadFilterModal(): void;
    loadSavedFilter(filter: SavedFilter): void;
    deleteSavedFilter(filterId: string): void;
    setDefaultFilter(filterId: string): void;
    getFilterIcon(reportType: string): string;
    getFilterColor(reportType: string): string;
    formatFilterDate(date: Date): string;
    updateDashboardData(): void;
    getMetricNumberClass(value: number): string;
    getTrendClass(trend: number): string;
    getMetricSubtitle(label: string): string;
    getMetricProgress(metric: DashboardMetric): number;
    onMetricCardClick(metric: DashboardMetric): void;
    trackUserAction(action: string, details?: any): void;
    updateReportGenerationMetrics(): void;
    updateExportMetrics(): void;
    updatePrintMetrics(): void;
    updateTemplateMetrics(): void;
    updateScheduledReportMetrics(): void;
    updateDashboardWithAnimation(): void;
    updateModuleActivities(): void;
    updateDepartmentMetrics(): void;
    updateReportTypeDistribution(): void;
    getPerformanceInsights(): {
        averageReportSize: number;
        mostUsedFormat: string;
        peakActivityTime: string;
        efficiencyScore: number;
        totalActions: number;
        successRate: number;
        mostActiveDepartment: string;
        averageDailyReports: number;
        trend: number;
    };
    calculateAverageReportSize(): number;
    getMostUsedExportFormat(): string;
    getPeakActivityTime(): string;
    calculateEfficiencyScore(): number;
    calculateOverallTrend(): number;
    getActionDisplayName(action: string): string;
    getEfficiencyClass(score: number): string;
    hidePerformanceInsights(): void;
    showPerformanceInsightsWithTimeout(): void;
}
export {};
//# sourceMappingURL=index.component.d.ts.map