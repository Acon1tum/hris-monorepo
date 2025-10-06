"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledReportsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
// Enums
var ReportType;
(function (ReportType) {
    ReportType["ATTENDANCE"] = "ATTENDANCE";
    ReportType["PAYROLL"] = "PAYROLL";
    ReportType["PERFORMANCE"] = "PERFORMANCE";
})(ReportType || (ReportType = {}));
let ScheduledReportsComponent = class ScheduledReportsComponent {
    // Scheduled Reports Data
    scheduledReports = [
        {
            id: '1',
            name: 'Daily Employee Attendance Summary',
            description: 'Daily summary of employee attendance and late arrivals',
            reportType: ReportType.ATTENDANCE,
            department: 'Human Resources',
            frequency: 'daily',
            schedule: {
                hour: 8,
                minute: 0,
                timezone: 'Asia/Manila'
            },
            recipients: ['hr@company.com', 'managers@company.com'],
            format: 'pdf',
            template: 'Daily Attendance Template',
            filters: ['Status: Active', 'Department: All'],
            status: 'active',
            lastRun: new Date(Date.now() - 86400000),
            nextRun: new Date(Date.now() + 86400000),
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            autoDelete: true,
            retentionDays: 30
        },
        {
            id: '2',
            name: 'Weekly Payroll Summary',
            description: 'Weekly payroll summary for finance review',
            reportType: ReportType.PAYROLL,
            department: 'Finance',
            frequency: 'weekly',
            schedule: {
                dayOfWeek: 5,
                hour: 17,
                minute: 0,
                timezone: 'Asia/Manila'
            },
            recipients: ['finance@company.com', 'payroll@company.com'],
            format: 'excel',
            template: 'Weekly Payroll Template',
            filters: ['Pay Period: Current Week'],
            status: 'active',
            lastRun: new Date(Date.now() - 604800000),
            nextRun: new Date(Date.now() + 604800000),
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            autoDelete: true,
            retentionDays: 90
        },
        {
            id: '3',
            name: 'Monthly Performance Review',
            description: 'Monthly performance metrics and KPIs',
            reportType: ReportType.PERFORMANCE,
            department: 'All',
            frequency: 'monthly',
            schedule: {
                dayOfMonth: 1,
                hour: 9,
                minute: 0,
                timezone: 'Asia/Manila'
            },
            recipients: ['executives@company.com', 'hr@company.com'],
            format: 'pdf',
            template: 'Monthly Performance Template',
            filters: ['Review Period: Last Month'],
            status: 'paused',
            lastRun: new Date(Date.now() - 2592000000),
            nextRun: new Date(Date.now() + 2592000000),
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            autoDelete: false,
            retentionDays: 365
        }
    ];
    // Alert Triggers Data
    alertTriggers = [
        {
            id: '1',
            name: 'Missing Employee Data Alert',
            description: 'Alert when employee records are missing required fields',
            type: 'data_missing',
            severity: 'high',
            conditions: [
                {
                    field: 'employee_data_completeness',
                    operator: 'less_than',
                    threshold: 95
                },
                {
                    field: 'required_fields',
                    operator: 'missing',
                    value: ['emergency_contact', 'bank_details', 'tax_info']
                }
            ],
            scope: 'global',
            notificationChannels: ['email', 'in_app'],
            recipients: ['hr@company.com', 'admin@company.com'],
            status: 'active',
            lastTriggered: new Date(Date.now() - 3600000),
            triggerCount: 12,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            cooldownMinutes: 60,
            autoResolve: true,
            resolveConditions: ['data_completeness >= 95']
        },
        {
            id: '2',
            name: 'Attendance Anomaly Detection',
            description: 'Detect unusual attendance patterns',
            type: 'anomaly_detected',
            severity: 'medium',
            conditions: [
                {
                    field: 'late_arrivals',
                    operator: 'greater_than',
                    threshold: 20
                },
                {
                    field: 'absent_days',
                    operator: 'greater_than',
                    threshold: 3
                }
            ],
            scope: 'department',
            targetDepartment: 'Operations',
            notificationChannels: ['email', 'sms'],
            recipients: ['operations@company.com', 'hr@company.com'],
            status: 'active',
            lastTriggered: new Date(Date.now() - 7200000),
            triggerCount: 5,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            cooldownMinutes: 120,
            autoResolve: false
        },
        {
            id: '3',
            name: 'Payroll Compliance Alert',
            description: 'Monitor payroll compliance and tax deadlines',
            type: 'compliance_breach',
            severity: 'critical',
            conditions: [
                {
                    field: 'tax_filing_deadline',
                    operator: 'less_than',
                    threshold: 7
                },
                {
                    field: 'payroll_accuracy',
                    operator: 'less_than',
                    threshold: 99.5
                }
            ],
            scope: 'department',
            targetDepartment: 'Finance',
            notificationChannels: ['email', 'sms', 'webhook'],
            recipients: ['finance@company.com', 'compliance@company.com'],
            status: 'active',
            lastTriggered: new Date(Date.now() - 86400000),
            triggerCount: 2,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            cooldownMinutes: 30,
            autoResolve: false
        }
    ];
    // Modal States
    showScheduledReportModal = false;
    showAlertTriggerModal = false;
    showViewScheduledReportModal = false;
    showViewAlertTriggerModal = false;
    selectedScheduledReport = null;
    selectedAlertTrigger = null;
    isEditScheduledReport = false;
    isEditAlertTrigger = false;
    showRecipientsDropdown = false;
    // Helper Methods
    getFrequencyLabel(frequency) {
        return frequency.charAt(0).toUpperCase() + frequency.slice(1);
    }
    getFormatIcon(format) {
        const iconMap = {
            'pdf': 'fas fa-file-pdf',
            'excel': 'fas fa-file-excel',
            'csv': 'fas fa-file-csv',
            'word': 'fas fa-file-word'
        };
        return iconMap[format.toLowerCase()] || 'fas fa-file';
    }
    getTimeAgo(date) {
        const now = new Date();
        const diff = Math.abs(now.getTime() - date.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    getAlertTypeIcon(type) {
        const iconMap = {
            'data_missing': 'fas fa-exclamation-triangle',
            'anomaly_detected': 'fas fa-chart-line',
            'compliance_breach': 'fas fa-shield-alt'
        };
        return iconMap[type] || 'fas fa-bell';
    }
    getSeverityColor(severity) {
        const colorMap = {
            'low': '#4CAF50',
            'medium': '#FF9800',
            'high': '#f44336',
            'critical': '#D32F2F'
        };
        return colorMap[severity.toLowerCase()] || '#757575';
    }
    getNotificationChannelsText(channels) {
        return channels.map(channel => channel.replace('_', ' ').charAt(0).toUpperCase() +
            channel.slice(1)).join(', ');
    }
    getBlankScheduledReport() {
        return {
            id: '',
            name: '',
            description: '',
            reportType: ReportType.ATTENDANCE,
            department: '',
            frequency: 'daily',
            schedule: { hour: 0, minute: 0, timezone: '' },
            recipients: [],
            format: 'pdf',
            template: '',
            filters: [],
            status: 'active',
            lastRun: new Date(),
            nextRun: new Date(),
            createdBy: '',
            createdAt: new Date(),
            autoDelete: false,
            retentionDays: 0
        };
    }
    getBlankAlertTrigger() {
        return {
            id: '',
            name: '',
            description: '',
            type: 'data_missing',
            severity: 'low',
            conditions: [],
            scope: 'global',
            notificationChannels: [],
            recipients: [],
            status: 'active',
            lastTriggered: new Date(),
            triggerCount: 0,
            createdBy: '',
            createdAt: new Date(),
            cooldownMinutes: 0,
            autoResolve: false
        };
    }
    // Modal Methods
    openViewScheduledReport(report) {
        this.selectedScheduledReport = report;
        this.showViewScheduledReportModal = true;
        this.isEditScheduledReport = false;
    }
    openCreateScheduledReport() {
        this.selectedScheduledReport = this.getBlankScheduledReport();
        this.showScheduledReportModal = true;
        this.showViewScheduledReportModal = false;
        this.isEditScheduledReport = false;
    }
    openEditScheduledReport(report) {
        this.selectedScheduledReport = { ...report };
        this.showScheduledReportModal = true;
        this.showViewScheduledReportModal = false;
        this.isEditScheduledReport = true;
    }
    closeScheduledReportModal() {
        this.showScheduledReportModal = false;
        this.showViewScheduledReportModal = false;
        this.selectedScheduledReport = null;
        this.isEditScheduledReport = false;
    }
    saveScheduledReport(report) {
        if (this.isEditScheduledReport && report.id) {
            // Edit
            const idx = this.scheduledReports.findIndex(r => r.id === report.id);
            if (idx > -1)
                this.scheduledReports[idx] = { ...report };
        }
        else {
            // Create
            report.id = (Math.random() * 100000).toFixed(0);
            this.scheduledReports.push({ ...report });
        }
        this.closeScheduledReportModal();
    }
    deleteScheduledReport(id) {
        if (confirm('Delete this scheduled report?')) {
            this.scheduledReports = this.scheduledReports.filter(r => r.id !== id);
            this.closeScheduledReportModal();
        }
    }
    // Alert Trigger Modal Methods
    openViewAlertTrigger(trigger) {
        this.selectedAlertTrigger = trigger;
        this.showViewAlertTriggerModal = true;
        this.isEditAlertTrigger = false;
    }
    openCreateAlertTrigger() {
        this.selectedAlertTrigger = this.getBlankAlertTrigger();
        this.showAlertTriggerModal = true;
        this.showViewAlertTriggerModal = false;
        this.isEditAlertTrigger = false;
    }
    openEditAlertTrigger(trigger) {
        this.selectedAlertTrigger = { ...trigger };
        this.showAlertTriggerModal = true;
        this.showViewAlertTriggerModal = false;
        this.isEditAlertTrigger = true;
    }
    closeAlertTriggerModal() {
        this.showAlertTriggerModal = false;
        this.showViewAlertTriggerModal = false;
        this.selectedAlertTrigger = null;
        this.isEditAlertTrigger = false;
    }
    saveAlertTrigger(trigger) {
        if (this.isEditAlertTrigger && trigger.id) {
            // Edit
            const idx = this.alertTriggers.findIndex(t => t.id === trigger.id);
            if (idx > -1)
                this.alertTriggers[idx] = { ...trigger };
        }
        else {
            // Create
            trigger.id = (Math.random() * 100000).toFixed(0);
            this.alertTriggers.push({ ...trigger });
        }
        this.closeAlertTriggerModal();
    }
    deleteAlertTrigger(id) {
        if (confirm('Delete this alert trigger?')) {
            this.alertTriggers = this.alertTriggers.filter(t => t.id !== id);
            this.closeAlertTriggerModal();
        }
    }
    // Action Methods
    createScheduledReport() {
        this.openCreateScheduledReport();
    }
    editScheduledReport(report) {
        this.openEditScheduledReport(report);
    }
    createAlertTrigger() {
        this.openCreateAlertTrigger();
    }
    editAlertTrigger(trigger) {
        this.openEditAlertTrigger(trigger);
    }
    toggleScheduledReportStatus(report) {
        report.status = report.status === 'active' ? 'paused' : 'active';
    }
    runScheduledReportNow(report) {
        // Implement run now logic
    }
    toggleAlertTriggerStatus(trigger) {
        trigger.status = trigger.status === 'active' ? 'inactive' : 'active';
    }
    testAlertTrigger(trigger) {
        // Implement test logic
    }
    addRecipient(event) {
        const input = event.target;
        const value = input.value.trim();
        if (value && this.selectedScheduledReport) {
            if (!this.selectedScheduledReport.recipients.includes(value)) {
                this.selectedScheduledReport.recipients.push(value);
            }
            input.value = '';
        }
        event.preventDefault();
    }
    departmentOptions = [
        'Human Resources',
        'Finance',
        'Operations',
        'IT',
        'All',
        'Marketing',
        'Sales',
        'Legal',
        'Executive'
    ];
    recipientOptions = [
        'hr@company.com',
        'managers@company.com',
        'finance@company.com',
        'payroll@company.com',
        'executives@company.com',
        'operations@company.com',
        'admin@company.com',
        'compliance@company.com',
        'it@company.com',
        'marketing@company.com',
        'sales@company.com',
        'legal@company.com'
    ];
    toggleRecipient(recipient) {
        if (!this.selectedScheduledReport)
            return;
        const idx = this.selectedScheduledReport.recipients.indexOf(recipient);
        if (idx > -1) {
            this.selectedScheduledReport.recipients.splice(idx, 1);
        }
        else {
            this.selectedScheduledReport.recipients.push(recipient);
        }
    }
    isRecipientSelected(recipient) {
        return !!this.selectedScheduledReport && this.selectedScheduledReport.recipients.includes(recipient);
    }
    // Optionally, close dropdown on blur
    closeRecipientsDropdown() {
        setTimeout(() => { this.showRecipientsDropdown = false; }, 150);
    }
};
exports.ScheduledReportsComponent = ScheduledReportsComponent;
exports.ScheduledReportsComponent = ScheduledReportsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-scheduled-reports',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './scheduled-reports.component.html',
        styleUrls: ['./scheduled-reports.component.scss']
    })
], ScheduledReportsComponent);
//# sourceMappingURL=scheduled-reports.component.js.map