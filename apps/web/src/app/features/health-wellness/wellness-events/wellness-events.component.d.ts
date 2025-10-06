import { Router } from '@angular/router';
interface WellnessEvent {
    title: string;
    icon: string;
    location: string;
    date: string;
    time: string;
}
export declare class WellnessEventsComponent {
    private router;
    constructor(router: Router);
    currentMonth: number;
    currentYear: number;
    weekDays: string[];
    eventsByMonth: {
        label: string;
        events: {
            title: string;
            icon: string;
            location: string;
            date: string;
            time: string;
        }[];
    }[];
    get calendarDays(): (number | null)[];
    prevMonth(): void;
    nextMonth(): void;
    isToday(day: number | null): boolean;
    register(event: WellnessEvent): void;
    addToCalendar(event: WellnessEvent): void;
    goBack(): void;
    ngOnInit(): void;
    get weekMonthYear(): string;
}
export {};
//# sourceMappingURL=wellness-events.component.d.ts.map