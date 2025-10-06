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
exports.DtrAdjustmentComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let DtrAdjustmentComponent = class DtrAdjustmentComponent {
    title = 'DTR Adjustments';
    searchTerm = '';
    // Sample DTR adjustment data
    adjustments = [
        {
            id: 1,
            employeeId: 'EMP-00123',
            employeeName: 'Sarah Miller',
            submissionDate: new Date('2024-08-16'),
            missedLogDate: new Date('2024-08-15'),
            timeIn: '09:00 AM',
            timeOut: '05:00 PM',
            reason: 'Forgot to clock in after lunch.',
            status: 'pending',
            evidence: {
                fileName: 'Meeting_Notes.pdf',
                fileSize: '1.2 MB',
                fileType: 'pdf',
                thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEhxbJeTEgn-HPR6_sMciPNtdyBhD1NxTqDg_7-0_eVIJiQiRn5DlauruL114yvIxSWfwGTC9LFO17rTxYCYtD8eLLTIua0bkS1FG3vrihYPG41-vOJJsaV6ZmlJo8Zb5YkXzrJxhDne-K8Q3jT3zfDpgP1hgrIxj52W3BNA39XoGt72UmX1fb1KK37W0VFNz196ebaDddrXHGuy8Ky51qyGEij2Cat-AlnbOqwGV34zDkRmukN6zNZwneHAhQaF1EmVfDnw2KhDql'
            }
        },
        {
            id: 2,
            employeeId: 'EMP-00456',
            employeeName: 'David Chen',
            submissionDate: new Date('2024-08-17'),
            missedLogDate: new Date('2024-08-16'),
            timeIn: '10:00 AM',
            timeOut: '06:00 PM',
            reason: 'Client meeting ran overtime.',
            status: 'pending',
            evidence: {
                fileName: 'Client_Email_Confirmation.png',
                fileSize: '350 KB',
                fileType: 'png',
                thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGdtE2NHJhy0gX3YGSwl8-H3X-CobeOKg8_Gf399NAS9hCHcmW6DW5lLASLKhvpOzWENF6GBDG67Q-Oo7hLhvKw2ZLy7G-PtMEWn3OBIzmSG5_-wgGIy-WuYr0nR89I96_w9GohIFJbZWSb3R-L5J2b4lVBsbw4FmqoKbH37JkohVvyVQVhSngphUSaszBy4s3AZk0uqqMOgSPdjSbTypboojPyEgb_XBlg0i7DyShvudsJ_VEW2AE-g1888AxRmYesAR8DAdXI0YE'
            }
        },
        {
            id: 3,
            employeeId: 'EMP-00789',
            employeeName: 'Emily Carter',
            submissionDate: new Date('2024-08-11'),
            missedLogDate: new Date('2024-08-10'),
            timeIn: '08:00 AM',
            timeOut: '04:00 PM',
            reason: 'System outage prevented clock-in.',
            status: 'approved',
            approvedBy: 'Admin',
            approvedDate: new Date('2024-08-12'),
            remarks: 'Verified system logs.',
            evidence: {
                fileName: 'IT_Support_Ticket.jpg',
                fileSize: '780 KB',
                fileType: 'jpg',
                thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBehWQPoKMhtYv-IFWB3gAvzccU4GOrV-ZdKpMEEKP8IMjWjXazVqaImgW5_J8OIhuMmUSpaEcNvOOqXYaFqvulkh0WLv6_1gwEtSg5OJWiybWtvmSphqG7AUQ7gfKnVoulRpM1ayLSMTG7QPmvAr9gpe4wAu-1plOgIgJli-d8pkQf-xd1j5IMr8LYuWJZ_Xbuv9vAfyEXl1ohStfsRdGdPWNimS3TLiM0AKITCU-Y5VBC600V7vEOcLo_-KPIZ-1QQv82tNqOg87X'
            }
        },
        {
            id: 4,
            employeeId: 'EMP-01011',
            employeeName: 'Michael Johnson',
            submissionDate: new Date('2024-08-06'),
            missedLogDate: new Date('2024-08-05'),
            timeIn: '09:00 AM',
            timeOut: '05:00 PM',
            reason: 'Personal appointment.',
            status: 'rejected',
            rejectedBy: 'Admin',
            rejectedDate: new Date('2024-08-07'),
            remarks: 'Insufficient evidence provided.',
            evidence: {
                fileName: 'Appointment_Card.png',
                fileSize: '210 KB',
                fileType: 'png',
                thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxaNaOTSuKoYFF-ikmApMUl4xTKWgo__zLJrRmHlGeJqVwZZrfB3qukMJwlKN9y8Hdqf_YGkeDAHN91v2BSnEwuoKLcTWFh_uWfinewdxCH9Nph3jg59JhpsEOt-FqonkT-CzxVxusbo6NYAiobemzGjn5H_OBUYhKeIu6ko7rudM53TG413bb8OzsWPOz-GTrpMOWWE0yqAk1zUqbozkziSKIETAAfw8AWr3h9d9RklJeSy2BXjOCWnpvWWqHkGSfYQqotcbpEbG'
            }
        },
        {
            id: 5,
            employeeId: 'EMP-00555',
            employeeName: 'Lisa Thompson',
            submissionDate: new Date('2024-08-18'),
            missedLogDate: new Date('2024-08-17'),
            timeIn: '08:30 AM',
            timeOut: '05:30 PM',
            reason: 'Power outage at home during remote work.',
            status: 'pending',
            evidence: {
                fileName: 'Power_Company_Notice.pdf',
                fileSize: '890 KB',
                fileType: 'pdf'
            }
        },
        {
            id: 6,
            employeeId: 'EMP-00667',
            employeeName: 'James Wilson',
            submissionDate: new Date('2024-08-09'),
            missedLogDate: new Date('2024-08-08'),
            timeIn: '09:15 AM',
            timeOut: '06:15 PM',
            reason: 'Medical emergency.',
            status: 'approved',
            approvedBy: 'HR Manager',
            approvedDate: new Date('2024-08-10'),
            remarks: 'Valid medical excuse provided.',
            evidence: {
                fileName: 'Medical_Certificate.pdf',
                fileSize: '456 KB',
                fileType: 'pdf'
            }
        }
    ];
    constructor() { }
    ngOnInit() {
        // Component initialization
    }
    // Computed properties
    get adjustmentSections() {
        const pending = this.adjustments.filter(adj => adj.status === 'pending');
        const approved = this.adjustments.filter(adj => adj.status === 'approved');
        const rejected = this.adjustments.filter(adj => adj.status === 'rejected');
        return [
            {
                title: 'Pending Submissions',
                count: pending.length,
                adjustments: pending
            },
            {
                title: 'Approved Submissions',
                count: approved.length,
                adjustments: approved
            },
            {
                title: 'Rejected Submissions',
                count: rejected.length,
                adjustments: rejected
            }
        ].filter(section => section.count > 0); // Only show sections with items
    }
    get filteredAdjustments() {
        if (!this.searchTerm) {
            return this.adjustments;
        }
        const searchTerm = this.searchTerm.toLowerCase();
        return this.adjustments.filter(adjustment => adjustment.employeeName.toLowerCase().includes(searchTerm) ||
            adjustment.employeeId.toLowerCase().includes(searchTerm) ||
            adjustment.reason.toLowerCase().includes(searchTerm) ||
            adjustment.status.toLowerCase().includes(searchTerm));
    }
    // Methods
    getStatusBadgeClass(status) {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'approved':
                return 'status-approved';
            case 'rejected':
                return 'status-rejected';
            default:
                return 'status-default';
        }
    }
    getStatusIcon(status) {
        switch (status) {
            case 'pending':
                return 'hourglass_empty';
            case 'approved':
                return 'check_circle';
            case 'rejected':
                return 'cancel';
            default:
                return 'help';
        }
    }
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }
    formatDateTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
    onSearch() {
        // Search is handled by the getter filteredAdjustments
    }
    onFilter() {
        console.log('Filter clicked');
        // Implement filtering functionality
    }
    onSort() {
        console.log('Sort clicked');
        // Implement sorting functionality
    }
    onApproveAdjustment(adjustment) {
        console.log('Approving adjustment:', adjustment.id);
        adjustment.status = 'approved';
        adjustment.approvedBy = 'Current User'; // Replace with actual user
        adjustment.approvedDate = new Date();
        adjustment.remarks = 'Approved via DTR adjustment review.';
    }
    onRejectAdjustment(adjustment) {
        console.log('Rejecting adjustment:', adjustment.id);
        adjustment.status = 'rejected';
        adjustment.rejectedBy = 'Current User'; // Replace with actual user
        adjustment.rejectedDate = new Date();
        adjustment.remarks = 'Rejected - requires additional documentation.';
    }
    onViewAuditTrail(adjustment) {
        console.log('Viewing audit trail for:', adjustment.id);
        // Implement audit trail viewing
    }
    onDownloadEvidence(evidence) {
        console.log('Downloading evidence:', evidence.fileName);
        // Implement file download
    }
    trackByAdjustmentId(index, adjustment) {
        return adjustment.id;
    }
};
exports.DtrAdjustmentComponent = DtrAdjustmentComponent;
exports.DtrAdjustmentComponent = DtrAdjustmentComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-dtr-adjustment',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './dtr-adjustment.component.html',
        styleUrls: ['./dtr-adjustment.component.scss']
    }),
    __metadata("design:paramtypes", [])
], DtrAdjustmentComponent);
//# sourceMappingURL=dtr-adjustment.component.js.map