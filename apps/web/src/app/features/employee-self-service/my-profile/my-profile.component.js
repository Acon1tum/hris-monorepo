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
exports.MyProfileComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const employee_self_service_service_1 = require("../../../services/employee-self-service.service");
let MyProfileComponent = class MyProfileComponent {
    employeeSelfService;
    fb;
    userProfile = null;
    loading = false;
    error = null;
    showEditModal = false;
    savingEdit = false;
    editProfileForm;
    toastMessage = '';
    showToast = false;
    showToastNotification(message) {
        this.toastMessage = message;
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
        }, 2500);
    }
    constructor(employeeSelfService, fb) {
        this.employeeSelfService = employeeSelfService;
        this.fb = fb;
        this.editProfileForm = this.fb.group({
            firstName: ['', forms_1.Validators.required],
            middleName: [''],
            lastName: ['', forms_1.Validators.required],
            birthdate: [''],
            contactNumber: [''],
            address: [''],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            gender: [''],
            civilStatus: [''],
            citizenship: [''],
            // Employment
            employmentType: [''],
            designation: [''],
            department: [''],
            appointmentDate: [''],
            startDate: [''],
            employmentStatus: [''],
            jobLevel: [''],
            jobGrade: [''],
            // Membership
            gsis: [''],
            pagibig: [''],
            philhealth: [''],
            sss: ['']
        });
    }
    ngOnInit() {
        this.fetchProfile();
    }
    fetchProfile() {
        this.loading = true;
        this.error = null;
        this.employeeSelfService.fetchMyProfile().subscribe({
            next: (res) => {
                if (res.success) {
                    this.userProfile = res.data;
                    this.patchEditProfileForm();
                }
                else {
                    this.error = res.message || 'Failed to load profile';
                }
                this.loading = false;
            },
            error: (err) => {
                this.error = err.message || 'Error loading profile';
                this.loading = false;
            }
        });
    }
    patchEditProfileForm() {
        if (this.userProfile) {
            this.editProfileForm.patchValue({
                firstName: this.userProfile.general.firstName,
                middleName: this.userProfile.general.middleName,
                lastName: this.userProfile.general.lastName,
                birthdate: this.userProfile.general.birthdate ? this.formatDateForInput(this.userProfile.general.birthdate) : '',
                contactNumber: this.userProfile.general.contactNumber,
                address: this.userProfile.general.address,
                email: this.userProfile.general.email,
                gender: this.userProfile.general.gender,
                civilStatus: this.userProfile.general.civilStatus,
                citizenship: this.userProfile.general.citizenship,
                employmentType: this.userProfile.employment.employmentType,
                designation: this.userProfile.employment.designation,
                department: this.userProfile.employment.department,
                appointmentDate: this.userProfile.employment.appointmentDate ? this.formatDateForInput(this.userProfile.employment.appointmentDate) : '',
                startDate: this.userProfile.employment.startDate ? this.formatDateForInput(this.userProfile.employment.startDate) : '',
                employmentStatus: this.userProfile.employment.employmentStatus,
                jobLevel: this.userProfile.employment.jobLevel,
                jobGrade: this.userProfile.employment.jobGrade,
                gsis: this.userProfile.membership.gsis,
                pagibig: this.userProfile.membership.pagibig,
                philhealth: this.userProfile.membership.philhealth,
                sss: this.userProfile.membership.sss
            });
        }
    }
    formatDateForInput(dateStr) {
        // Converts MM/DD/YYYY or similar to YYYY-MM-DD for input type="date"
        const d = new Date(dateStr);
        if (isNaN(d.getTime()))
            return '';
        return d.toISOString().substring(0, 10);
    }
    onEditProfile() {
        this.patchEditProfileForm();
        // Disable fields that should not be editable
        this.editProfileForm.get('gender')?.disable();
        this.editProfileForm.get('civilStatus')?.disable();
        this.editProfileForm.get('department')?.disable();
        this.showEditModal = true;
    }
    onCancelEditProfile() {
        this.showEditModal = false;
        this.editProfileForm.reset();
        // Re-enable fields when modal is closed
        this.editProfileForm.get('gender')?.enable();
        this.editProfileForm.get('civilStatus')?.enable();
        this.editProfileForm.get('department')?.enable();
    }
    onSaveEditProfile() {
        if (this.editProfileForm.valid && this.userProfile) {
            this.savingEdit = true;
            const updatePayload = {
                firstName: this.editProfileForm.value.firstName,
                middleName: this.editProfileForm.value.middleName,
                lastName: this.editProfileForm.value.lastName,
                birthdate: this.editProfileForm.value.birthdate,
                contactNumber: this.editProfileForm.value.contactNumber,
                address: this.editProfileForm.value.address,
                email: this.editProfileForm.value.email,
                gender: this.editProfileForm.value.gender,
                civilStatus: this.editProfileForm.value.civilStatus,
                citizenship: this.editProfileForm.value.citizenship,
                employmentType: this.editProfileForm.value.employmentType,
                designation: this.editProfileForm.value.designation,
                department: this.editProfileForm.value.department,
                appointmentDate: this.editProfileForm.value.appointmentDate,
                startDate: this.editProfileForm.value.startDate,
                employmentStatus: this.editProfileForm.value.employmentStatus,
                jobLevel: this.editProfileForm.value.jobLevel,
                jobGrade: this.editProfileForm.value.jobGrade,
                gsis: this.editProfileForm.value.gsis,
                pagibig: this.editProfileForm.value.pagibig,
                philhealth: this.editProfileForm.value.philhealth,
                sss: this.editProfileForm.value.sss
            };
            this.employeeSelfService.updateMyProfile(updatePayload).subscribe({
                next: (res) => {
                    // Optimistic UI update
                    Object.assign(this.userProfile.general, {
                        firstName: updatePayload.firstName,
                        middleName: updatePayload.middleName,
                        lastName: updatePayload.lastName,
                        birthdate: updatePayload.birthdate,
                        contactNumber: updatePayload.contactNumber,
                        address: updatePayload.address,
                        email: updatePayload.email,
                        gender: updatePayload.gender,
                        civilStatus: updatePayload.civilStatus,
                        citizenship: updatePayload.citizenship
                    });
                    Object.assign(this.userProfile.employment, {
                        employmentType: updatePayload.employmentType,
                        designation: updatePayload.designation,
                        department: updatePayload.department,
                        appointmentDate: updatePayload.appointmentDate,
                        startDate: updatePayload.startDate,
                        employmentStatus: updatePayload.employmentStatus,
                        jobLevel: updatePayload.jobLevel,
                        jobGrade: updatePayload.jobGrade
                    });
                    Object.assign(this.userProfile.membership, {
                        gsis: updatePayload.gsis,
                        pagibig: updatePayload.pagibig,
                        philhealth: updatePayload.philhealth,
                        sss: updatePayload.sss
                    });
                    this.savingEdit = false;
                    this.showEditModal = false;
                    this.showToastNotification('Profile updated successfully!');
                    this.fetchProfile(); // Refresh profile after update
                },
                error: (err) => {
                    this.savingEdit = false;
                    alert('Failed to update profile: ' + (err.message || 'Unknown error'));
                }
            });
        }
    }
    // Helper methods for template - organized field data for clean display
    get generalInformationFields() {
        if (!this.userProfile)
            return [];
        return [
            { label: 'First Name', value: this.userProfile.general.firstName },
            { label: 'Middle Name', value: this.userProfile.general.middleName },
            { label: 'Last Name', value: this.userProfile.general.lastName },
            { label: 'Birthdate', value: this.userProfile.general.birthdate },
            { label: 'Contact Number', value: this.userProfile.general.contactNumber },
            { label: 'Address', value: this.userProfile.general.address },
            { label: 'Email', value: this.userProfile.general.email },
            { label: 'Gender', value: this.userProfile.general.gender },
            { label: 'Civil Status', value: this.userProfile.general.civilStatus },
            { label: 'Citizenship', value: this.userProfile.general.citizenship }
        ];
    }
    get employmentDetailsFields() {
        if (!this.userProfile)
            return [];
        return [
            { label: 'Employment Type', value: this.userProfile.employment.employmentType },
            { label: 'Designation', value: this.userProfile.employment.designation },
            { label: 'Department', value: this.userProfile.employment.department },
            { label: 'Appointment Date', value: this.userProfile.employment.appointmentDate },
            { label: 'Start Date', value: this.userProfile.employment.startDate },
            { label: 'Employment Status', value: this.userProfile.employment.employmentStatus },
            { label: 'Job Level', value: this.userProfile.employment.jobLevel },
            { label: 'Job Grade', value: this.userProfile.employment.jobGrade }
        ];
    }
    get membershipInformationFields() {
        if (!this.userProfile)
            return [];
        return [
            { label: 'GSIS', value: this.userProfile.membership.gsis },
            { label: 'Pag-IBIG', value: this.userProfile.membership.pagibig },
            { label: 'PhilHealth', value: this.userProfile.membership.philhealth },
            { label: 'SSS', value: this.userProfile.membership.sss }
        ];
    }
    get otherInformationFields() {
        if (!this.userProfile)
            return [];
        return [
            { label: 'Dependents', value: this.userProfile.other.dependents },
            { label: 'Emergency Contact Name', value: this.userProfile.other.emergencyContactName },
            { label: 'Emergency Contact Number', value: this.userProfile.other.emergencyContactNumber },
            { label: 'Emergency Contact Relationship', value: this.userProfile.other.emergencyContactRelationship }
        ];
    }
};
exports.MyProfileComponent = MyProfileComponent;
exports.MyProfileComponent = MyProfileComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-my-profile',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
        templateUrl: './my-profile.component.html',
        styleUrls: ['./my-profile.component.scss']
    }),
    __metadata("design:paramtypes", [employee_self_service_service_1.EmployeeSelfService, forms_1.FormBuilder])
], MyProfileComponent);
//# sourceMappingURL=my-profile.component.js.map