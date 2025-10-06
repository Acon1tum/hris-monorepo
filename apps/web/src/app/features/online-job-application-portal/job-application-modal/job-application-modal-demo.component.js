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
exports.JobApplicationModalDemoComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const job_application_modal_component_1 = require("./job-application-modal.component");
const login_prompt_modal_component_1 = require("./login-prompt-modal.component");
const auth_service_1 = require("../../../services/auth.service");
let JobApplicationModalDemoComponent = class JobApplicationModalDemoComponent {
    authService;
    showApplicationModal = false;
    showLoginPromptModal = false;
    selectedJob = {
        id: 'job-123',
        position_title: 'Software Engineer',
        department: {
            department_name: 'IT Department'
        },
        job_description: 'We are looking for a talented software engineer...',
        qualifications: 'Bachelor\'s degree in Computer Science or related field...',
        salary_range: '$60,000 - $80,000',
        employment_type: 'Regular',
        num_vacancies: 2,
        application_deadline: new Date('2024-12-31')
    };
    constructor(authService) {
        this.authService = authService;
    }
    openModal() {
        // Check if user is authenticated and has Applicant role
        if (this.authService.isAuthenticated() && this.authService.hasRole('Applicant')) {
            // User is logged in as Applicant - show application modal
            this.showApplicationModal = true;
        }
        else {
            // User is not authenticated or not an Applicant - show login prompt
            this.showLoginPromptModal = true;
        }
    }
    closeApplicationModal() {
        this.showApplicationModal = false;
    }
    closeLoginPromptModal() {
        this.showLoginPromptModal = false;
    }
    onLoginPromptContinue() {
        this.closeLoginPromptModal();
        // The login prompt modal will handle navigation to login page
    }
    onApplicationSubmitted(applicationData) {
        console.log('Application submitted:', applicationData);
        // Here you would typically send the data to your backend API
        // Example API call:
        // this.jobApplicationService.submitApplication(applicationData).subscribe({
        //   next: (response) => {
        //     console.log('Application submitted successfully:', response);
        //     this.showSuccessMessage('Application submitted successfully!');
        //   },
        //   error: (error) => {
        //     console.error('Error submitting application:', error);
        //     this.showErrorMessage('Failed to submit application. Please try again.');
        //   }
        // });
        // For demo purposes, just show a success message
        alert('Application submitted successfully!');
        this.closeModal();
    }
};
exports.JobApplicationModalDemoComponent = JobApplicationModalDemoComponent;
exports.JobApplicationModalDemoComponent = JobApplicationModalDemoComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-job-application-modal-demo',
        standalone: true,
        imports: [common_1.CommonModule, job_application_modal_component_1.JobApplicationModalComponent, login_prompt_modal_component_1.LoginPromptModalComponent],
        template: `
    <div class="demo-container">
      <h2>Job Application Modal Demo</h2>
      
      <div class="demo-job-card">
        <h3>Software Engineer</h3>
        <p>IT Department</p>
        <p>Full-time position with competitive salary</p>
        <button class="btn btn-primary" (click)="openModal()">
          Apply Now
        </button>
      </div>

      <!-- Job Application Modal -->
      <app-job-application-modal
        [showModal]="showApplicationModal"
        [job]="selectedJob"
        (close)="closeApplicationModal()"
        (applicationSubmitted)="onApplicationSubmitted($event)"
      ></app-job-application-modal>

      <!-- Login Prompt Modal -->
      <app-login-prompt-modal
        [showModal]="showLoginPromptModal"
        [job]="selectedJob"
        (close)="closeLoginPromptModal()"
        (continueToLogin)="onLoginPromptContinue()"
      ></app-login-prompt-modal>
    </div>
  `,
        styles: [`
    .demo-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .demo-job-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;

      h3 {
        margin: 0 0 8px 0;
        color: #2c3e50;
      }

      p {
        margin: 0 0 8px 0;
        color: #6c757d;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;

        &.btn-primary {
          background-color: #667eea;
          color: white;

          &:hover {
            background-color: #5a6fd8;
            transform: translateY(-1px);
          }
        }
      }
    }
  `]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], JobApplicationModalDemoComponent);
//# sourceMappingURL=job-application-modal-demo.component.js.map