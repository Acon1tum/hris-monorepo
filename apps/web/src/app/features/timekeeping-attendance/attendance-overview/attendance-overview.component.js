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
exports.AttendanceOverviewComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let AttendanceOverviewComponent = class AttendanceOverviewComponent {
    title = 'Attendance Overview';
    employees = [
        {
            id: 1,
            name: 'Ethan Carter',
            status: 'on-time',
            timeIn: '09:00 AM',
            timeOut: null,
            department: 'Marketing'
        },
        {
            id: 2,
            name: 'Olivia Bennett',
            status: 'late',
            timeIn: '09:15 AM',
            timeOut: null,
            department: 'Sales'
        },
        {
            id: 3,
            name: 'Noah Thompson',
            status: 'absent',
            timeIn: null,
            timeOut: null,
            department: 'Engineering'
        },
        {
            id: 4,
            name: 'Ava Harper',
            status: 'on-time',
            timeIn: '08:55 AM',
            timeOut: null,
            department: 'Product'
        },
        {
            id: 5,
            name: 'Liam Foster',
            status: 'on-time',
            timeIn: '08:45 AM',
            timeOut: null,
            department: 'Design'
        },
        {
            id: 6,
            name: 'Sophia Rodriguez',
            status: 'on-time',
            timeIn: '08:50 AM',
            timeOut: null,
            department: 'Technology'
        },
        {
            id: 7,
            name: 'Emma Wilson',
            status: 'late',
            timeIn: '09:30 AM',
            timeOut: null,
            department: 'HR'
        },
        {
            id: 8,
            name: 'Alex Turner',
            status: 'on-time',
            timeIn: '08:55 AM',
            timeOut: '05:00 PM',
            department: 'Finance'
        }
    ];
    attendanceSummary = {
        totalPresent: 120,
        totalAbsent: 5,
        totalOnLeave: 10
    };
    constructor() { }
    ngOnInit() {
        // Component initialization
    }
    getStatusBadgeClass(status) {
        switch (status) {
            case 'on-time':
                return 'status-on-time';
            case 'late':
                return 'status-late';
            case 'absent':
                return 'status-absent';
            default:
                return 'status-default';
        }
    }
    getStatusText(status) {
        switch (status) {
            case 'on-time':
                return 'On-time';
            case 'late':
                return 'Late';
            case 'absent':
                return 'Absent';
            default:
                return 'Unknown';
        }
    }
    onViewAll() {
        console.log('View all attendance clicked');
    }
    trackByEmployeeId(index, employee) {
        return employee.id;
    }
};
exports.AttendanceOverviewComponent = AttendanceOverviewComponent;
exports.AttendanceOverviewComponent = AttendanceOverviewComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-attendance-overview',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './attendance-overview.component.html',
        styleUrls: ['./attendance-overview.component.scss']
    }),
    __metadata("design:paramtypes", [])
], AttendanceOverviewComponent);
//# sourceMappingURL=attendance-overview.component.js.map