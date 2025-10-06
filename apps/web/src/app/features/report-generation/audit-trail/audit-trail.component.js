"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditTrailComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const animations_1 = require("@angular/animations");
const audit_trail_service_1 = require("../audit-trail.service");
const rxjs_1 = require("rxjs");
var ReportType;
(function (ReportType) {
    ReportType["EMPLOYEE"] = "employee";
    ReportType["PAYROLL"] = "payroll";
    ReportType["ATTENDANCE"] = "attendance";
    ReportType["LEAVE"] = "leave";
    ReportType["PERFORMANCE"] = "performance";
    ReportType["CUSTOM"] = "custom";
})(ReportType || (ReportType = {}));
let AuditTrailComponent = class AuditTrailComponent {
    auditTrailService;
    auditTrails = [];
    subscription = new rxjs_1.Subscription();
    auditFilters = {
        dateRange: '',
        department: '',
        action: '',
        status: '',
        reportType: ''
    };
    showViewModal = false;
    selectedAudit = null;
    showNotification = false;
    notificationMessage = '';
    constructor(auditTrailService) {
        this.auditTrailService = auditTrailService;
    }
    ngOnInit() {
        console.log('AuditTrailComponent: ngOnInit called');
        // Subscribe to audit trail updates from service
        this.subscription.add(this.auditTrailService.auditTrails$.subscribe(trails => {
            console.log('AuditTrailComponent: Received trails update:', trails.length, 'entries');
            this.auditTrails = trails;
            console.log('Audit trails updated in component:', trails.length, 'entries');
        }));
        // Log initial state
        const initialTrails = this.auditTrailService.getAuditTrails();
        console.log('AuditTrailComponent: Initial trails from service:', initialTrails.length, 'entries');
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    // Method to show notification
    showNotificationMessage(message) {
        this.notificationMessage = message;
        this.showNotification = true;
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            this.showNotification = false;
            this.notificationMessage = '';
        }, 3000);
    }
    exportAuditTrail() {
        // TODO: Implement export functionality
        console.log('Exporting audit trail...');
    }
    clearAuditTrail() {
        if (confirm('Are you sure you want to clear all audit trail records? This action cannot be undone.')) {
            this.auditTrailService.clearAuditTrails();
        }
    }
    filterAuditTrails() {
        // TODO: Implement filter functionality
        console.log('Applying filters:', this.auditFilters);
    }
    deleteAuditTrail(id) {
        if (confirm('Are you sure you want to delete this audit trail record?')) {
            this.auditTrailService.deleteAuditTrail(id);
        }
    }
    viewAuditTrail(audit) {
        this.selectedAudit = audit;
        this.showViewModal = true;
    }
    closeViewModal() {
        this.showViewModal = false;
        this.selectedAudit = null;
    }
    getActionIcon(action) {
        switch (action.toLowerCase()) {
            case 'generated': return 'fas fa-file-alt';
            case 'exported': return 'fas fa-file-export';
            case 'printed': return 'fas fa-print';
            case 'modified': return 'fas fa-edit';
            case 'deleted': return 'fas fa-trash';
            default: return 'fas fa-file';
        }
    }
    getActionColor(action) {
        switch (action.toLowerCase()) {
            case 'generated': return '#2563eb';
            case 'exported': return '#16a34a';
            case 'printed': return '#9333ea';
            case 'modified': return '#eab308';
            case 'deleted': return '#dc2626';
            default: return '#6b7280';
        }
    }
    getStatusIcon(status) {
        switch (status.toLowerCase()) {
            case 'success': return 'fas fa-check-circle';
            case 'failed': return 'fas fa-times-circle';
            case 'pending': return 'fas fa-clock';
            default: return 'fas fa-question-circle';
        }
    }
    getStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'success': return '#16a34a';
            case 'failed': return '#dc2626';
            case 'pending': return '#eab308';
            default: return '#6b7280';
        }
    }
    getFormatIcon(format) {
        switch (format.toLowerCase()) {
            case 'csv': return 'fas fa-file-csv';
            case 'excel': return 'fas fa-file-excel';
            case 'pdf': return 'fas fa-file-pdf';
            case 'print': return 'fas fa-print';
            default: return 'fas fa-file';
        }
    }
    getFormatColor(format) {
        switch (format.toLowerCase()) {
            case 'csv': return '#16a34a';
            case 'excel': return '#059669';
            case 'pdf': return '#dc2626';
            case 'print': return '#9333ea';
            default: return '#6b7280';
        }
    }
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    getTimeAgo(date) {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0)
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0)
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    }
    // Method to add new audit trail entry from parent component (kept for backward compatibility)
    addAuditTrailEntry(auditEntry) {
        // Convert string reportType to enum if needed
        if (typeof auditEntry.reportType === 'string') {
            const reportTypeString = auditEntry.reportType.toLowerCase();
            // Map string values to enum values
            const reportTypeMap = {
                'employee': ReportType.EMPLOYEE,
                'payroll': ReportType.PAYROLL,
                'attendance': ReportType.ATTENDANCE,
                'leave': ReportType.LEAVE,
                'performance': ReportType.PERFORMANCE,
                'custom': ReportType.CUSTOM
            };
            if (reportTypeMap[reportTypeString]) {
                auditEntry.reportType = reportTypeMap[reportTypeString];
            }
        }
        // Use service to add the entry
        this.auditTrailService.addAuditTrailEntry(auditEntry);
        // Show notification
        const actionText = auditEntry.action.charAt(0).toUpperCase() + auditEntry.action.slice(1);
        this.showNotificationMessage(`${actionText} action logged to audit trail`);
    }
    // Accessibility: Copy audit details to clipboard
    copyAuditDetails(audit) {
        const details = `Action: ${audit.action}\nReport Name: ${audit.reportName}\nFormat: ${audit.exportFormat || '-'}\nGenerated By: ${audit.generatedBy}\nDepartment: ${audit.department}\nDate & Time: ${this.formatDate(audit.generatedAt)}\nStatus: ${audit.status}\nFile Size: ${audit.fileSize}\nDownloads: ${audit.downloadCount}`;
        navigator.clipboard.writeText(details).then(() => {
            this.showNotificationMessage('Audit details copied to clipboard');
        });
    }
};
exports.AuditTrailComponent = AuditTrailComponent;
exports.AuditTrailComponent = AuditTrailComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-audit-trail',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './audit-trail.component.html',
        styleUrls: ['./audit-trail.component.scss'],
        animations: [
            (0, animations_1.trigger)('fadeSlide', [
                (0, animations_1.transition)(':enter', [
                    (0, animations_1.style)({ opacity: 0, transform: 'translateY(-20px)' }),
                    (0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 1, transform: 'translateY(0)' }))
                ]),
                (0, animations_1.transition)(':leave', [
                    (0, animations_1.animate)('300ms ease-in', (0, animations_1.style)({ opacity: 0, transform: 'translateY(-20px)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [audit_trail_service_1.AuditTrailService])
], AuditTrailComponent);
//# sourceMappingURL=audit-trail.component.js.map