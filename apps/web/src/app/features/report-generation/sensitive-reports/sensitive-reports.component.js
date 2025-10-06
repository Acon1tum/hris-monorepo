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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensitiveReportsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const common_2 = require("@angular/common");
let SensitiveReportsComponent = class SensitiveReportsComponent {
    fb;
    renderer;
    document;
    // Mock data (copy from your provided code)
    sensitiveReports = [
        {
            id: '1',
            name: 'Executive Compensation Report',
            description: 'Detailed compensation analysis for C-level executives',
            reportType: 'payroll',
            sensitivityLevel: 'critical',
            category: 'payroll',
            dataFields: ['salary', 'bonus', 'stock_options', 'benefits', 'tax_info'],
            retentionPolicy: '7 years',
            encryptionRequired: true,
            watermarkEnabled: true,
            accessLogging: true,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            lastModified: new Date(),
            status: 'active'
        },
        {
            id: '2',
            name: 'Employee Performance Evaluations',
            description: 'Comprehensive performance reviews and ratings',
            reportType: 'performance',
            sensitivityLevel: 'high',
            category: 'performance',
            dataFields: ['performance_rating', 'goals', 'feedback', 'improvement_areas'],
            retentionPolicy: '3 years',
            encryptionRequired: true,
            watermarkEnabled: true,
            accessLogging: true,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            lastModified: new Date(),
            status: 'active'
        },
        {
            id: '3',
            name: 'Financial Compliance Audit',
            description: 'Internal audit reports for financial compliance',
            reportType: 'custom',
            sensitivityLevel: 'high',
            category: 'compliance',
            dataFields: ['audit_findings', 'compliance_status', 'risk_assessment', 'recommendations'],
            retentionPolicy: '10 years',
            encryptionRequired: true,
            watermarkEnabled: true,
            accessLogging: true,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            lastModified: new Date(),
            status: 'active'
        },
        {
            id: '4',
            name: 'Employee Personal Data Export',
            description: 'Complete employee personal information export',
            reportType: 'employee',
            sensitivityLevel: 'critical',
            category: 'personal',
            dataFields: ['ssn', 'address', 'phone', 'emergency_contact', 'medical_info'],
            retentionPolicy: '1 year',
            encryptionRequired: true,
            watermarkEnabled: true,
            accessLogging: true,
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            lastModified: new Date(),
            status: 'active'
        }
    ];
    roleAccess = [
        {
            id: '1',
            roleName: 'HR Manager',
            roleDescription: 'Human Resources department managers',
            permissions: {
                view: true, generate: true, export: true, print: true, schedule: true, share: false, delete: false
            },
            restrictions: {
                timeRestrictions: 'Business hours only',
                ipRestrictions: ['192.168.1.0/24'],
                dataMasking: ['ssn', 'salary']
            },
            assignedReports: ['2', '4'],
            assignedBy: 'admin@company.com',
            assignedAt: new Date(),
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            status: 'active'
        },
        {
            id: '2',
            roleName: 'Finance Director',
            roleDescription: 'Finance department directors',
            permissions: {
                view: true, generate: true, export: true, print: true, schedule: true, share: false, delete: false
            },
            restrictions: {
                timeRestrictions: 'Business hours only',
                ipRestrictions: ['192.168.2.0/24'],
                dataMasking: ['ssn']
            },
            assignedReports: ['1', '3'],
            assignedBy: 'admin@company.com',
            assignedAt: new Date(),
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            status: 'active'
        },
        {
            id: '3',
            roleName: 'Department Head',
            roleDescription: 'Department heads and supervisors',
            permissions: {
                view: true, generate: false, export: false, print: true, schedule: false, share: false, delete: false
            },
            restrictions: {
                timeRestrictions: 'Business hours only',
                dataMasking: ['ssn', 'salary', 'bonus']
            },
            assignedReports: ['2'],
            assignedBy: 'admin@company.com',
            assignedAt: new Date(),
            expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            status: 'active'
        }
    ];
    accessRequests = [
        {
            id: '1',
            requester: 'john.manager@company.com',
            requesterRole: 'Department Head',
            requesterDepartment: 'Operations',
            reportId: '2',
            reportName: 'Employee Performance Evaluations',
            requestedPermissions: ['view', 'export'],
            reason: 'Need to review team performance for quarterly planning',
            urgency: 'medium',
            requestedAt: new Date(Date.now() - 86400000),
            status: 'pending'
        },
        {
            id: '2',
            requester: 'sarah.finance@company.com',
            requesterRole: 'Finance Analyst',
            requesterDepartment: 'Finance',
            reportId: '1',
            reportName: 'Executive Compensation Report',
            requestedPermissions: ['view', 'generate'],
            reason: 'Required for annual budget planning and analysis',
            urgency: 'high',
            requestedAt: new Date(Date.now() - 172800000),
            status: 'approved',
            reviewedBy: 'admin@company.com',
            reviewedAt: new Date(Date.now() - 86400000),
            reviewNotes: 'Approved for budget planning purposes',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
            id: '3',
            requester: 'mike.hr@company.com',
            requesterRole: 'HR Specialist',
            requesterDepartment: 'Human Resources',
            reportId: '4',
            reportName: 'Employee Personal Data Export',
            requestedPermissions: ['view', 'export'],
            reason: 'Required for compliance audit and data verification',
            urgency: 'urgent',
            requestedAt: new Date(Date.now() - 3600000),
            status: 'pending'
        }
    ];
    // Modal states and selected items
    showViewRoleModal = false;
    showAssignRoleModal = false;
    showRevokeRoleModal = false;
    showCreateReportModal = false;
    showEditReportModal = false;
    showDeleteReportModal = false;
    showEditRoleModal = false;
    showDeleteRoleModal = false;
    selectedRole = null;
    selectedRequest = null;
    selectedReport = null;
    selectedRoleEdit = null;
    editRoleForm;
    assignRoleForm;
    reportForm;
    showViewRequestModal = false;
    showEditRequestModal = false;
    showDeleteRequestModal = false;
    selectedRequestEdit = null;
    editRequestForm;
    constructor(fb, renderer, document) {
        this.fb = fb;
        this.renderer = renderer;
        this.document = document;
        this.assignRoleForm = this.fb.group({
            roleName: ['', forms_1.Validators.required],
            roleDescription: [''],
            permissions: ['', forms_1.Validators.required],
            restrictions: ['']
        });
        this.reportForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            reportType: ['', forms_1.Validators.required],
            sensitivityLevel: ['', forms_1.Validators.required],
            category: ['', forms_1.Validators.required],
            dataFields: [''],
            retentionPolicy: ['', forms_1.Validators.required],
            encryptionRequired: [false],
            watermarkEnabled: [false],
            accessLogging: [false]
        });
        this.editRoleForm = this.fb.group({
            roleName: ['', forms_1.Validators.required],
            roleDescription: [''],
            permissions: ['', forms_1.Validators.required],
            restrictions: ['']
        });
        this.editRequestForm = this.fb.group({
            requester: ['', forms_1.Validators.required],
            requesterRole: ['', forms_1.Validators.required],
            requesterDepartment: ['', forms_1.Validators.required],
            reportName: ['', forms_1.Validators.required],
            requestedPermissions: ['', forms_1.Validators.required],
            reason: ['', forms_1.Validators.required],
            urgency: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required]
        });
    }
    // Utility to check if any modal is open
    get isAnyModalOpen() {
        return this.showViewRoleModal || this.showAssignRoleModal || this.showRevokeRoleModal || this.showCreateReportModal || this.showEditReportModal || this.showDeleteReportModal || this.showEditRoleModal || this.showDeleteRoleModal || this.showViewRequestModal || this.showEditRequestModal || this.showDeleteRequestModal;
    }
    ngDoCheck() {
        if (this.isAnyModalOpen) {
            this.renderer.addClass(this.document.body, 'modal-open');
        }
        else {
            this.renderer.removeClass(this.document.body, 'modal-open');
        }
    }
    // Helper methods for icons, colors, and formatting
    getSensitivityIcon(level) {
        switch (level) {
            case 'low': return 'fas fa-shield-alt';
            case 'medium': return 'fas fa-shield';
            case 'high': return 'fas fa-lock';
            case 'critical': return 'fas fa-lock';
            default: return 'fas fa-file';
        }
    }
    getSensitivityColor(level) {
        switch (level) {
            case 'low': return 'var(--success-color)';
            case 'medium': return 'var(--warning-color)';
            case 'high': return 'var(--danger-color)';
            case 'critical': return '#dc2626';
            default: return 'var(--text-secondary)';
        }
    }
    getCategoryIcon(category) {
        switch (category) {
            case 'payroll': return 'fas fa-dollar-sign';
            case 'performance': return 'fas fa-chart-line';
            case 'personal': return 'fas fa-user-shield';
            case 'financial': return 'fas fa-chart-pie';
            case 'compliance': return 'fas fa-clipboard-check';
            case 'audit': return 'fas fa-search';
            default: return 'fas fa-file';
        }
    }
    getTimeAgo(date) {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diff / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
        else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        }
        else {
            return 'Just now';
        }
    }
    getPermissionsText(permissions) {
        const activePermissions = Object.keys(permissions).filter(key => permissions[key]);
        return activePermissions.map(perm => perm.charAt(0).toUpperCase() + perm.slice(1)).join(', ');
    }
    getRestrictionsText(restrictions) {
        const restrictionsList = [];
        if (restrictions.timeRestrictions)
            restrictionsList.push('Time: ' + restrictions.timeRestrictions);
        if (restrictions.ipRestrictions)
            restrictionsList.push('IP: ' + restrictions.ipRestrictions.length + ' ranges');
        if (restrictions.dataMasking)
            restrictionsList.push('Masking: ' + restrictions.dataMasking.length + ' fields');
        return restrictionsList.join(' | ');
    }
    getUrgencyColor(urgency) {
        switch (urgency) {
            case 'low': return 'var(--success-color)';
            case 'medium': return 'var(--warning-color)';
            case 'high': return 'var(--danger-color)';
            case 'urgent': return '#dc2626';
            default: return 'var(--text-secondary)';
        }
    }
    getStatusColor(status) {
        switch (status) {
            case 'active': return 'var(--success-color)';
            case 'inactive': return 'var(--warning-color)';
            case 'maintenance': return 'var(--danger-color)';
            case 'pending': return 'var(--warning-color)';
            case 'approved': return 'var(--success-color)';
            case 'denied': return 'var(--danger-color)';
            case 'expired': return 'var(--text-secondary)';
            case 'revoked': return 'var(--danger-color)';
            default: return 'var(--text-secondary)';
        }
    }
    // Action methods for modals
    viewRoleAccess(role) {
        this.selectedRole = role;
        this.showViewRoleModal = true;
    }
    closeViewRoleModal() {
        this.showViewRoleModal = false;
        this.selectedRole = null;
    }
    assignRoleAccess() {
        this.assignRoleForm.reset();
        this.showAssignRoleModal = true;
    }
    closeAssignRoleModal() {
        this.showAssignRoleModal = false;
    }
    confirmAssignRoleAccess() {
        if (this.assignRoleForm.invalid) {
            this.assignRoleForm.markAllAsTouched();
            return;
        }
        const form = this.assignRoleForm.value;
        const newRole = {
            id: (this.roleAccess.length + 1).toString(),
            roleName: form.roleName,
            roleDescription: form.roleDescription,
            permissions: this.parsePermissions(form.permissions),
            restrictions: this.parseRestrictions(form.restrictions),
            assignedReports: [],
            assignedBy: 'admin@company.com',
            assignedAt: new Date(),
            status: 'active'
        };
        this.roleAccess.push(newRole);
        this.closeAssignRoleModal();
    }
    parsePermissions(permString) {
        // Example: "view, generate, export" => {view: true, generate: true, export: true}
        const perms = permString.split(',').map(p => p.trim()).filter(Boolean);
        const allPerms = ['view', 'generate', 'export', 'print', 'schedule', 'share', 'delete'];
        const result = {};
        allPerms.forEach(p => result[p] = perms.includes(p));
        return result;
    }
    parseRestrictions(restrString) {
        // Example: "Time: Business hours only | IP: 192.168.1.0/24" => {timeRestrictions: ..., ipRestrictions: ...}
        const result = {};
        if (restrString.includes('Time:')) {
            const match = restrString.match(/Time:([^|]*)/);
            if (match)
                result.timeRestrictions = match[1].trim();
        }
        if (restrString.includes('IP:')) {
            const match = restrString.match(/IP:([^|]*)/);
            if (match)
                result.ipRestrictions = match[1].split(',').map((ip) => ip.trim());
        }
        if (restrString.includes('Masking:')) {
            const match = restrString.match(/Masking:([^|]*)/);
            if (match)
                result.dataMasking = match[1].split(',').map((f) => f.trim());
        }
        return result;
    }
    revokeRoleAccess(role) {
        this.selectedRole = role;
        this.showRevokeRoleModal = true;
    }
    closeRevokeRoleModal() {
        this.showRevokeRoleModal = false;
        this.selectedRole = null;
    }
    confirmRevokeRoleAccess() {
        if (this.selectedRole) {
            this.selectedRole.status = 'revoked';
        }
        this.closeRevokeRoleModal();
    }
    // Update button actions
    createRoleAccess() {
        this.assignRoleAccess();
    }
    editRoleAccess(role) {
        this.selectedRoleEdit = role;
        this.editRoleForm.patchValue({
            roleName: role.roleName,
            roleDescription: role.roleDescription,
            permissions: this.getPermissionsText(role.permissions),
            restrictions: this.getRestrictionsText(role.restrictions)
        });
        this.showEditRoleModal = true;
    }
    closeEditRoleModal() {
        this.showEditRoleModal = false;
        this.selectedRoleEdit = null;
        this.editRoleForm.reset();
    }
    saveRoleAccess() {
        if (this.editRoleForm.invalid || !this.selectedRoleEdit) {
            this.editRoleForm.markAllAsTouched();
            return;
        }
        const form = this.editRoleForm.value;
        this.selectedRoleEdit.roleName = form.roleName;
        this.selectedRoleEdit.roleDescription = form.roleDescription;
        this.selectedRoleEdit.permissions = this.parsePermissions(form.permissions);
        this.selectedRoleEdit.restrictions = this.parseRestrictions(form.restrictions);
        this.closeEditRoleModal();
    }
    openDeleteRoleModal(role) {
        this.selectedRoleEdit = role;
        this.showDeleteRoleModal = true;
    }
    closeDeleteRoleModal() {
        this.showDeleteRoleModal = false;
        this.selectedRoleEdit = null;
    }
    confirmDeleteRoleAccess() {
        if (this.selectedRoleEdit) {
            this.roleAccess = this.roleAccess.filter(r => r.id !== this.selectedRoleEdit.id);
        }
        this.closeDeleteRoleModal();
    }
    // Sensitive Report Modal Methods
    createSensitiveReport() {
        this.reportForm.reset();
        this.showCreateReportModal = true;
    }
    closeCreateReportModal() {
        this.showCreateReportModal = false;
    }
    editSensitiveReport(report) {
        this.selectedReport = report;
        this.reportForm.patchValue({
            name: report.name,
            description: report.description,
            reportType: report.reportType,
            sensitivityLevel: report.sensitivityLevel,
            category: report.category,
            dataFields: report.dataFields.join(', '),
            retentionPolicy: report.retentionPolicy,
            encryptionRequired: report.encryptionRequired,
            watermarkEnabled: report.watermarkEnabled,
            accessLogging: report.accessLogging
        });
        this.showEditReportModal = true;
    }
    closeEditReportModal() {
        this.showEditReportModal = false;
        this.selectedReport = null;
    }
    saveReport() {
        if (this.reportForm.invalid) {
            this.reportForm.markAllAsTouched();
            return;
        }
        const formValue = this.reportForm.value;
        const reportData = {
            ...formValue,
            dataFields: formValue.dataFields ? formValue.dataFields.split(',').map((f) => f.trim()) : [],
            createdBy: 'admin@company.com',
            createdAt: new Date(),
            lastModified: new Date(),
            status: 'active'
        };
        if (this.showCreateReportModal) {
            // Create new report
            const newReport = {
                id: (this.sensitiveReports.length + 1).toString(),
                ...reportData
            };
            this.sensitiveReports.push(newReport);
            this.closeCreateReportModal();
        }
        else if (this.showEditReportModal && this.selectedReport) {
            // Update existing report
            Object.assign(this.selectedReport, reportData);
            this.closeEditReportModal();
        }
    }
    deleteSensitiveReport(id) {
        const report = this.sensitiveReports.find(r => r.id === id);
        if (report) {
            this.selectedReport = report;
            this.showDeleteReportModal = true;
        }
    }
    closeDeleteReportModal() {
        this.showDeleteReportModal = false;
        this.selectedReport = null;
    }
    confirmDeleteReport() {
        if (this.selectedReport) {
            this.sensitiveReports = this.sensitiveReports.filter(r => r.id !== this.selectedReport.id);
            this.closeDeleteReportModal();
        }
    }
    // Access Request Modal Methods
    viewAccessRequest(request) {
        this.selectedRequestEdit = request;
        this.showViewRequestModal = true;
    }
    closeViewRequestModal() {
        this.showViewRequestModal = false;
        this.selectedRequestEdit = null;
    }
    editAccessRequest(request) {
        this.selectedRequestEdit = request;
        this.editRequestForm.patchValue({
            requester: request.requester,
            requesterRole: request.requesterRole,
            requesterDepartment: request.requesterDepartment,
            reportName: request.reportName,
            requestedPermissions: request.requestedPermissions.join(', '),
            reason: request.reason,
            urgency: request.urgency,
            status: request.status
        });
        this.showEditRequestModal = true;
    }
    closeEditRequestModal() {
        this.showEditRequestModal = false;
        this.selectedRequestEdit = null;
        this.editRequestForm.reset();
    }
    saveAccessRequest() {
        if (this.editRequestForm.invalid || !this.selectedRequestEdit) {
            this.editRequestForm.markAllAsTouched();
            return;
        }
        const form = this.editRequestForm.value;
        this.selectedRequestEdit.requester = form.requester;
        this.selectedRequestEdit.requesterRole = form.requesterRole;
        this.selectedRequestEdit.requesterDepartment = form.requesterDepartment;
        this.selectedRequestEdit.reportName = form.reportName;
        this.selectedRequestEdit.requestedPermissions = form.requestedPermissions.split(',').map((p) => p.trim());
        this.selectedRequestEdit.reason = form.reason;
        this.selectedRequestEdit.urgency = form.urgency;
        this.selectedRequestEdit.status = form.status;
        this.closeEditRequestModal();
    }
    openDeleteRequestModal(request) {
        this.selectedRequestEdit = request;
        this.showDeleteRequestModal = true;
    }
    closeDeleteRequestModal() {
        this.showDeleteRequestModal = false;
        this.selectedRequestEdit = null;
    }
    confirmDeleteRequest() {
        if (this.selectedRequestEdit) {
            this.accessRequests = this.accessRequests.filter(r => r.id !== this.selectedRequestEdit.id);
        }
        this.closeDeleteRequestModal();
    }
    // Action stubs
    deleteRoleAccess(id) {
        const role = this.roleAccess.find(r => r.id === id);
        if (role) {
            this.openDeleteRoleModal(role);
        }
    }
    approveAccessRequest(request) { }
    denyAccessRequest(request) { }
    deleteAccessRequest(id) {
        const req = this.accessRequests.find(r => r.id === id);
        if (req) {
            this.openDeleteRequestModal(req);
        }
    }
};
exports.SensitiveReportsComponent = SensitiveReportsComponent;
exports.SensitiveReportsComponent = SensitiveReportsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-sensitive-reports',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
        templateUrl: './sensitive-reports.component.html',
        styleUrls: ['./sensitive-reports.component.scss']
    }),
    __param(2, (0, core_1.Inject)(common_2.DOCUMENT)),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        core_1.Renderer2, typeof (_a = typeof Document !== "undefined" && Document) === "function" ? _a : Object])
], SensitiveReportsComponent);
//# sourceMappingURL=sensitive-reports.component.js.map