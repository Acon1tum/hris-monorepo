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
exports.ApplicantDashboardComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const header_component_1 = require("../../../shared/header/header.component");
const interview_service_1 = require("./interview.service");
const rxjs_1 = require("rxjs");
let ApplicantDashboardComponent = class ApplicantDashboardComponent {
    router;
    interviewService;
    cdr;
    // Dashboard data
    isHeaderVisible = true;
    publicMode = false;
    applications = [];
    stats = {
        totalApplications: 0,
        pendingReview: 0,
        shortlisted: 0,
        interviews: 0,
        rejected: 0,
        accepted: 0,
        successRate: 0
    };
    recentActivities = [];
    // UI state
    loading = false;
    selectedFilter = 'all';
    searchTerm = '';
    currentView = 'overview';
    // Modal state
    showApplicationModal = false;
    selectedApplication = null;
    // Reactive search
    searchSubject = new rxjs_1.Subject();
    destroy$ = new rxjs_1.Subject();
    // Enhanced mock data with more realistic information
    mockApplications = [
        {
            id: '1',
            jobTitle: 'Senior Software Engineer',
            company: 'Quanby HRIS',
            department: 'IT Department',
            applicationDate: new Date('2024-01-15'),
            status: 'shortlisted',
            lastUpdated: new Date('2024-01-20'),
            applicationDeadline: new Date('2024-02-15'),
            salaryRange: '₱45,000 - ₱65,000',
            employmentType: 'Plantilla',
            location: 'Makati City, Metro Manila',
            description: 'Develop and maintain web applications using modern technologies',
            requirements: ['Angular', 'TypeScript', 'Node.js', '5+ years experience']
        },
        {
            id: '2',
            jobTitle: 'HR Specialist',
            company: 'Quanby HRIS',
            department: 'Human Resources',
            applicationDate: new Date('2024-01-10'),
            status: 'reviewing',
            lastUpdated: new Date('2024-01-18'),
            applicationDeadline: new Date('2024-02-10'),
            salaryRange: '₱25,000 - ₱35,000',
            employmentType: 'Plantilla',
            location: 'Quezon City, Metro Manila',
            description: 'Manage recruitment processes and employee relations',
            requirements: ['HR Management', 'Recruitment', 'Employee Relations', '3+ years experience']
        },
        {
            id: '3',
            jobTitle: 'Marketing Assistant',
            company: 'Quanby HRIS',
            department: 'Marketing',
            applicationDate: new Date('2024-01-05'),
            status: 'pending',
            lastUpdated: new Date('2024-01-05'),
            applicationDeadline: new Date('2024-02-05'),
            salaryRange: '₱18,000 - ₱25,000',
            employmentType: 'Contractual',
            location: 'Taguig City, Metro Manila',
            description: 'Support marketing campaigns and social media management',
            requirements: ['Digital Marketing', 'Social Media', 'Content Creation', '1+ year experience']
        },
        {
            id: '4',
            jobTitle: 'Senior Accountant',
            company: 'Quanby HRIS',
            department: 'Finance',
            applicationDate: new Date('2023-12-20'),
            status: 'rejected',
            lastUpdated: new Date('2024-01-10'),
            applicationDeadline: new Date('2024-01-20'),
            salaryRange: '₱35,000 - ₱45,000',
            employmentType: 'Plantilla',
            location: 'Manila City, Metro Manila',
            description: 'Manage financial records and prepare reports',
            requirements: ['CPA License', 'Financial Reporting', 'Tax Compliance', '5+ years experience']
        },
        {
            id: '5',
            jobTitle: 'UI/UX Designer',
            company: 'Quanby HRIS',
            department: 'Design',
            applicationDate: new Date('2024-01-12'),
            status: 'interviewed',
            lastUpdated: new Date('2024-01-22'),
            applicationDeadline: new Date('2024-02-12'),
            salaryRange: '₱30,000 - ₱45,000',
            employmentType: 'Plantilla',
            location: 'Makati City, Metro Manila',
            description: 'Create user-centered design solutions',
            requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '3+ years experience'],
            time: '10:00 AM - 11:00 AM'
        },
        {
            id: '6',
            jobTitle: 'Data Analyst',
            company: 'Quanby HRIS',
            department: 'Analytics',
            applicationDate: new Date('2024-01-08'),
            status: 'accepted',
            lastUpdated: new Date('2024-01-25'),
            applicationDeadline: new Date('2024-02-08'),
            salaryRange: '₱28,000 - ₱40,000',
            employmentType: 'Plantilla',
            location: 'BGC, Taguig City',
            description: 'Analyze data and create insights for business decisions',
            requirements: ['SQL', 'Python', 'Data Visualization', '2+ years experience']
        }
    ];
    mockActivities = [
        {
            id: '1',
            type: 'status_update',
            title: 'Application Status Updated',
            description: 'Your Senior Software Engineer application has been shortlisted',
            timestamp: new Date('2024-01-20T10:30:00'),
            status: 'shortlisted',
            applicationId: '1'
        },
        {
            id: '2',
            type: 'interview',
            title: 'Interview Scheduled',
            description: 'Interview scheduled for UI/UX Designer position on Jan 25, 2024',
            timestamp: new Date('2024-01-18T14:15:00'),
            status: 'interviewed',
            applicationId: '5'
        },
        {
            id: '3',
            type: 'application',
            title: 'New Application Submitted',
            description: 'Marketing Assistant application submitted successfully',
            timestamp: new Date('2024-01-05T09:45:00'),
            status: 'pending',
            applicationId: '3'
        },
        {
            id: '4',
            type: 'document',
            title: 'Document Uploaded',
            description: 'Portfolio updated for UI/UX Designer position',
            timestamp: new Date('2024-01-15T16:20:00'),
            applicationId: '5'
        },
        {
            id: '5',
            type: 'status_update',
            title: 'Application Accepted',
            description: 'Congratulations! Your Data Analyst application has been accepted',
            timestamp: new Date('2024-01-25T11:00:00'),
            status: 'accepted',
            applicationId: '6'
        },
        {
            id: '6',
            type: 'reminder',
            title: 'Application Deadline Reminder',
            description: 'Senior Software Engineer application deadline is approaching',
            timestamp: new Date('2024-01-22T08:00:00'),
            applicationId: '1'
        }
    ];
    constructor(router, interviewService, cdr) {
        this.router = router;
        this.interviewService = interviewService;
        this.cdr = cdr;
        this.setupSearchSubscription();
    }
    ngOnInit() {
        this.loadDashboardData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setupSearchSubscription() {
        this.searchSubject
            .pipe((0, rxjs_1.takeUntil)(this.destroy$), (0, rxjs_1.debounceTime)(300), (0, rxjs_1.distinctUntilChanged)())
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    loadDashboardData() {
        this.loading = true;
        this.cdr.markForCheck();
        // Simulate API call with better error handling
        setTimeout(() => {
            try {
                this.applications = [...this.mockApplications];
                this.recentActivities = [...this.mockActivities];
                this.calculateStats();
                this.updateInterviewService();
                this.loading = false;
                this.cdr.markForCheck();
            }
            catch (error) {
                console.error('Error loading dashboard data:', error);
                this.loading = false;
                this.cdr.markForCheck();
            }
        }, 1000);
    }
    calculateStats() {
        const total = this.applications.length;
        const accepted = this.applications.filter(app => app.status === 'accepted').length;
        const successRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
        this.stats = {
            totalApplications: total,
            pendingReview: this.applications.filter(app => app.status === 'pending').length,
            shortlisted: this.applications.filter(app => app.status === 'shortlisted').length,
            interviews: this.applications.filter(app => app.status === 'interviewed').length,
            rejected: this.applications.filter(app => app.status === 'rejected').length,
            accepted,
            successRate
        };
    }
    updateInterviewService() {
        const interviews = this.applications
            .filter(app => app.status === 'interviewed')
            .map(app => ({
            id: app.id,
            jobTitle: app.jobTitle,
            company: app.company,
            date: app.applicationDate,
            time: app.time,
            status: app.status,
            department: app.department
        }));
        this.interviewService.setInterviews(interviews);
    }
    get filteredApplications() {
        let filtered = this.applications;
        // Apply status filter
        if (this.selectedFilter !== 'all') {
            filtered = filtered.filter(app => app.status === this.selectedFilter);
        }
        // Apply search filter
        if (this.searchTerm.trim()) {
            const search = this.searchTerm.toLowerCase();
            filtered = filtered.filter(app => app.jobTitle.toLowerCase().includes(search) ||
                app.company.toLowerCase().includes(search) ||
                app.department.toLowerCase().includes(search) ||
                app.location?.toLowerCase().includes(search) ||
                app.description?.toLowerCase().includes(search));
        }
        return filtered;
    }
    getStatusColor(status) {
        const colors = {
            pending: '#f59e0b',
            reviewing: '#3b82f6',
            shortlisted: '#10b981',
            interviewed: '#8b5cf6',
            rejected: '#ef4444',
            accepted: '#059669'
        };
        return colors[status] || '#6b7280';
    }
    getStatusLabel(status) {
        const labels = {
            pending: 'Pending Review',
            reviewing: 'Under Review',
            shortlisted: 'Shortlisted',
            interviewed: 'Interviewed',
            rejected: 'Rejected',
            accepted: 'Accepted'
        };
        return labels[status] || status;
    }
    getActivityIcon(type) {
        const icons = {
            application: 'work',
            status_update: 'update',
            interview: 'event',
            document: 'description',
            reminder: 'notifications'
        };
        return icons[type] || 'info';
    }
    getActivityColor(type) {
        const colors = {
            application: '#3b82f6',
            status_update: '#10b981',
            interview: '#8b5cf6',
            document: '#f59e0b',
            reminder: '#ef4444'
        };
        return colors[type] || '#6b7280';
    }
    onFilterChange(filter) {
        this.selectedFilter = filter;
        this.cdr.markForCheck();
    }
    onSearch() {
        this.searchSubject.next(this.searchTerm);
    }
    onViewChange(view) {
        this.currentView = view;
        this.cdr.markForCheck();
    }
    viewApplication(application) {
        this.selectedApplication = application;
        this.showApplicationModal = true;
        this.cdr.markForCheck();
    }
    closeApplicationModal() {
        this.showApplicationModal = false;
        this.selectedApplication = null;
        this.cdr.markForCheck();
    }
    withdrawApplication(application) {
        if (confirm(`Are you sure you want to withdraw your application for ${application.jobTitle}?`)) {
            this.applications = this.applications.filter(app => app.id !== application.id);
            this.calculateStats();
            this.updateInterviewService();
            this.cdr.markForCheck();
        }
    }
    updateProfile() {
        this.currentView = 'profile';
        this.cdr.markForCheck();
    }
    openSettings() {
        this.currentView = 'settings';
        this.cdr.markForCheck();
    }
    browseJobs() {
        this.router.navigate(['/online-job-application-portal']);
    }
    goToInterviews() {
        this.router.navigate(['/applicant-interviews']);
    }
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    formatDateTime(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    getTimeAgo(date) {
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInMinutes < 1)
            return 'Just now';
        if (diffInMinutes < 60)
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        if (diffInHours < 24)
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInDays === 1)
            return 'Yesterday';
        if (diffInDays < 7)
            return `${diffInDays} days ago`;
        if (diffInDays < 30)
            return `${Math.floor(diffInDays / 7)} weeks ago`;
        return `${Math.floor(diffInDays / 30)} months ago`;
    }
    getEmploymentTypeLabel(type) {
        const labels = {
            Plantilla: 'Plantilla (Regular)',
            Contractual: 'Contractual',
            Casual: 'Casual',
            Contract_Of_Service: 'Contract of Service'
        };
        return labels[type] || type;
    }
    isApplicationExpired(application) {
        return new Date() > application.applicationDeadline;
    }
    getApplicationProgress(application) {
        const statusOrder = ['pending', 'reviewing', 'shortlisted', 'interviewed', 'accepted'];
        const currentIndex = statusOrder.indexOf(application.status);
        return ((currentIndex + 1) / statusOrder.length) * 100;
    }
};
exports.ApplicantDashboardComponent = ApplicantDashboardComponent;
exports.ApplicantDashboardComponent = ApplicantDashboardComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-applicant-dashboard',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule, header_component_1.HeaderComponent, router_1.RouterModule],
        templateUrl: './applicant-dashboard.component.html',
        styleUrls: ['./applicant-dashboard.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [router_1.Router,
        interview_service_1.InterviewService,
        core_1.ChangeDetectorRef])
], ApplicantDashboardComponent);
//# sourceMappingURL=applicant-dashboard.component.js.map