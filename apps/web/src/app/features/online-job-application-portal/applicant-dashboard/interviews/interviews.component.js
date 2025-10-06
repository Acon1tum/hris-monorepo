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
exports.InterviewsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const interview_service_1 = require("../interview.service");
const rxjs_1 = require("rxjs");
let InterviewsComponent = class InterviewsComponent {
    router;
    interviewService;
    destroy$ = new rxjs_1.Subject();
    // Notification settings
    notificationType = 'email';
    reminderTime = '';
    notificationSettings = {
        type: 'email',
        reminderTime: '',
        enabled: true
    };
    reminderOptions = [
        { value: '10min', label: '10 minutes before' },
        { value: '30min', label: '30 minutes before' },
        { value: '1hr', label: '1 hour before' },
        { value: '1day', label: '1 day before' },
        { value: '2days', label: '2 days before' }
    ];
    // Calendar state
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    selectedDate = null;
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    interviewDates = [];
    allInterviews = [];
    // Interview data
    upcomingInterviews = [];
    pastInterviews = [
        {
            id: '1',
            title: 'Interview with Global Tech Corp.',
            time: '11:00 AM - 12:00 PM',
            date: new Date(this.currentYear, this.currentMonth, 2),
            status: 'completed',
            company: 'Global Tech Corp.',
            position: 'Senior Developer',
            location: 'San Francisco, CA',
            type: 'video'
        },
        {
            id: '2',
            title: 'Interview with Digital Dynamics LLC',
            time: '3:00 PM - 4:00 PM',
            date: new Date(this.currentYear, this.currentMonth, 3),
            status: 'completed',
            company: 'Digital Dynamics LLC',
            position: 'Product Manager',
            location: 'New York, NY',
            type: 'in-person'
        }
    ];
    selectedDayInterviews = [];
    showDaySummary = false;
    // Loading states
    isLoading = false;
    isUpdatingSettings = false;
    constructor(router, interviewService) {
        this.router = router;
        this.interviewService = interviewService;
    }
    ngOnInit() {
        this.loadInterviews();
        this.loadNotificationSettings();
        this.setupInterviewSubscription();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setupInterviewSubscription() {
        this.interviewService.interviews$
            .pipe((0, rxjs_1.takeUntil)(this.destroy$))
            .subscribe(interviews => {
            this.allInterviews = interviews;
            this.updateInterviewDates();
            this.processInterviews();
        });
    }
    loadInterviews() {
        this.isLoading = true;
        // Simulate API call
        setTimeout(() => {
            this.upcomingInterviews = [
                {
                    id: '3',
                    title: 'Technical Interview - Frontend Role',
                    time: '2:00 PM - 3:30 PM',
                    date: new Date(this.currentYear, this.currentMonth, 15),
                    status: 'scheduled',
                    company: 'Tech Innovations Inc.',
                    position: 'Frontend Developer',
                    location: 'Remote',
                    type: 'video'
                },
                {
                    id: '4',
                    title: 'Final Round - Senior Position',
                    time: '10:00 AM - 11:30 AM',
                    date: new Date(this.currentYear, this.currentMonth, 20),
                    status: 'scheduled',
                    company: 'Enterprise Solutions',
                    position: 'Senior Software Engineer',
                    location: 'Austin, TX',
                    type: 'in-person'
                }
            ];
            this.processInterviews();
            this.isLoading = false;
        }, 1000);
    }
    processInterviews() {
        // Process interviews for calendar display
        this.updateInterviewDates();
    }
    loadNotificationSettings() {
        // Load saved notification settings from localStorage or API
        const savedSettings = localStorage.getItem('interviewNotificationSettings');
        if (savedSettings) {
            this.notificationSettings = JSON.parse(savedSettings);
            this.notificationType = this.notificationSettings.type;
            this.reminderTime = this.notificationSettings.reminderTime;
        }
    }
    saveNotificationSettings() {
        this.notificationSettings = {
            type: this.notificationType,
            reminderTime: this.reminderTime,
            enabled: true
        };
        localStorage.setItem('interviewNotificationSettings', JSON.stringify(this.notificationSettings));
    }
    // Navigation methods
    goBack() {
        this.router.navigate(['/applicant-dashboard']);
    }
    goToCalendar() {
        const d = new Date(this.currentYear, this.currentMonth, 1);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        this.router.navigate(['/calendar'], { queryParams: { date: dateStr } });
    }
    // Interview management methods
    rescheduleInterview(interview) {
        if (confirm(`Are you sure you want to reschedule "${interview.title}"?`)) {
            // Implement reschedule logic
            console.log('Rescheduling interview:', interview);
            alert('Reschedule functionality will be implemented here.');
        }
    }
    cancelInterview(interview) {
        if (confirm(`Are you sure you want to cancel "${interview.title}"?`)) {
            this.upcomingInterviews = this.upcomingInterviews.filter(i => i.id !== interview.id);
            console.log('Interview cancelled:', interview);
        }
    }
    // Calendar methods
    prevMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }
        this.selectedDate = null;
        this.updateInterviewDates();
    }
    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }
        this.selectedDate = null;
        this.updateInterviewDates();
    }
    updateInterviewDates() {
        this.interviewDates = this.allInterviews
            .filter(i => i.date.getFullYear() === this.currentYear && i.date.getMonth() === this.currentMonth)
            .map(i => this.dateOnly(i.date));
    }
    selectDate(date) {
        this.selectedDate = date;
        const selectedDate = new Date(this.currentYear, this.currentMonth, date);
        // Find interviews for this date
        this.selectedDayInterviews = [
            ...this.upcomingInterviews.filter(i => this.isSameDate(i.date, selectedDate)),
            ...this.pastInterviews.filter(i => this.isSameDate(i.date, selectedDate))
        ];
        this.showDaySummary = true;
    }
    closeDaySummary() {
        this.showDaySummary = false;
        this.selectedDate = null;
    }
    // Notification settings methods
    onNotificationTypeChange() {
        this.saveNotificationSettings();
    }
    onReminderTimeChange() {
        this.saveNotificationSettings();
    }
    // Helper methods
    dateOnly(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    isSameDate(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
    isInterviewDate(day) {
        const d = new Date(this.currentYear, this.currentMonth, day);
        return this.interviewDates.some(idate => idate.getTime() === d.getTime()) ||
            this.upcomingInterviews.some(i => this.isSameDate(i.date, d)) ||
            this.pastInterviews.some(i => this.isSameDate(i.date, d));
    }
    getInterviewTooltip(day) {
        const d = new Date(this.currentYear, this.currentMonth, day);
        const interviews = [
            ...this.upcomingInterviews.filter(i => this.isSameDate(i.date, d)),
            ...this.pastInterviews.filter(i => this.isSameDate(i.date, d))
        ];
        if (interviews.length === 0)
            return '';
        return interviews.map(i => `${i.title} at ${i.time}`).join('\n');
    }
    // Computed properties
    get currentMonthLabel() {
        return new Date(this.currentYear, this.currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric'
        });
    }
    get firstDayOfWeek() {
        return new Date(this.currentYear, this.currentMonth, 1).getDay() + 1;
    }
    get daysInMonth() {
        const days = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => i + 1);
    }
    get blanks() {
        return Array(this.firstDayOfWeek - 1).fill(0);
    }
    // Utility methods
    getInterviewStatusColor(status) {
        switch (status) {
            case 'scheduled': return '#28a745';
            case 'completed': return '#6c757d';
            case 'cancelled': return '#dc3545';
            default: return '#6c757d';
        }
    }
    getInterviewTypeIcon(type) {
        switch (type) {
            case 'video': return 'video_call';
            case 'in-person': return 'location_on';
            case 'phone': return 'phone';
            default: return 'work';
        }
    }
    formatInterviewDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    // Statistics methods
    getUpcomingInterviewsCount() {
        return this.upcomingInterviews.length;
    }
    getPastInterviewsCount() {
        return this.pastInterviews.length;
    }
    getTotalInterviewsCount() {
        return this.upcomingInterviews.length + this.pastInterviews.length;
    }
};
exports.InterviewsComponent = InterviewsComponent;
exports.InterviewsComponent = InterviewsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-interviews',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './interviews.component.html',
        styleUrls: ['./interviews.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        interview_service_1.InterviewService])
], InterviewsComponent);
//# sourceMappingURL=interviews.component.js.map