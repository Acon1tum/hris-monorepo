"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCustomComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let AdminCustomComponent = class AdminCustomComponent {
    title = 'Super Admin Custom Management';
    // Active tab
    activeTab = 'alerts';
    // Real-time alerts
    alerts = [
        {
            id: 1,
            type: 'critical',
            title: 'Database Connection Failed',
            message: 'Primary database connection has been lost. Attempting to reconnect...',
            timestamp: new Date(),
            isRead: false,
            category: 'system'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Unusual Login Activity',
            message: 'Multiple failed login attempts detected from IP 192.168.1.100',
            timestamp: new Date(Date.now() - 300000),
            isRead: false,
            category: 'security'
        },
        {
            id: 3,
            type: 'info',
            title: 'Data Sync Completed',
            message: 'Employee data synchronization completed successfully',
            timestamp: new Date(Date.now() - 600000),
            isRead: true,
            category: 'data'
        }
    ];
    // Alert rules
    alertRules = [
        {
            id: 1,
            name: 'Database Connection Monitor',
            description: 'Monitor database connection status and alert on failures',
            condition: 'db_connection_status == "failed"',
            severity: 'critical',
            isActive: true,
            notifications: ['email', 'sms', 'dashboard']
        },
        {
            id: 2,
            name: 'Failed Login Attempts',
            description: 'Alert on multiple failed login attempts from same IP',
            condition: 'failed_logins > 5 within 10 minutes',
            severity: 'high',
            isActive: true,
            notifications: ['email', 'dashboard']
        },
        {
            id: 3,
            name: 'Data Inconsistency Check',
            description: 'Check for data inconsistencies in employee records',
            condition: 'employee_data_integrity < 95%',
            severity: 'medium',
            isActive: false,
            notifications: ['email']
        }
    ];
    // Reports
    reports = [
        {
            id: 1,
            name: 'Employee Distribution by Department',
            description: 'Shows employee count and distribution across departments',
            type: 'chart',
            metrics: ['department_count', 'employee_distribution', 'growth_rate'],
            lastGenerated: new Date(),
            isCustom: false
        },
        {
            id: 2,
            name: 'System Performance Metrics',
            description: 'Real-time system performance and resource utilization',
            type: 'dashboard',
            metrics: ['cpu_usage', 'memory_usage', 'response_time', 'error_rate'],
            lastGenerated: new Date(Date.now() - 3600000),
            isCustom: true
        },
        {
            id: 3,
            name: 'Security Audit Report',
            description: 'Comprehensive security audit and access logs',
            type: 'table',
            metrics: ['login_attempts', 'failed_logins', 'suspicious_activity', 'access_patterns'],
            lastGenerated: new Date(Date.now() - 86400000),
            isCustom: true
        }
    ];
    // Form states
    showNewRuleForm = false;
    showNewReportForm = false;
    editingRule = null;
    editingReport = null;
    showReportModal = false;
    selectedReport = null;
    // New rule form
    newRule = {
        name: '',
        description: '',
        condition: '',
        severity: 'medium',
        notifications: []
    };
    // New report form
    newReport = {
        name: '',
        description: '',
        type: 'chart',
        metrics: []
    };
    // Computed properties for form binding
    get ruleName() {
        return this.editingRule ? this.editingRule.name : this.newRule.name;
    }
    set ruleName(value) {
        if (this.editingRule) {
            this.editingRule.name = value;
        }
        else {
            this.newRule.name = value;
        }
    }
    get ruleDescription() {
        return this.editingRule ? this.editingRule.description : this.newRule.description;
    }
    set ruleDescription(value) {
        if (this.editingRule) {
            this.editingRule.description = value;
        }
        else {
            this.newRule.description = value;
        }
    }
    get ruleCondition() {
        return this.editingRule ? this.editingRule.condition : this.newRule.condition;
    }
    set ruleCondition(value) {
        if (this.editingRule) {
            this.editingRule.condition = value;
        }
        else {
            this.newRule.condition = value;
        }
    }
    get ruleSeverity() {
        return this.editingRule ? this.editingRule.severity : this.newRule.severity;
    }
    set ruleSeverity(value) {
        if (this.editingRule) {
            this.editingRule.severity = value;
        }
        else {
            this.newRule.severity = value;
        }
    }
    get reportName() {
        return this.editingReport ? this.editingReport.name : this.newReport.name;
    }
    set reportName(value) {
        if (this.editingReport) {
            this.editingReport.name = value;
        }
        else {
            this.newReport.name = value;
        }
    }
    get reportDescription() {
        return this.editingReport ? this.editingReport.description : this.newReport.description;
    }
    set reportDescription(value) {
        if (this.editingReport) {
            this.editingReport.description = value;
        }
        else {
            this.newReport.description = value;
        }
    }
    get reportType() {
        return this.editingReport ? this.editingReport.type : this.newReport.type;
    }
    set reportType(value) {
        if (this.editingReport) {
            this.editingReport.type = value;
        }
        else {
            this.newReport.type = value;
        }
    }
    ngOnInit() {
        // Simulate real-time alerts
        this.simulateRealTimeAlerts();
    }
    // Tab navigation
    setActiveTab(tab) {
        this.activeTab = tab;
    }
    // Alert management
    markAlertAsRead(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.isRead = true;
        }
    }
    deleteAlert(alertId) {
        this.alerts = this.alerts.filter(a => a.id !== alertId);
    }
    getUnreadAlertsCount() {
        return this.alerts.filter(a => !a.isRead).length;
    }
    // Rule management
    createNewRule() {
        const rule = {
            id: Date.now(),
            name: this.newRule.name,
            description: this.newRule.description,
            condition: this.newRule.condition,
            severity: this.newRule.severity,
            isActive: true,
            notifications: [...this.newRule.notifications]
        };
        this.alertRules.push(rule);
        this.resetNewRuleForm();
    }
    editRule(rule) {
        this.editingRule = { ...rule };
        this.showNewRuleForm = true;
    }
    updateRule() {
        if (this.editingRule) {
            const index = this.alertRules.findIndex(r => r.id === this.editingRule.id);
            if (index !== -1) {
                this.alertRules[index] = { ...this.editingRule };
            }
            this.cancelEditRule();
        }
    }
    deleteRule(ruleId) {
        this.alertRules = this.alertRules.filter(r => r.id !== ruleId);
    }
    toggleRuleStatus(ruleId) {
        const rule = this.alertRules.find(r => r.id === ruleId);
        if (rule) {
            rule.isActive = !rule.isActive;
        }
    }
    resetNewRuleForm() {
        this.newRule = {
            name: '',
            description: '',
            condition: '',
            severity: 'medium',
            notifications: []
        };
        this.showNewRuleForm = false;
        this.editingRule = null;
    }
    cancelEditRule() {
        this.editingRule = null;
        this.showNewRuleForm = false;
    }
    // Report management
    createNewReport() {
        const report = {
            id: Date.now(),
            name: this.newReport.name,
            description: this.newReport.description,
            type: this.newReport.type,
            metrics: [...this.newReport.metrics],
            lastGenerated: new Date(),
            isCustom: true
        };
        this.reports.push(report);
        this.resetNewReportForm();
    }
    editReport(report) {
        this.editingReport = { ...report };
        this.showNewReportForm = true;
    }
    updateReport() {
        if (this.editingReport) {
            const index = this.reports.findIndex(r => r.id === this.editingReport.id);
            if (index !== -1) {
                this.reports[index] = { ...this.editingReport };
            }
            this.cancelEditReport();
        }
    }
    deleteReport(reportId) {
        this.reports = this.reports.filter(r => r.id !== reportId);
    }
    generateReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
            report.lastGenerated = new Date();
            console.log(`Generating report: ${report.name}`);
        }
    }
    viewReport(report) {
        this.selectedReport = report;
        this.showReportModal = true;
    }
    closeReportModal() {
        this.showReportModal = false;
        this.selectedReport = null;
    }
    exportReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (report) {
            console.log(`Exporting report: ${report.name}`);
            // Here you can implement actual export functionality
            // For now, just log the action
        }
    }
    resetNewReportForm() {
        this.newReport = {
            name: '',
            description: '',
            type: 'chart',
            metrics: []
        };
        this.showNewReportForm = false;
        this.editingReport = null;
    }
    cancelEditReport() {
        this.editingReport = null;
        this.showNewReportForm = false;
    }
    // Utility methods
    getAlertIcon(type) {
        switch (type) {
            case 'critical': return '🚨';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📢';
        }
    }
    getSeverityColor(severity) {
        switch (severity) {
            case 'critical': return 'red';
            case 'high': return 'orange';
            case 'medium': return 'yellow';
            case 'low': return 'green';
            default: return 'gray';
        }
    }
    // Form helper methods
    toggleNotification(type) {
        const notifications = this.editingRule ? this.editingRule.notifications : this.newRule.notifications;
        const index = notifications.indexOf(type);
        if (index > -1) {
            notifications.splice(index, 1);
        }
        else {
            notifications.push(type);
        }
    }
    toggleMetric(metric) {
        const metrics = this.editingReport ? this.editingReport.metrics : this.newReport.metrics;
        const index = metrics.indexOf(metric);
        if (index > -1) {
            metrics.splice(index, 1);
        }
        else {
            metrics.push(metric);
        }
    }
    // Simulate real-time alerts
    simulateRealTimeAlerts() {
        setInterval(() => {
            // Simulate new alerts every 30 seconds
            const newAlert = {
                id: Date.now(),
                type: Math.random() > 0.7 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
                title: 'System Health Check',
                message: 'Routine system health check completed successfully',
                timestamp: new Date(),
                isRead: false,
                category: 'system'
            };
            if (Math.random() > 0.8) {
                this.alerts.unshift(newAlert);
            }
        }, 30000);
    }
    // FAB click handler
    onFabClick() {
        if (this.activeTab === 'rules') {
            this.showNewRuleForm = true;
        }
        else if (this.activeTab === 'reports') {
            this.showNewReportForm = true;
        }
    }
};
exports.AdminCustomComponent = AdminCustomComponent;
exports.AdminCustomComponent = AdminCustomComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-admin-custom',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './admin-custom.component.html',
        styleUrls: ['./admin-custom.component.scss']
    })
], AdminCustomComponent);
//# sourceMappingURL=admin-custom.component.js.map