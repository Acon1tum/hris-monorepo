import { OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService, InterviewInfo } from '../interview.service';
interface Interview {
    id: string;
    title: string;
    time: string;
    date: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    company?: string;
    position?: string;
    location?: string;
    type?: 'phone' | 'video' | 'in-person';
}
interface NotificationSettings {
    type: 'email' | 'inapp' | 'both';
    reminderTime: string;
    enabled: boolean;
}
export declare class InterviewsComponent implements OnInit, OnDestroy {
    private router;
    private interviewService;
    private destroy$;
    notificationType: 'email' | 'inapp' | 'both';
    reminderTime: string;
    notificationSettings: NotificationSettings;
    reminderOptions: {
        value: string;
        label: string;
    }[];
    currentMonth: number;
    currentYear: number;
    selectedDate: number | null;
    weekDays: string[];
    interviewDates: Date[];
    allInterviews: InterviewInfo[];
    upcomingInterviews: Interview[];
    pastInterviews: Interview[];
    selectedDayInterviews: Interview[];
    showDaySummary: boolean;
    isLoading: boolean;
    isUpdatingSettings: boolean;
    constructor(router: Router, interviewService: InterviewService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setupInterviewSubscription;
    private loadInterviews;
    private processInterviews;
    private loadNotificationSettings;
    private saveNotificationSettings;
    goBack(): void;
    goToCalendar(): void;
    rescheduleInterview(interview: Interview): void;
    cancelInterview(interview: Interview): void;
    prevMonth(): void;
    nextMonth(): void;
    updateInterviewDates(): void;
    selectDate(date: number): void;
    closeDaySummary(): void;
    onNotificationTypeChange(): void;
    onReminderTimeChange(): void;
    private dateOnly;
    private isSameDate;
    isInterviewDate(day: number): boolean;
    getInterviewTooltip(day: number): string;
    get currentMonthLabel(): string;
    get firstDayOfWeek(): number;
    get daysInMonth(): number[];
    get blanks(): any[];
    getInterviewStatusColor(status: string): string;
    getInterviewTypeIcon(type?: string): string;
    formatInterviewDate(date: Date): string;
    getUpcomingInterviewsCount(): number;
    getPastInterviewsCount(): number;
    getTotalInterviewsCount(): number;
}
export {};
//# sourceMappingURL=interviews.component.d.ts.map