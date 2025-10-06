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
exports.UserFormModalComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const user_management_service_1 = require("../user-management.service");
let UserFormModalComponent = class UserFormModalComponent {
    fb;
    userService;
    isOpen = false;
    user = null;
    isEdit = false;
    close = new core_1.EventEmitter();
    userSaved = new core_1.EventEmitter();
    userForm;
    loading = false;
    error = null;
    availableRoles = [];
    availableStatuses = [];
    constructor(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.userForm = this.fb.group({
            username: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            role: ['', forms_1.Validators.required],
            status: ['Active', forms_1.Validators.required],
            profilePicture: ['']
        });
    }
    ngOnInit() {
        // Initialize available options
        this.availableRoles = this.userService.getAvailableRoles();
        this.availableStatuses = this.userService.getAvailableStatuses();
        this.initializeForm();
    }
    ngOnChanges(changes) {
        // Handle changes to user data or edit mode
        if (changes['user'] || changes['isEdit']) {
            this.initializeForm();
        }
    }
    initializeForm() {
        if (this.isEdit && this.user) {
            // Populate form with user data
            this.userForm.patchValue({
                username: this.user.username,
                email: this.user.email,
                role: this.user.role,
                status: this.user.status,
                profilePicture: this.user.profilePicture || ''
            });
            // Disable username and email fields in edit mode
            this.userForm.get('username')?.disable();
            this.userForm.get('email')?.disable();
            // Remove password requirement for edit mode
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
        }
        else {
            // Reset form for create mode
            this.userForm.reset({
                role: 'Employee',
                status: 'Active',
                profilePicture: ''
            });
            // Enable username and email fields for create mode
            this.userForm.get('username')?.enable();
            this.userForm.get('email')?.enable();
            // Add password requirement for create mode
            this.userForm.get('password')?.setValidators([forms_1.Validators.required, forms_1.Validators.minLength(6)]);
            this.userForm.get('password')?.updateValueAndValidity();
        }
    }
    onClose() {
        this.userForm.reset();
        this.error = null;
        this.close.emit();
    }
    onSubmit() {
        if (this.userForm.valid) {
            this.loading = true;
            this.error = null;
            const formData = this.userForm.value;
            if (this.isEdit && this.user) {
                // Update user - get disabled field values from raw form value
                const updateData = {
                    username: this.userForm.getRawValue().username,
                    email: this.userForm.getRawValue().email,
                    role: formData.role,
                    status: formData.status,
                    profilePicture: formData.profilePicture || undefined
                };
                this.userService.updateUser(this.user.id, updateData).subscribe({
                    next: (response) => {
                        if (response.success && response.data) {
                            this.userSaved.emit(response.data);
                            this.onClose();
                        }
                        else {
                            this.error = response.error?.message || 'Failed to update user';
                        }
                        this.loading = false;
                    },
                    error: (error) => {
                        console.error('Error updating user:', error);
                        this.error = 'Failed to update user. Please try again.';
                        this.loading = false;
                    }
                });
            }
            else {
                // Create user
                const createData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    profilePicture: formData.profilePicture || undefined
                };
                this.userService.createUser(createData).subscribe({
                    next: (response) => {
                        if (response.success && response.data) {
                            this.userSaved.emit(response.data);
                            this.onClose();
                        }
                        else {
                            this.error = response.error?.message || 'Failed to create user';
                        }
                        this.loading = false;
                    },
                    error: (error) => {
                        console.error('Error creating user:', error);
                        this.error = 'Failed to create user. Please try again.';
                        this.loading = false;
                    }
                });
            }
        }
        else {
            this.markFormGroupTouched();
        }
    }
    markFormGroupTouched() {
        Object.keys(this.userForm.controls).forEach(key => {
            const control = this.userForm.get(key);
            control?.markAsTouched();
        });
    }
    getFieldError(fieldName) {
        const field = this.userForm.get(fieldName);
        if (field?.errors && field.touched) {
            if (field.errors['required']) {
                return `${this.getFieldLabel(fieldName)} is required`;
            }
            if (field.errors['email']) {
                return 'Please enter a valid email address';
            }
            if (field.errors['minlength']) {
                const requiredLength = field.errors['minlength'].requiredLength;
                return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
            }
        }
        return '';
    }
    getFieldLabel(fieldName) {
        const labels = {
            username: 'Username',
            email: 'Email',
            password: 'Password',
            role: 'Role',
            status: 'Status',
            profilePicture: 'Profile Picture'
        };
        return labels[fieldName] || fieldName;
    }
    isFieldInvalid(fieldName) {
        const field = this.userForm.get(fieldName);
        return !!(field?.invalid && field.touched);
    }
};
exports.UserFormModalComponent = UserFormModalComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], UserFormModalComponent.prototype, "isOpen", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], UserFormModalComponent.prototype, "user", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], UserFormModalComponent.prototype, "isEdit", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], UserFormModalComponent.prototype, "close", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], UserFormModalComponent.prototype, "userSaved", void 0);
exports.UserFormModalComponent = UserFormModalComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-user-form-modal',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        templateUrl: './user-form-modal.component.html',
        styleUrls: ['./user-form-modal.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        user_management_service_1.UserManagementService])
], UserFormModalComponent);
//# sourceMappingURL=user-form-modal.component.js.map