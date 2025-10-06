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
exports.JobApplicationModalComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const job_portal_auth_service_1 = require("../job-portal-auth.service");
const auth_service_1 = require("../../../services/auth.service");
const user_details_service_1 = require("../../../services/user-details.service");
let JobApplicationModalComponent = class JobApplicationModalComponent {
    jobPortalAuthService;
    fb;
    authService;
    userDetailsService;
    job;
    showModal = false;
    close = new core_1.EventEmitter();
    applicationSubmitted = new core_1.EventEmitter();
    fileInput;
    modalBody;
    applicant = null;
    applicationForm;
    _currentStep = 1;
    totalSteps = 4; // Updated to 4 steps
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(value) {
        if (this._currentStep !== value) {
            this._currentStep = value;
            // Scroll to top when step changes
            setTimeout(() => {
                this.scrollToTop();
            }, 0);
        }
    }
    isLoading = false;
    submitted = false;
    confirmationChecked = false; // Track confirmation checkbox state
    // Auto-filled user details
    firstName = '';
    middleName = '';
    lastName = '';
    email = '';
    contact = '';
    // File upload properties
    uploadedDocuments = [];
    isDragOver = false;
    maxFileSize = 10 * 1024 * 1024; // 10MB
    allowedFileTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    constructor(jobPortalAuthService, fb, authService, userDetailsService) {
        this.jobPortalAuthService = jobPortalAuthService;
        this.fb = fb;
        this.authService = authService;
        this.userDetailsService = userDetailsService;
        this.applicationForm = this.fb.group({
            position_id: ['', forms_1.Validators.required],
            applicant_id: ['', forms_1.Validators.required],
            cover_letter: ['', [forms_1.Validators.required, forms_1.Validators.minLength(100)]],
            status: ['Pending', forms_1.Validators.required],
            application_date: [new Date(), forms_1.Validators.required],
            withdrawn_date: [null],
            remarks: ['', forms_1.Validators.maxLength(500)]
        });
    }
    ngOnInit() {
        // Check if user is authenticated and has Applicant role
        if (!this.authService.isAuthenticated() || !this.authService.hasRole('Applicant')) {
            console.warn('User is not authenticated or does not have Applicant role');
            this.closeModal();
            return;
        }
        // Fetch user details from database
        this.fetchUserDetailsFromDatabase();
    }
    fetchUserDetailsFromDatabase() {
        this.isLoading = true;
        this.userDetailsService.getCurrentUserDetails().subscribe({
            next: (userDetails) => {
                console.log('✅ Fetched user details from database:', userDetails);
                // Populate user details from database
                this.firstName = userDetails.first_name;
                this.middleName = userDetails.middle_name || '';
                this.lastName = userDetails.last_name;
                this.email = userDetails.email;
                this.contact = userDetails.contact_number || userDetails.phone || '';
                // Initialize form with fetched data
                this.initializeForm();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('❌ Error fetching user details from database:', error);
                // Show user-friendly error message
                if (error.status === 401) {
                    console.warn('User not authenticated, redirecting to login');
                    this.closeModal();
                    return;
                }
                // Fallback to existing method if database fetch fails
                console.log('🔄 Falling back to local user data');
                this.applicant = this.jobPortalAuthService.getCurrentApplicant();
                this.populateUserDetails();
                this.initializeForm();
                this.isLoading = false;
            }
        });
    }
    populateUserDetails() {
        if (this.applicant) {
            this.firstName = this.applicant.first_name;
            this.middleName = this.applicant.middle_name || '';
            this.lastName = this.applicant.last_name;
            this.email = this.applicant.email;
            this.contact = this.applicant.phone;
        }
    }
    initializeForm() {
        if (this.job) {
            // For job applicants, get the applicant profile from the API
            if (this.authService.hasRole('Applicant')) {
                this.jobPortalAuthService.getCurrentApplicantProfile().subscribe({
                    next: (applicant) => {
                        this.applicationForm.patchValue({
                            position_id: this.job.id,
                            applicant_id: applicant.id,
                            application_date: new Date()
                        });
                    },
                    error: (error) => {
                        console.error('Error getting current applicant profile:', error);
                    }
                });
            }
        }
    }
    scrollToTop() {
        if (this.modalBody && this.modalBody.nativeElement) {
            this.modalBody.nativeElement.scrollTop = 0;
        }
    }
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }
    goToStep(step) {
        if (step >= 1 && step <= this.totalSteps) {
            this.currentStep = step;
        }
    }
    isStepValid() {
        switch (this.currentStep) {
            case 1:
                return !!(this.firstName && this.lastName && this.email && this.contact);
            case 2:
                return this.applicationForm.get('cover_letter')?.valid || false;
            case 3:
                return this.uploadedDocuments.length > 0; // Application documents step - valid when documents are uploaded
            case 4:
                return this.applicationForm.valid;
            default:
                return false;
        }
    }
    isStepCompleted(step) {
        switch (step) {
            case 1:
                return !!(this.firstName && this.lastName && this.email && this.contact);
            case 2:
                return this.applicationForm.get('cover_letter')?.valid || false;
            case 3:
                return this.uploadedDocuments.length > 0; // Application documents step - completed when documents are uploaded
            case 4:
                return this.applicationForm.valid && this.uploadedDocuments.length > 0;
            default:
                return false;
        }
    }
    canClickStep(step) {
        // Steps 1 and 4 are always clickable
        if (step === 1) {
            return true;
        }
        // For other steps, check if the previous step is completed
        const previousStep = step - 1;
        return this.isStepCompleted(previousStep);
    }
    isNextActiveStep(step) {
        // A step is next active if:
        // 1. It's not the current step
        // 2. It's not completed
        // 3. The previous step is completed
        // 4. It's the next step after the current step
        if (step === this.currentStep || this.isStepCompleted(step)) {
            return false;
        }
        const previousStep = step - 1;
        return this.isStepCompleted(previousStep) && step === this.currentStep + 1;
    }
    submitApplication() {
        this.submitted = true;
        if (this.applicationForm.valid) {
            this.isLoading = true;
            const applicationData = {
                ...this.applicationForm.value,
                application_date: new Date()
            };
            console.log('Submitting job application:', applicationData);
            // Emit the application data to parent component
            this.applicationSubmitted.emit(applicationData);
            // Simulate API call delay
            setTimeout(() => {
                this.isLoading = false;
                this.closeModal();
            }, 1000);
        }
    }
    closeModal() {
        this.close.emit();
    }
    getStepProgress() {
        return (this.currentStep / this.totalSteps) * 100;
    }
    getStepTitle(step) {
        switch (step) {
            case 1: return 'Personal Information';
            case 2: return 'Cover Letter';
            case 3: return 'Application Documents';
            case 4: return 'Confirmation';
            default: return '';
        }
    }
    getStepDescription(step) {
        switch (step) {
            case 1: return 'Verify your personal information';
            case 2: return 'Write your cover letter and confirm position details';
            case 3: return 'Upload required documents';
            case 4: return 'Complete assessments and review';
            default: return '';
        }
    }
    getCoverLetterLength() {
        return this.applicationForm.get('cover_letter')?.value?.length || 0;
    }
    getRemarksLength() {
        return this.applicationForm.get('remarks')?.value?.length || 0;
    }
    // File upload methods
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = true;
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragOver = false;
        const files = event.dataTransfer?.files;
        if (files) {
            this.handleFiles(Array.from(files));
        }
    }
    onFileSelected(event) {
        const input = event.target;
        if (input.files) {
            this.handleFiles(Array.from(input.files));
        }
    }
    handleFiles(files) {
        files.forEach(file => {
            if (this.validateFile(file)) {
                this.addFile(file);
            }
        });
    }
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            return false;
        }
        // Check file type
        if (!this.allowedFileTypes.includes(file.type)) {
            alert(`File "${file.name}" is not a supported file type. Please upload PDF, Word, or image files.`);
            return false;
        }
        // Check if file already exists
        const existingFile = this.uploadedDocuments.find(doc => doc.name === file.name);
        if (existingFile) {
            alert(`File "${file.name}" has already been uploaded.`);
            return false;
        }
        return true;
    }
    addFile(file) {
        const document = {
            id: this.generateId(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            uploadDate: new Date()
        };
        this.uploadedDocuments.push(document);
        console.log('File added:', document);
    }
    removeFile(documentId) {
        this.uploadedDocuments = this.uploadedDocuments.filter(doc => doc.id !== documentId);
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    getFileIcon(fileType) {
        if (fileType.includes('pdf'))
            return 'picture_as_pdf';
        if (fileType.includes('word') || fileType.includes('document'))
            return 'description';
        if (fileType.includes('image'))
            return 'image';
        return 'insert_drive_file';
    }
    onConfirmationChange(checked) {
        this.confirmationChecked = checked;
    }
    onConfirmationCheckboxChange(event) {
        const target = event.target;
        this.confirmationChecked = target.checked;
    }
};
exports.JobApplicationModalComponent = JobApplicationModalComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], JobApplicationModalComponent.prototype, "job", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Boolean)
], JobApplicationModalComponent.prototype, "showModal", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], JobApplicationModalComponent.prototype, "close", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], JobApplicationModalComponent.prototype, "applicationSubmitted", void 0);
__decorate([
    (0, core_1.ViewChild)('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], JobApplicationModalComponent.prototype, "fileInput", void 0);
__decorate([
    (0, core_1.ViewChild)('modalBody'),
    __metadata("design:type", core_1.ElementRef)
], JobApplicationModalComponent.prototype, "modalBody", void 0);
exports.JobApplicationModalComponent = JobApplicationModalComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-job-application-modal',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        templateUrl: './job-application-modal.component.html',
        styleUrls: ['./job-application-modal.component.scss']
    }),
    __metadata("design:paramtypes", [job_portal_auth_service_1.JobPortalAuthService,
        forms_1.FormBuilder,
        auth_service_1.AuthService,
        user_details_service_1.UserDetailsService])
], JobApplicationModalComponent);
//# sourceMappingURL=job-application-modal.component.js.map