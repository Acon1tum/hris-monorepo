import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService } from './interview.service';
export interface JobApplication {
    id: string;
    jobTitle: string;
    company: string;
    department: string;
    applicationDate: Date;
    status: ApplicationStatus;
    lastUpdated: Date;
    applicationDeadline: Date;
    salaryRange: string;
    employmentType: EmploymentType;
    time?: string;
    location?: string;
    description?: string;
    requirements?: string[];
}
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'interviewed' | 'rejected' | 'accepted';
export type EmploymentType = 'Plantilla' | 'Contractual' | 'Casual' | 'Contract_Of_Service';
export interface DashboardStats {
    totalApplications: number;
    pendingReview: number;
    shortlisted: number;
    interviews: number;
    rejected: number;
    accepted: number;
    successRate: number;
}
export interface RecentActivity {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    timestamp: Date;
    status?: ApplicationStatus;
    applicationId?: string;
}
export type ActivityType = 'application' | 'status_update' | 'interview' | 'document' | 'reminder';
export type DashboardView = 'overview' | 'applications' | 'profile' | 'settings';
export declare class ApplicantDashboardComponent implements OnInit, OnDestroy {
    private router;
    private interviewService;
    private cdr;
    isHeaderVisible: boolean;
    publicMode: boolean;
    applications: JobApplication[];
    stats: DashboardStats;
    recentActivities: RecentActivity[];
    loading: boolean;
    selectedFilter: ApplicationStatus | 'all';
    searchTerm: string;
    currentView: DashboardView;
    showApplicationModal: boolean;
    selectedApplication: JobApplication | null;
    private searchSubject;
    private destroy$;
    private readonly mockApplications;
    private readonly mockActivities;
    constructor(router: Router, interviewService: InterviewService, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setupSearchSubscription;
    private loadDashboardData;
    private calculateStats;
    private updateInterviewService;
    get filteredApplications(): JobApplication[];
    getStatusColor(status: ApplicationStatus): string;
    getStatusLabel(status: ApplicationStatus): string;
    getActivityIcon(type: ActivityType): string;
    getActivityColor(type: ActivityType): string;
    onFilterChange(filter: ApplicationStatus | 'all'): void;
    onSearch(): void;
    onViewChange(view: DashboardView): void;
    viewApplication(application: JobApplication): void;
    closeApplicationModal(): void;
    withdrawApplication(application: JobApplication): void;
    updateProfile(): void;
    openSettings(): void;
    browseJobs(): void;
    goToInterviews(): void;
    formatDate(date: Date): string;
    formatDateTime(date: Date): string;
    getTimeAgo(date: Date): string;
    getEmploymentTypeLabel(type: EmploymentType): string;
    isApplicationExpired(application: JobApplication): boolean;
    getApplicationProgress(application: JobApplication): number;
}
//# sourceMappingURL=applicant-dashboard.component.d.ts.map