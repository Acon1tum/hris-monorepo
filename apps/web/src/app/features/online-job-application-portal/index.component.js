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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineJobApplicationPortalComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const header_component_1 = require("../../shared/header/header.component");
const job_portal_service_1 = require("./job-portal.service");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const job_application_modal_component_1 = require("./job-application-modal/job-application-modal.component");
const auth_service_1 = require("../../services/auth.service");
let OnlineJobApplicationPortalComponent = class OnlineJobApplicationPortalComponent {
    jobPortalService;
    router;
    authService;
    publicMode = false;
    jobs = [];
    filteredJobs = [];
    salaryRanges = [];
    departments = [];
    loading = false;
    error = null;
    selectedJob = null;
    searchKeywords = '';
    selectedDepartment = '';
    selectedSalaryRange = '';
    showJobModal = false;
    modalJob = null;
    showFavourites = false;
    favourites = [];
    // Job application modal properties
    showApplicationModal = false;
    applicationJob = null;
    // Login prompt modal properties
    showLoginPromptModal = false;
    loginPromptJob = null;
    // Header scroll animation properties
    isHeaderVisible = true;
    lastScrollTop = 0;
    scrollThreshold = 50; // Reduced threshold for more responsive behavior
    headerHeight = 80; // Approximate header height
    scrollDirection = 'up'; // Track scroll direction
    activeFilters = [];
    modalCloseBtn;
    constructor(jobPortalService, router, authService) {
        this.jobPortalService = jobPortalService;
        this.router = router;
        this.authService = authService;
    }
    ngOnInit() {
        // Clear favourites on page refresh
        if (performance && performance.getEntriesByType) {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0 && navEntries[0].type === 'reload') {
                localStorage.removeItem('jobFavourites');
                // No redirect, just clear favourites and continue loading the page
            }
        }
        this.publicMode = localStorage.getItem('jobPortalPublicMode') === 'true';
        this.favourites = JSON.parse(localStorage.getItem('jobFavourites') || '[]');
        this.fetchJobs();
        this.fetchSalaryRanges();
        this.fetchDepartments();
    }
    ngAfterViewInit() {
        if (this.showJobModal && this.modalCloseBtn) {
            setTimeout(() => this.modalCloseBtn.nativeElement.focus(), 0);
        }
    }
    ngOnChanges() {
        if (this.showJobModal && this.modalCloseBtn) {
            setTimeout(() => this.modalCloseBtn.nativeElement.focus(), 0);
        }
    }
    onWindowScroll() {
        this.handleScroll();
    }
    handleModalKeydown(event) {
        if (!this.showJobModal)
            return;
        if (event.key === 'Escape') {
            this.closeViewModal();
        }
        if (event.key === 'Tab') {
            const focusableEls = Array.from(document.querySelectorAll('.job-modal button, .job-modal [tabindex]:not([tabindex="-1"])'));
            if (focusableEls.length === 0)
                return;
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];
            if (event.shiftKey) {
                if (document.activeElement === firstEl) {
                    lastEl.focus();
                    event.preventDefault();
                }
            }
            else {
                if (document.activeElement === lastEl) {
                    firstEl.focus();
                    event.preventDefault();
                }
            }
        }
    }
    handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Determine scroll direction
        const isScrollingDown = currentScrollTop > this.lastScrollTop;
        const isScrollingUp = currentScrollTop < this.lastScrollTop;
        const scrollDistance = Math.abs(currentScrollTop - this.lastScrollTop);
        // Only trigger animation if we've scrolled past the threshold
        if (scrollDistance < this.scrollThreshold) {
            return;
        }
        // Update scroll direction
        this.scrollDirection = isScrollingDown ? 'down' : 'up';
        // Hide header when scrolling down, show when scrolling up
        if (isScrollingDown && currentScrollTop > this.headerHeight) {
            // Scrolling down - hide header
            this.isHeaderVisible = false;
        }
        else if (isScrollingUp) {
            // Scrolling up - show header
            this.isHeaderVisible = true;
        }
        // Always show header at the top of the page
        if (currentScrollTop <= this.headerHeight) {
            this.isHeaderVisible = true;
        }
        this.lastScrollTop = currentScrollTop;
    }
    fetchJobs() {
        this.loading = true;
        this.error = null;
        this.jobPortalService.getJobs().subscribe({
            next: (jobs) => {
                this.jobs = jobs;
                this.filteredJobs = jobs;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load jobs. Please try again.';
                this.loading = false;
                console.error('Error fetching jobs:', err);
            }
        });
    }
    fetchSalaryRanges() {
        this.jobPortalService.getSalaryRanges().subscribe({
            next: (ranges) => {
                this.salaryRanges = ranges.map(range => ({
                    range,
                    count: 0,
                    value: range, // For template compatibility
                    label: range // For template compatibility
                }));
            },
            error: (err) => {
                console.error('Error fetching salary ranges:', err);
            }
        });
    }
    fetchDepartments() {
        this.jobPortalService.getDepartments().subscribe({
            next: (departments) => {
                this.departments = departments;
            },
            error: (err) => {
                console.error('Error fetching departments:', err);
            }
        });
    }
    searchJobs() {
        this.loading = true;
        this.error = null;
        const filters = {};
        this.activeFilters = [];
        if (this.searchKeywords && this.searchKeywords.trim()) {
            filters.keywords = this.searchKeywords.trim();
            this.activeFilters.push({ key: 'keywords', label: `What: ${this.searchKeywords.trim()}` });
        }
        if (this.selectedDepartment && this.selectedDepartment !== '') {
            filters.department = this.selectedDepartment;
            this.activeFilters.push({ key: 'department', label: `Classification: ${this.selectedDepartment}` });
        }
        if (this.selectedSalaryRange && this.selectedSalaryRange !== '') {
            filters.salary_range = this.selectedSalaryRange;
            const rangeLabel = this.salaryRanges.find(r => (r.value || r.range) === this.selectedSalaryRange)?.label || this.selectedSalaryRange;
            this.activeFilters.push({ key: 'salary_range', label: `Salary: ${rangeLabel}` });
        }
        this.jobPortalService.getJobs(filters).subscribe({
            next: (jobs) => {
                this.jobs = jobs;
                this.filteredJobs = jobs;
                this.loading = false;
                if (this.selectedJob && !this.filteredJobs.find(job => job.id === this.selectedJob?.id)) {
                    this.selectedJob = this.filteredJobs.length > 0 ? this.filteredJobs[0] : null;
                }
                else if (this.filteredJobs.length > 0 && !this.selectedJob) {
                    this.selectedJob = this.filteredJobs[0];
                }
            },
            error: (err) => {
                this.error = 'Failed to search jobs';
                this.loading = false;
                console.error('Search error:', err);
            }
        });
    }
    removeFilter(key) {
        if (key === 'keywords')
            this.searchKeywords = '';
        if (key === 'department')
            this.selectedDepartment = '';
        if (key === 'salary_range')
            this.selectedSalaryRange = '';
        this.searchJobs();
    }
    clearFilters() {
        this.searchKeywords = '';
        this.selectedDepartment = '';
        this.selectedSalaryRange = '';
        this.activeFilters = [];
        this.searchJobs();
    }
    selectJob(job) {
        this.selectedJob = job;
    }
    openViewModal(job) {
        this.modalJob = job;
        this.showJobModal = true;
        setTimeout(() => {
            if (this.modalCloseBtn) {
                this.modalCloseBtn.nativeElement.focus();
            }
        }, 0);
    }
    closeViewModal() {
        this.showJobModal = false;
        this.modalJob = null;
    }
    applyToJob(job) {
        // Check if user is authenticated and has Applicant role
        if (this.authService.isAuthenticated() && this.authService.hasRole('Applicant')) {
            // User is logged in as Applicant - show application modal
            this.applicationJob = job;
            this.showApplicationModal = true;
        }
        else {
            // User is not authenticated or not an Applicant - show login prompt
            this.loginPromptJob = job;
            this.showLoginPromptModal = true;
        }
    }
    closeApplicationModal() {
        this.showApplicationModal = false;
        this.applicationJob = null;
    }
    closeLoginPromptModal() {
        this.showLoginPromptModal = false;
        this.loginPromptJob = null;
    }
    onLoginPromptContinue() {
        this.closeLoginPromptModal();
        // The login prompt modal will handle navigation to login page
    }
    navigateToLogin() {
        this.closeLoginPromptModal();
        // Navigate to the job portal login page
        this.router.navigate(['/online-job-login']);
    }
    onApplicationSubmitted(applicationData) {
        console.log('Application submitted:', applicationData);
        // Here you would typically send the data to your backend API
        // For now, just close the modal
        this.closeApplicationModal();
    }
    shareJob(job) {
        // Implement share functionality
        console.log('Sharing job:', job);
        // You can implement actual sharing logic here
        if (navigator.share) {
            navigator.share({
                title: job.position_title,
                text: `Check out this job opportunity: ${job.position_title}`,
                url: window.location.href
            });
        }
        else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Job link copied to clipboard!');
            });
        }
    }
    get isMobile() {
        return window.innerWidth < 900;
    }
    getDepartmentThemeClass(department) {
        switch ((department || '').toLowerCase()) {
            case 'information technology':
                return 'theme-it';
            case 'human resources':
                return 'theme-hr';
            case 'finance':
                return 'theme-finance';
            case 'marketing':
                return 'theme-marketing';
            // Add more as needed
            default:
                return 'theme-default';
        }
    }
    get displayedJobs() {
        return this.showFavourites
            ? this.jobs.filter(job => this.favourites.includes(job.id))
            : this.filteredJobs;
    }
    toggleFavourite(job) {
        const idx = this.favourites.indexOf(job.id);
        if (idx > -1) {
            this.favourites.splice(idx, 1);
        }
        else {
            this.favourites.push(job.id);
        }
        localStorage.setItem('jobFavourites', JSON.stringify(this.favourites));
    }
    isFavourite(job) {
        return this.favourites.includes(job.id);
    }
};
exports.OnlineJobApplicationPortalComponent = OnlineJobApplicationPortalComponent;
__decorate([
    (0, core_1.ViewChild)('modalCloseBtn'),
    __metadata("design:type", core_1.ElementRef)
], OnlineJobApplicationPortalComponent.prototype, "modalCloseBtn", void 0);
__decorate([
    (0, core_1.HostListener)('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OnlineJobApplicationPortalComponent.prototype, "onWindowScroll", null);
__decorate([
    (0, core_1.HostListener)('document:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof KeyboardEvent !== "undefined" && KeyboardEvent) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], OnlineJobApplicationPortalComponent.prototype, "handleModalKeydown", null);
exports.OnlineJobApplicationPortalComponent = OnlineJobApplicationPortalComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-online-job-application-portal',
        standalone: true,
        imports: [common_1.CommonModule, header_component_1.HeaderComponent, http_1.HttpClientModule, forms_1.FormsModule, job_application_modal_component_1.JobApplicationModalComponent],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    }),
    __metadata("design:paramtypes", [job_portal_service_1.JobPortalService,
        router_1.Router,
        auth_service_1.AuthService])
], OnlineJobApplicationPortalComponent);
//# sourceMappingURL=index.component.js.map