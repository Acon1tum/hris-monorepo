import { OnInit } from '@angular/core';
export interface Schedule {
    id: number;
    name: string;
    type: 'fixed' | 'shifting' | 'rotating' | 'wfh' | 'part-time';
    assignedTo: string;
    startDate: string;
    endDate: string;
    description?: string;
    workingHours?: string;
    status: 'active' | 'inactive' | 'draft';
}
export interface ScheduleTab {
    id: string;
    name: string;
    count: number;
    active: boolean;
}
export declare class TimeSchedulesComponent implements OnInit {
    title: string;
    searchTerm: string;
    activeTab: string;
    schedules: Schedule[];
    tabs: ScheduleTab[];
    constructor();
    ngOnInit(): void;
    get filteredSchedules(): Schedule[];
    updateTabCounts(): void;
    setActiveTab(tabId: string): void;
    getScheduleTypeBadgeClass(type: string): string;
    getScheduleTypeText(type: string): string;
    onSearch(): void;
    onNewSchedule(): void;
    onViewSchedule(schedule: Schedule): void;
    onEditSchedule(schedule: Schedule): void;
    onDeleteSchedule(schedule: Schedule): void;
    trackByScheduleId(index: number, schedule: Schedule): number;
}
//# sourceMappingURL=time-schedules.component.d.ts.map