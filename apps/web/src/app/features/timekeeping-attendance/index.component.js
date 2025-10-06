"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimekeepingAttendanceComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let TimekeepingAttendanceComponent = class TimekeepingAttendanceComponent {
    title = 'Timekeeping & Attendance';
    timekeepingFeatures = [
        { name: 'Time Clock', description: 'Clock in/out and track work hours', icon: '⏰' },
        { name: 'Attendance Reports', description: 'View attendance history and reports', icon: '📊' },
        { name: 'Overtime Tracking', description: 'Monitor overtime hours and approvals', icon: '🕐' },
        { name: 'Schedule Management', description: 'Manage work schedules and shifts', icon: '📅' },
        { name: 'Leave Integration', description: 'Track leave and time-off requests', icon: '🏖️' },
        { name: 'Geolocation Tracking', description: 'Location-based attendance verification', icon: '📍' }
    ];
};
exports.TimekeepingAttendanceComponent = TimekeepingAttendanceComponent;
exports.TimekeepingAttendanceComponent = TimekeepingAttendanceComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-timekeeping-attendance',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    })
], TimekeepingAttendanceComponent);
//# sourceMappingURL=index.component.js.map