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
exports.WellnessEventsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
let WellnessEventsComponent = class WellnessEventsComponent {
    router;
    constructor(router) {
        this.router = router;
    }
    // Calendar state
    currentMonth = new Date().getMonth(); // 0-indexed
    currentYear = new Date().getFullYear();
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    // Events grouped by month
    eventsByMonth = [
        {
            label: 'July 2024',
            events: [
                {
                    title: 'Mindfulness Meditation Workshop',
                    icon: 'videocam',
                    location: 'Virtual',
                    date: 'July 15, 2024',
                    time: '10:00 AM - 11:00 AM',
                },
                {
                    title: 'Healthy Eating Seminar',
                    icon: 'location_on',
                    location: 'Conference Room A',
                    date: 'July 18, 2024',
                    time: '12:00 PM - 1:00 PM',
                },
                {
                    title: 'Stress Management Webinar',
                    icon: 'videocam',
                    location: 'Virtual',
                    date: 'July 22, 2024',
                    time: '2:00 PM - 3:00 PM',
                },
            ]
        },
        {
            label: 'August 2024',
            events: [
                {
                    title: 'Morning Yoga Session',
                    icon: 'fitness_center',
                    location: 'Gym',
                    date: 'August 5, 2024',
                    time: '9:00 AM - 10:00 AM',
                },
                {
                    title: 'Financial Wellness Talk',
                    icon: 'videocam',
                    location: 'Virtual',
                    date: 'August 12, 2024',
                    time: '11:00 AM - 12:00 PM',
                },
                {
                    title: 'Team Building Activity',
                    icon: 'deck',
                    location: 'Outdoor Space',
                    date: 'August 19, 2024',
                    time: '3:00 PM - 4:00 PM',
                },
            ]
        }
    ];
    // Generate the days grid for the current month
    get calendarDays() {
        const days = [];
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const numDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        // Fill initial empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        // Fill days of the month
        for (let d = 1; d <= numDays; d++) {
            days.push(d);
        }
        return days;
    }
    // Calendar navigation
    prevMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        else {
            this.currentMonth--;
        }
    }
    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        else {
            this.currentMonth++;
        }
    }
    // Highlight today
    isToday(day) {
        if (!day)
            return false;
        const today = new Date();
        return (day === today.getDate() &&
            this.currentMonth === today.getMonth() &&
            this.currentYear === today.getFullYear());
    }
    // Register for an event
    register(event) {
        alert(`You have registered for: ${event.title}`);
    }
    // Add event to calendar
    addToCalendar(event) {
        alert(`Added to calendar: ${event.title}`);
    }
    // Go back to Health & Wellness dashboard
    goBack() {
        this.router.navigate(['/health-wellness']);
    }
    // Scroll to top on component init
    ngOnInit() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    get weekMonthYear() {
        const date = new Date(this.currentYear, this.currentMonth);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
};
exports.WellnessEventsComponent = WellnessEventsComponent;
exports.WellnessEventsComponent = WellnessEventsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-wellness-events',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './wellness-events.component.html',
        styleUrls: ['./wellness-events.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], WellnessEventsComponent);
//# sourceMappingURL=wellness-events.component.js.map