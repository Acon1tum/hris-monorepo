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
exports.RecruitmentComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
let RecruitmentComponent = class RecruitmentComponent {
    router;
    title = 'Recruitment Management';
    // Recruitment Statistics
    recruitmentStats = [
        { label: 'Active Job Postings', value: '12', icon: '📢', change: '+3', trend: 'up', color: '#3B82F6' },
        { label: 'Total Applicants', value: '156', icon: '👥', change: '+24', trend: 'up', color: '#10B981' },
        { label: 'Interviews Scheduled', value: '8', icon: '📅', change: '+2', trend: 'up', color: '#F59E0B' },
        { label: 'Offers Sent', value: '5', icon: '✉️', change: '+1', trend: 'up', color: '#8B5CF6' }
    ];
    // Recruitment Features
    recruitmentFeatures = [
        {
            name: 'Job Posting Management',
            description: 'Create, edit, and manage job openings with detailed requirements and qualifications',
            icon: '📢',
            route: '/job-posting',
            color: '#3B82F6',
            status: 'active'
        },
        {
            name: 'Applicant Tracking System',
            description: 'Track applicants through the entire recruitment pipeline with status updates',
            icon: '📝',
            route: '/applicant-tracking',
            color: '#10B981',
            status: 'active'
        },
        {
            name: 'Interview Scheduling',
            description: 'Schedule and manage interviews with automated reminders and calendar integration',
            icon: '📅',
            route: '/interview-scheduling',
            color: '#F59E0B',
            status: 'active'
        },
        {
            name: 'Resume Management',
            description: 'Store, organize, and review applicant resumes with advanced search capabilities',
            icon: '📄',
            route: '/resume-management',
            color: '#EF4444',
            status: 'active'
        },
        {
            name: 'Offer Letter Generation',
            description: 'Generate and send professional offer letters with customizable templates',
            icon: '✉️',
            route: '/offer-letters',
            color: '#8B5CF6',
            status: 'active'
        },
        {
            name: 'Recruitment Analytics',
            description: 'Analyze recruitment data, track metrics, and generate comprehensive reports',
            icon: '📊',
            route: '/recruitment-analytics',
            color: '#6366F1',
            status: 'active'
        }
    ];
    // Recent Activities
    recentActivities = [
        { action: 'New job posting created', user: 'HR Manager', time: '2 hours ago', type: 'job-posting', status: 'completed' },
        { action: 'Interview scheduled for Software Engineer', user: 'Recruiter', time: '4 hours ago', type: 'interview', status: 'scheduled' },
        { action: 'Offer letter sent to John Doe', user: 'HR Assistant', time: '6 hours ago', type: 'offer', status: 'sent' },
        { action: 'Resume review completed', user: 'Hiring Manager', time: '1 day ago', type: 'resume', status: 'reviewed' },
        { action: 'Application received for Marketing Position', user: 'System', time: '1 day ago', type: 'application', status: 'received' }
    ];
    // Quick Actions
    quickActions = [
        { name: 'Post New Job', icon: '➕', action: 'post-job', color: '#3B82F6' },
        { name: 'View Applicants', icon: '👥', action: 'view-applicants', color: '#10B981' },
        { name: 'Schedule Interview', icon: '📅', action: 'schedule-interview', color: '#F59E0B' },
        { name: 'Generate Report', icon: '📊', action: 'generate-report', color: '#8B5CF6' }
    ];
    constructor(router) {
        this.router = router;
    }
    navigateToFeature(route) {
        this.router.navigate([route]);
    }
    onQuickAction(action) {
        console.log('Quick action:', action);
        // Implement specific actions based on the action type
        switch (action) {
            case 'post-job':
                this.router.navigate(['/job-posting/create']);
                break;
            case 'view-applicants':
                this.router.navigate(['/applicant-tracking']);
                break;
            case 'schedule-interview':
                this.router.navigate(['/interview-scheduling']);
                break;
            case 'generate-report':
                this.router.navigate(['/recruitment-analytics']);
                break;
        }
    }
};
exports.RecruitmentComponent = RecruitmentComponent;
exports.RecruitmentComponent = RecruitmentComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-recruitment',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], RecruitmentComponent);
//# sourceMappingURL=index.component.js.map