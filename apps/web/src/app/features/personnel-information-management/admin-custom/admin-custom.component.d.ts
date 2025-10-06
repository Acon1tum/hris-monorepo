import { OnInit } from '@angular/core';
interface Alert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    category: 'system' | 'security' | 'data';
}
interface AlertRule {
    id: number;
    name: string;
    description: string;
    condition: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    isActive: boolean;
    notifications: string[];
}
interface Report {
    id: number;
    name: string;
    description: string;
    type: 'chart' | 'table' | 'dashboard';
    metrics: string[];
    lastGenerated: Date;
    isCustom: boolean;
}
export declare class AdminCustomComponent implements OnInit {
    title: string;
    activeTab: 'alerts' | 'rules' | 'reports';
    alerts: Alert[];
    alertRules: AlertRule[];
    reports: Report[];
    showNewRuleForm: boolean;
    showNewReportForm: boolean;
    editingRule: AlertRule | null;
    editingReport: Report | null;
    showReportModal: boolean;
    selectedReport: Report | null;
    newRule: {
        name: string;
        description: string;
        condition: string;
        severity: "low" | "medium" | "high" | "critical";
        notifications: string[];
    };
    newReport: {
        name: string;
        description: string;
        type: "chart" | "table" | "dashboard";
        metrics: string[];
    };
    get ruleName(): string;
    set ruleName(value: string);
    get ruleDescription(): string;
    set ruleDescription(value: string);
    get ruleCondition(): string;
    set ruleCondition(value: string);
    get ruleSeverity(): 'low' | 'medium' | 'high' | 'critical';
    set ruleSeverity(value: 'low' | 'medium' | 'high' | 'critical');
    get reportName(): string;
    set reportName(value: string);
    get reportDescription(): string;
    set reportDescription(value: string);
    get reportType(): 'chart' | 'table' | 'dashboard';
    set reportType(value: 'chart' | 'table' | 'dashboard');
    ngOnInit(): void;
    setActiveTab(tab: 'alerts' | 'rules' | 'reports'): void;
    markAlertAsRead(alertId: number): void;
    deleteAlert(alertId: number): void;
    getUnreadAlertsCount(): number;
    createNewRule(): void;
    editRule(rule: AlertRule): void;
    updateRule(): void;
    deleteRule(ruleId: number): void;
    toggleRuleStatus(ruleId: number): void;
    resetNewRuleForm(): void;
    cancelEditRule(): void;
    createNewReport(): void;
    editReport(report: Report): void;
    updateReport(): void;
    deleteReport(reportId: number): void;
    generateReport(reportId: number): void;
    viewReport(report: Report): void;
    closeReportModal(): void;
    exportReport(reportId: number): void;
    resetNewReportForm(): void;
    cancelEditReport(): void;
    getAlertIcon(type: string): string;
    getSeverityColor(severity: string): string;
    toggleNotification(type: string): void;
    toggleMetric(metric: string): void;
    private simulateRealTimeAlerts;
    onFabClick(): void;
}
export {};
//# sourceMappingURL=admin-custom.component.d.ts.map