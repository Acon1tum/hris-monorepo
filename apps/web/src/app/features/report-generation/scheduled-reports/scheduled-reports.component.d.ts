declare enum ReportType {
    ATTENDANCE = "ATTENDANCE",
    PAYROLL = "PAYROLL",
    PERFORMANCE = "PERFORMANCE"
}
interface Schedule {
    hour: number;
    minute: number;
    timezone: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
}
interface ScheduledReport {
    id: string;
    name: string;
    description: string;
    reportType: ReportType;
    department: string;
    frequency: string;
    schedule: Schedule;
    recipients: string[];
    format: string;
    template: string;
    filters: string[];
    status: string;
    lastRun: Date;
    nextRun: Date;
    createdBy: string;
    createdAt: Date;
    autoDelete: boolean;
    retentionDays: number;
}
interface Condition {
    field: string;
    operator: string;
    threshold?: number;
    value?: any;
}
interface AlertTrigger {
    id: string;
    name: string;
    description: string;
    type: string;
    severity: string;
    conditions: Condition[];
    scope: string;
    targetDepartment?: string;
    notificationChannels: string[];
    recipients: string[];
    status: string;
    lastTriggered: Date;
    triggerCount: number;
    createdBy: string;
    createdAt: Date;
    cooldownMinutes: number;
    autoResolve: boolean;
    resolveConditions?: string[];
}
export declare class ScheduledReportsComponent {
    scheduledReports: ScheduledReport[];
    alertTriggers: AlertTrigger[];
    showScheduledReportModal: boolean;
    showAlertTriggerModal: boolean;
    showViewScheduledReportModal: boolean;
    showViewAlertTriggerModal: boolean;
    selectedScheduledReport: ScheduledReport | null;
    selectedAlertTrigger: AlertTrigger | null;
    isEditScheduledReport: boolean;
    isEditAlertTrigger: boolean;
    showRecipientsDropdown: boolean;
    getFrequencyLabel(frequency: string): string;
    getFormatIcon(format: string): string;
    getTimeAgo(date: Date): string;
    getAlertTypeIcon(type: string): string;
    getSeverityColor(severity: string): string;
    getNotificationChannelsText(channels: string[]): string;
    getBlankScheduledReport(): ScheduledReport;
    getBlankAlertTrigger(): AlertTrigger;
    openViewScheduledReport(report: ScheduledReport): void;
    openCreateScheduledReport(): void;
    openEditScheduledReport(report: ScheduledReport): void;
    closeScheduledReportModal(): void;
    saveScheduledReport(report: ScheduledReport): void;
    deleteScheduledReport(id: string): void;
    openViewAlertTrigger(trigger: AlertTrigger): void;
    openCreateAlertTrigger(): void;
    openEditAlertTrigger(trigger: AlertTrigger): void;
    closeAlertTriggerModal(): void;
    saveAlertTrigger(trigger: AlertTrigger): void;
    deleteAlertTrigger(id: string): void;
    createScheduledReport(): void;
    editScheduledReport(report: ScheduledReport): void;
    createAlertTrigger(): void;
    editAlertTrigger(trigger: AlertTrigger): void;
    toggleScheduledReportStatus(report: ScheduledReport): void;
    runScheduledReportNow(report: ScheduledReport): void;
    toggleAlertTriggerStatus(trigger: AlertTrigger): void;
    testAlertTrigger(trigger: AlertTrigger): void;
    addRecipient(event: any): void;
    departmentOptions: string[];
    recipientOptions: string[];
    toggleRecipient(recipient: string): void;
    isRecipientSelected(recipient: string): boolean;
    closeRecipientsDropdown(): void;
}
export {};
//# sourceMappingURL=scheduled-reports.component.d.ts.map