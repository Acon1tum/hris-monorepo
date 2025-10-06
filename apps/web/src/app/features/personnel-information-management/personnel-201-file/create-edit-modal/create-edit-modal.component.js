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
exports.CreateEditModalComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
let CreateEditModalComponent = class CreateEditModalComponent {
    renderer;
    http;
    mode = 'create';
    data = {
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        email: '',
        number: '',
        address: '',
        department: '',
        position: '',
        file: null,
        birthdate: '',
        gender: '',
        civilStatus: '',
        employmentType: '',
        designation: '',
        appointmentDate: '',
        startDate: '',
        employmentStatus: '',
        jobLevel: '',
        jobGrade: '',
        gsis: '',
        pagibig: '',
        philhealth: '',
        sss: '',
        tin_number: '',
        dependents: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        emergencyContactRelationship: '',
        fileName: '',
        profilePictureUrl: '',
        profilePictureFile: null,
        username: '',
        password: '',
        confirmPassword: '',
        profilePictureBase64: undefined
    };
    departments = [];
    loading = false;
    save = new core_1.EventEmitter();
    cancel = new core_1.EventEmitter();
    personnelId = '';
    uploadDocuments = new core_1.EventEmitter();
    refreshTable = new core_1.EventEmitter();
    fadeSections;
    modalForm;
    lastScrollTop = 0;
    constructor(renderer, http) {
        this.renderer = renderer;
        this.http = http;
    }
    isDragOver = false;
    showFloatingProfile = false;
    closing = false;
    formSubmitted = false;
    showValidationMessage = false;
    selectedFiles = [];
    fileMetas = [];
    onWindowScroll() {
        const scrollThreshold = 150;
        this.showFloatingProfile = window.scrollY > scrollThreshold;
    }
    onDragOver(event) {
        event.preventDefault();
        this.isDragOver = true;
    }
    onDragLeave(event) {
        event.preventDefault();
        this.isDragOver = false;
    }
    onFileChange(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            for (let i = 0; i < input.files.length; i++) {
                this.selectedFiles.push(input.files[i]);
                this.fileMetas.push({ title: input.files[i].name, description: '' });
            }
        }
    }
    onFileDrop(event) {
        event.preventDefault();
        this.isDragOver = false;
        if (event.dataTransfer?.files) {
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
                this.selectedFiles.push(event.dataTransfer.files[i]);
                this.fileMetas.push({ title: event.dataTransfer.files[i].name, description: '' });
            }
        }
    }
    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.fileMetas.splice(index, 1);
    }
    onProfilePictureChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.data.profilePictureFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.data.profilePictureUrl = e.target.result;
                this.data.profilePictureBase64 = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    removeProfilePicture() {
        this.data.profilePictureFile = null;
        this.data.profilePictureUrl = '';
        this.data.profilePictureBase64 = null;
    }
    async onSave() {
        this.formSubmitted = true;
        if (this.modalForm && !this.modalForm.form.valid) {
            this.showValidationMessage = true;
            return;
        }
        if (this.mode === 'create') {
            // Generate username from email
            this.data.username = this.generateUsernameFromEmail();
            // Enhanced password validation
            if (!this.data.password || !this.data.confirmPassword) {
                this.showValidationMessage = true;
                return;
            }
            // Check password strength
            const passwordValidation = this.validatePassword(this.data.password);
            if (!passwordValidation.isValid) {
                this.showValidationMessage = true;
                return;
            }
            // Check if passwords match
            if (this.data.password !== this.data.confirmPassword) {
                this.showValidationMessage = true;
                return;
            }
        }
        this.save.emit({ ...this.data });
        this.refreshTable.emit();
        if (this.selectedFiles.length > 0) {
            this.uploadDocuments.emit({ files: this.selectedFiles, metas: this.fileMetas });
        }
    }
    // Password validation method
    validatePassword(password) {
        const errors = [];
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        return {
            isValid: errors.length === 0,
            errors
        };
    }
    // Password strength indicator methods
    getPasswordStrengthClass() {
        if (!this.data.password)
            return '';
        const validation = this.validatePassword(this.data.password);
        const strength = 5 - validation.errors.length;
        if (strength <= 1)
            return 'weak';
        if (strength <= 3)
            return 'medium';
        return 'strong';
    }
    getPasswordStrengthText() {
        if (!this.data.password)
            return '';
        const validation = this.validatePassword(this.data.password);
        const strength = 5 - validation.errors.length;
        if (strength <= 1)
            return 'Weak';
        if (strength <= 3)
            return 'Medium';
        return 'Strong';
    }
    hasUppercase() {
        return /[A-Z]/.test(this.data.password || '');
    }
    hasLowercase() {
        return /[a-z]/.test(this.data.password || '');
    }
    hasNumber() {
        return /\d/.test(this.data.password || '');
    }
    hasSpecialChar() {
        return /[!@#$%^&*(),.?":{}|<>]/.test(this.data.password || '');
    }
    generateUsernameFromEmail() {
        if (!this.data.email) {
            return '';
        }
        // Extract the part before @ and remove any special characters
        const emailPart = this.data.email.split('@')[0];
        return emailPart.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    }
    hideValidationMessage() {
        this.showValidationMessage = false;
    }
    onCancel() {
        this.closing = true;
        setTimeout(() => {
            this.cancel.emit();
            this.closing = false;
        }, 400); // match animation duration
    }
    ngAfterViewInit() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollingUp = scrollTop < this.lastScrollTop;
                this.lastScrollTop = scrollTop;
                if (entry.isIntersecting && scrollingUp) {
                    this.renderer.addClass(entry.target, 'in-view');
                }
                else if (!entry.isIntersecting) {
                    this.renderer.removeClass(entry.target, 'in-view');
                }
            });
        }, { threshold: 0.1 });
        this.fadeSections.forEach(section => {
            observer.observe(section.nativeElement);
        });
    }
    noop(event) {
        // Do nothing, just prevent propagation
        event.stopPropagation();
    }
};
exports.CreateEditModalComponent = CreateEditModalComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], CreateEditModalComponent.prototype, "mode", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "data", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Array)
], CreateEditModalComponent.prototype, "departments", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], CreateEditModalComponent.prototype, "loading", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "save", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "cancel", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], CreateEditModalComponent.prototype, "personnelId", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "uploadDocuments", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "refreshTable", void 0);
__decorate([
    (0, core_1.ViewChildren)('fadeSection', { read: core_1.ElementRef }),
    __metadata("design:type", core_1.QueryList)
], CreateEditModalComponent.prototype, "fadeSections", void 0);
__decorate([
    (0, core_1.ViewChild)('modalForm'),
    __metadata("design:type", Object)
], CreateEditModalComponent.prototype, "modalForm", void 0);
__decorate([
    (0, core_1.HostListener)('window:scroll', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CreateEditModalComponent.prototype, "onWindowScroll", null);
exports.CreateEditModalComponent = CreateEditModalComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-create-edit-modal',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './create-edit-modal.component.html',
        styleUrls: ['./create-edit-modal.component.scss']
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, http_1.HttpClient])
], CreateEditModalComponent);
//# sourceMappingURL=create-edit-modal.component.js.map