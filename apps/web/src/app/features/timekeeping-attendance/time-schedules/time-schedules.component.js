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
exports.TimeSchedulesComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let TimeSchedulesComponent = class TimeSchedulesComponent {
    title = 'Time Schedules';
    searchTerm = '';
    activeTab = 'all';
    // Sample schedule data
    schedules = [
        {
            id: 1,
            name: 'Morning Shift',
            type: 'fixed',
            assignedTo: 'All Employees',
            startDate: '01/01/2024',
            endDate: '12/31/2024',
            description: 'Standard morning working hours',
            workingHours: '08:00 AM - 05:00 PM',
            status: 'active'
        },
        {
            id: 2,
            name: 'Night Shift Crew',
            type: 'shifting',
            assignedTo: 'Support Team',
            startDate: '03/15/2024',
            endDate: 'Ongoing',
            description: 'Night shift for support operations',
            workingHours: '10:00 PM - 07:00 AM',
            status: 'active'
        },
        {
            id: 3,
            name: 'Weekly Rotation Alpha',
            type: 'rotating',
            assignedTo: 'Engineering Department',
            startDate: '02/01/2024',
            endDate: '01/31/2025',
            description: 'Weekly rotating schedule for engineering team',
            workingHours: 'Rotating',
            status: 'active'
        },
        {
            id: 4,
            name: 'Remote Work Policy',
            type: 'wfh',
            assignedTo: 'Marketing & Design',
            startDate: 'N/A',
            endDate: 'N/A',
            description: 'Work from home flexible schedule',
            workingHours: 'Flexible',
            status: 'active'
        },
        {
            id: 5,
            name: 'Internship Program',
            type: 'part-time',
            assignedTo: 'Interns Cohort A',
            startDate: '06/01/2024',
            endDate: '08/31/2024',
            description: 'Part-time schedule for summer interns',
            workingHours: '09:00 AM - 01:00 PM',
            status: 'active'
        },
        {
            id: 6,
            name: 'Evening Operations',
            type: 'fixed',
            assignedTo: 'Customer Service',
            startDate: '04/01/2024',
            endDate: '03/31/2025',
            description: 'Evening shift for customer support',
            workingHours: '02:00 PM - 11:00 PM',
            status: 'active'
        },
        {
            id: 7,
            name: 'Weekend Coverage',
            type: 'shifting',
            assignedTo: 'Operations Team',
            startDate: '01/01/2024',
            endDate: 'Ongoing',
            description: 'Weekend shift coverage',
            workingHours: '08:00 AM - 08:00 PM',
            status: 'active'
        },
        {
            id: 8,
            name: 'Executive Schedule',
            type: 'wfh',
            assignedTo: 'Senior Management',
            startDate: 'N/A',
            endDate: 'N/A',
            description: 'Flexible executive working arrangements',
            workingHours: 'Flexible',
            status: 'active'
        }
    ];
    // Tab configuration
    tabs = [
        { id: 'all', name: 'All', count: 0, active: true },
        { id: 'fixed', name: 'Fixed', count: 0, active: false },
        { id: 'shifting', name: 'Shifting', count: 0, active: false },
        { id: 'rotating', name: 'Rotating', count: 0, active: false },
        { id: 'wfh', name: 'Work-From-Home', count: 0, active: false }
    ];
    constructor() { }
    ngOnInit() {
        this.updateTabCounts();
    }
    // Computed properties
    get filteredSchedules() {
        let filtered = [...this.schedules];
        // Filter by active tab
        if (this.activeTab !== 'all') {
            filtered = filtered.filter(schedule => schedule.type === this.activeTab);
        }
        // Apply search filter
        if (this.searchTerm) {
            const searchTerm = this.searchTerm.toLowerCase();
            filtered = filtered.filter(schedule => schedule.name.toLowerCase().includes(searchTerm) ||
                schedule.type.toLowerCase().includes(searchTerm) ||
                schedule.assignedTo.toLowerCase().includes(searchTerm) ||
                schedule.description?.toLowerCase().includes(searchTerm));
        }
        return filtered;
    }
    // Methods
    updateTabCounts() {
        this.tabs.forEach(tab => {
            if (tab.id === 'all') {
                tab.count = this.schedules.length;
            }
            else {
                tab.count = this.schedules.filter(schedule => schedule.type === tab.id).length;
            }
        });
    }
    setActiveTab(tabId) {
        this.tabs.forEach(tab => {
            tab.active = tab.id === tabId;
        });
        this.activeTab = tabId;
    }
    getScheduleTypeBadgeClass(type) {
        switch (type) {
            case 'fixed':
                return 'badge-fixed';
            case 'shifting':
                return 'badge-shifting';
            case 'rotating':
                return 'badge-rotating';
            case 'wfh':
                return 'badge-wfh';
            case 'part-time':
                return 'badge-part-time';
            default:
                return 'badge-default';
        }
    }
    getScheduleTypeText(type) {
        switch (type) {
            case 'fixed':
                return 'Fixed';
            case 'shifting':
                return 'Shifting';
            case 'rotating':
                return 'Rotating';
            case 'wfh':
                return 'WFH';
            case 'part-time':
                return 'Part-Time';
            default:
                return type;
        }
    }
    onSearch() {
        // Search is handled by the getter filteredSchedules
    }
    onNewSchedule() {
        console.log('Creating new schedule...');
        // Implement new schedule creation
    }
    onViewSchedule(schedule) {
        console.log('Viewing schedule:', schedule.name);
        // Implement schedule viewing/editing
    }
    onEditSchedule(schedule) {
        console.log('Editing schedule:', schedule.name);
        // Implement schedule editing
    }
    onDeleteSchedule(schedule) {
        console.log('Deleting schedule:', schedule.name);
        // Implement schedule deletion
    }
    trackByScheduleId(index, schedule) {
        return schedule.id;
    }
};
exports.TimeSchedulesComponent = TimeSchedulesComponent;
exports.TimeSchedulesComponent = TimeSchedulesComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-time-schedules',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './time-schedules.component.html',
        styleUrls: ['./time-schedules.component.scss']
    }),
    __metadata("design:paramtypes", [])
], TimeSchedulesComponent);
//# sourceMappingURL=time-schedules.component.js.map