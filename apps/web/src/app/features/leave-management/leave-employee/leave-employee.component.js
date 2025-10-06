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
exports.LeaveEmployeeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const forms_2 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const leave_employee_service_1 = require("./leave-employee.service");
const http_1 = require("@angular/common/http");
let LeaveEmployeeComponent = class LeaveEmployeeComponent {
    leaveService;
    fb;
    destroy$ = new rxjs_1.Subject();
    leaveTypes = [];
    leaveBalances = [];
    leaveApplications = [];
    leaveForm;
    selectedLeaveType = null;
    selectedLeaveBalance = null;
    isLoading = false;
    isSubmitting = false;
    error = null;
    showApplyForm = false;
    showViewModal = false;
    showSuccessModal = false;
    selectedApplication = null;
    selectedFile = null;
    uploadedFileName = null;
    validationErrors = [];
    formSubmitted = false;
    today = new Date();
    totalLeaves = 0;
    pendingLeaves = 0;
    approvedLeaves = 0;
    rejectedLeaves = 0;
    totalDaysTaken = 0;
    mostUsedType = '';
    toast = null;
    toastTimeout = null;
    constructor(leaveService, fb) {
        this.leaveService = leaveService;
        this.fb = fb;
        this.leaveForm = this.fb.group({
            leave_type_id: ['', [forms_2.Validators.required]],
            start_date: ['', [forms_2.Validators.required]],
            end_date: ['', [forms_2.Validators.required]],
            reason: [''],
            supporting_document: [''],
            total_days: [0]
        });
    }
    ngOnInit() {
        this.loadInitialData();
        this.leaveForm.get('leave_type_id')?.valueChanges.subscribe((leaveTypeId) => {
            this.onLeaveTypeChange(leaveTypeId);
        });
        this.leaveForm.get('start_date')?.valueChanges.subscribe(() => this.calculateTotalDays());
        this.leaveForm.get('end_date')?.valueChanges.subscribe(() => this.calculateTotalDays());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    loadInitialData() {
        this.isLoading = true;
        this.error = null;
        (0, rxjs_1.forkJoin)({
            leaveTypes: this.leaveService.getLeaveTypes(),
            leaveBalances: this.leaveService.getMyLeaveBalance(),
            leaveApplications: this.leaveService.getMyLeaveApplications()
        }).pipe((0, operators_1.takeUntil)(this.destroy$)).subscribe({
            next: (data) => {
                this.leaveTypes = data.leaveTypes.filter((type) => type.is_active);
                this.leaveBalances = data.leaveBalances;
                this.leaveApplications = data.leaveApplications;
                this.updateMetrics();
                this.isLoading = false;
            },
            error: (error) => {
                this.error = error.message;
                this.isLoading = false;
                this.showToast('Error', 'Failed to load data', 'error');
            }
        });
    }
    onApplyLeave() {
        this.resetForm();
        this.showApplyForm = true;
    }
    onViewLeave(leave) {
        this.selectedApplication = leave;
        this.showViewModal = true;
    }
    onCancelLeave(leave) {
        if (leave.status === 'Pending') {
            if (confirm('Are you sure you want to cancel this leave application?')) {
                this.leaveService.cancelLeaveApplication(leave.id).pipe((0, operators_1.takeUntil)(this.destroy$)).subscribe({
                    next: () => {
                        this.leaveApplications = this.leaveApplications.filter(app => app.id !== leave.id);
                        this.updateMetrics();
                        this.showToast('Success', 'Leave cancellation completed.', 'success');
                    },
                    error: (error) => {
                        this.showToast('Error', error.message, 'error');
                    }
                });
            }
        }
    }
    updateTotalDays() {
        if (this.leaveForm.value.start_date && this.leaveForm.value.end_date) {
            const start = new Date(this.leaveForm.value.start_date);
            const end = new Date(this.leaveForm.value.end_date);
            const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
            this.leaveForm.get('total_days')?.setValue(diff > 0 ? diff : 0);
        }
        else {
            this.leaveForm.get('total_days')?.setValue(0);
        }
    }
    onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.uploadedFileName = file.name;
        }
        else {
            this.selectedFile = null;
            this.uploadedFileName = '';
        }
    }
    validateForm() {
        this.validationErrors = [];
        let valid = true;
        if (!this.leaveForm.value.leave_type_id) {
            this.validationErrors.push('Leave type is required.');
            valid = false;
        }
        if (!this.leaveForm.value.start_date) {
            this.validationErrors.push('Start date is required.');
            valid = false;
        }
        if (!this.leaveForm.value.end_date) {
            this.validationErrors.push('End date is required.');
            valid = false;
        }
        if (!this.leaveForm.value.reason || !this.leaveForm.value.reason.trim()) {
            this.validationErrors.push('Reason is required.');
            valid = false;
        }
        // Additional: End date must not be before start date
        if (this.leaveForm.value.start_date && this.leaveForm.value.end_date) {
            if (new Date(this.leaveForm.value.end_date) < new Date(this.leaveForm.value.start_date)) {
                this.validationErrors.push('End date cannot be before start date.');
                valid = false;
            }
        }
        return valid;
    }
    submitForm() {
        this.formSubmitted = true;
        if (!this.validateForm()) {
            return;
        }
        this.isSubmitting = true;
        // Simulate loading/progress (e.g. 1.5s)
        setTimeout(() => {
            this.isSubmitting = false;
            this.showSuccessModal = true;
            const newLeave = {
                leave_type_id: this.leaveForm.value.leave_type_id,
                start_date: this.leaveForm.value.start_date,
                end_date: this.leaveForm.value.end_date,
                total_days: this.leaveForm.value.total_days,
                reason: this.leaveForm.value.reason,
                supporting_document: this.selectedFile
            };
            this.leaveService.createLeaveApplication(newLeave).pipe((0, operators_1.takeUntil)(this.destroy$)).subscribe({
                next: (response) => {
                    this.leaveApplications.unshift(response);
                    this.showApplyForm = false;
                    this.resetForm();
                    this.updateMetrics();
                    this.formSubmitted = false;
                    this.showToast('Success', 'Leave application submitted successfully.', 'success');
                    // Auto-close success modal after 1.5s
                    setTimeout(() => {
                        this.showSuccessModal = false;
                    }, 1500);
                },
                error: (error) => {
                    this.showToast('Error', error.message, 'error');
                    this.isSubmitting = false;
                }
            });
        }, 1500);
    }
    resetForm() {
        this.leaveForm.reset();
        this.leaveForm.get('total_days')?.setValue(0);
        this.selectedFile = null;
        this.uploadedFileName = '';
        this.formSubmitted = false;
    }
    getFileType(filename) {
        if (!filename)
            return 'other';
        const ext = filename.split('.').pop()?.toLowerCase();
        if (!ext)
            return 'other';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext))
            return 'image';
        if (['pdf'].includes(ext))
            return 'pdf';
        if (['doc', 'docx', 'odt', 'rtf'].includes(ext))
            return 'doc';
        return 'other';
    }
    getFileUrl(filename) {
        if (!filename)
            return '';
        if (filename.startsWith('data:'))
            return filename;
        return '/assets/uploads/' + filename;
    }
    showToast(title, message, type = 'info', duration = 2000) {
        this.toast = { show: true, title, message, type };
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        this.toastTimeout = setTimeout(() => {
            if (this.toast)
                this.toast.show = false;
            this.toast = null;
        }, duration);
    }
    closeToast() {
        if (this.toast)
            this.toast.show = false;
        this.toast = null;
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
    }
    onLeaveTypeChange(leaveTypeId) {
        this.selectedLeaveType = this.leaveTypes.find((type) => type.id === leaveTypeId) || null;
        this.selectedLeaveBalance = this.leaveBalances.find((balance) => balance.leave_type_id === leaveTypeId) || null;
        this.leaveForm.get('total_days')?.setValue(0); // Reset total days when leave type changes
    }
    calculateTotalDays() {
        if (this.leaveForm.value.start_date && this.leaveForm.value.end_date) {
            const start = new Date(this.leaveForm.value.start_date);
            const end = new Date(this.leaveForm.value.end_date);
            const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
            this.leaveForm.get('total_days')?.setValue(diff > 0 ? diff : 0);
        }
        else {
            this.leaveForm.get('total_days')?.setValue(0);
        }
    }
    updateMetrics() {
        this.totalLeaves = this.leaveApplications.length;
        this.pendingLeaves = this.leaveApplications.filter((l) => l.status === 'Pending').length;
        this.approvedLeaves = this.leaveApplications.filter((l) => l.status === 'Approved').length;
        this.rejectedLeaves = this.leaveApplications.filter((l) => l.status === 'Rejected').length;
        this.totalDaysTaken = this.leaveApplications
            .filter((l) => l.status === 'Approved')
            .reduce((sum, l) => sum + (l.total_days || 0), 0);
        // Compute most used leave type (by name)
        const typeCount = {};
        for (const leave of this.leaveApplications) {
            const typeId = leave.leave_type_id;
            if (!typeCount[typeId])
                typeCount[typeId] = 0;
            typeCount[typeId]++;
        }
        let max = 0;
        let mostUsedTypeId = '';
        for (const typeId in typeCount) {
            if (typeCount[typeId] > max) {
                max = typeCount[typeId];
                mostUsedTypeId = typeId;
            }
        }
        // Find the name from leaveTypes or from the first matching leaveApplication
        let mostUsedTypeName = 'N/A';
        if (mostUsedTypeId) {
            // Try to get from leaveTypes first
            const foundType = this.leaveTypes.find(t => t.id === mostUsedTypeId);
            if (foundType) {
                mostUsedTypeName = foundType.leave_type_name;
            }
            else {
                // Fallback: get from leaveApplications
                const foundApp = this.leaveApplications.find(l => l.leave_type_id === mostUsedTypeId);
                if (foundApp && foundApp.leave_type && foundApp.leave_type.leave_type_name) {
                    mostUsedTypeName = foundApp.leave_type.leave_type_name;
                }
            }
        }
        this.mostUsedType = mostUsedTypeName;
    }
};
exports.LeaveEmployeeComponent = LeaveEmployeeComponent;
exports.LeaveEmployeeComponent = LeaveEmployeeComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-leave-employee',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpClientModule],
        templateUrl: './leave-employee.component.html',
        styleUrls: ['./leave-employee.component.scss']
    }),
    __metadata("design:paramtypes", [leave_employee_service_1.LeaveEmployeeService,
        forms_2.FormBuilder])
], LeaveEmployeeComponent);
//# sourceMappingURL=leave-employee.component.js.map