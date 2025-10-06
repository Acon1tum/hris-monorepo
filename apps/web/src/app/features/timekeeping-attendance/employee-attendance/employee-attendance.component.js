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
exports.EmployeeAttendanceComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let EmployeeAttendanceComponent = class EmployeeAttendanceComponent {
    title = 'Employee Attendance';
    currentUser = 'Sarah';
    lastClockIn = 'Today at 8:03 AM';
    isCurrentlyWorking = true;
    // Clock-in methods
    clockMethods = [
        {
            id: 'qr-code',
            name: 'Scan QR Code',
            icon: 'qr_code_scanner',
            action: 'qr-scan'
        },
        {
            id: 'barcode',
            name: 'Scan Barcode',
            icon: 'barcode_reader',
            action: 'barcode-scan'
        },
        {
            id: 'face-scan',
            name: 'Face Scan',
            icon: 'camera_alt',
            action: 'face-scan'
        }
    ];
    // Attendance log data
    attendanceLogs = [
        {
            id: 1,
            date: 'Today',
            timeInOut: '8:03 AM - In Progress',
            location: 'Main Office',
            type: 'On-site',
            status: 'in-progress',
            statusText: 'In Progress'
        },
        {
            id: 2,
            date: 'Yesterday',
            timeInOut: '8:00 AM - 5:05 PM (9h 5m)',
            location: 'Main Office',
            type: 'On-site',
            status: 'complete',
            statusText: 'Complete'
        },
        {
            id: 3,
            date: '07/10/2024',
            timeInOut: 'MISSING LOG',
            location: '-',
            type: '-',
            status: 'missing',
            statusText: 'Missing'
        },
        {
            id: 4,
            date: '07/09/2024',
            timeInOut: '8:15 AM - 4:50 PM (8h 35m)',
            location: 'Main Office',
            type: 'On-site',
            status: 'complete',
            statusText: 'Complete'
        },
        {
            id: 5,
            date: '07/08/2024',
            timeInOut: '9:00 AM - 5:30 PM (8h 30m)',
            location: 'Home',
            type: 'WFH',
            status: 'complete',
            statusText: 'Complete'
        }
    ];
    constructor() { }
    ngOnInit() {
        // Component initialization
    }
    // Main clock in/out action
    onClockInOut() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        if (this.isCurrentlyWorking) {
            // Clock out
            console.log('Clocking out at:', timeString);
            this.isCurrentlyWorking = false;
            // Update the current log entry
            const todayLog = this.attendanceLogs.find(log => log.date === 'Today');
            if (todayLog) {
                const startTime = todayLog.timeInOut.split(' - ')[0];
                const duration = this.calculateDuration(startTime, timeString);
                todayLog.timeInOut = `${startTime} - ${timeString} (${duration})`;
                todayLog.status = 'complete';
                todayLog.statusText = 'Complete';
            }
        }
        else {
            // Clock in
            console.log('Clocking in at:', timeString);
            this.isCurrentlyWorking = true;
            this.lastClockIn = `Today at ${timeString}`;
            // Add or update today's log
            const todayLog = this.attendanceLogs.find(log => log.date === 'Today');
            if (todayLog) {
                todayLog.timeInOut = `${timeString} - In Progress`;
                todayLog.status = 'in-progress';
                todayLog.statusText = 'In Progress';
            }
        }
    }
    // Alternative clock methods
    onAlternativeMethod(method) {
        console.log(`Using ${method.name} for attendance`);
        // Implement specific method logic here
        switch (method.action) {
            case 'qr-scan':
                console.log('Opening QR code scanner...');
                break;
            case 'barcode-scan':
                console.log('Opening barcode scanner...');
                break;
            case 'face-scan':
                console.log('Opening face recognition...');
                break;
        }
    }
    // Quick actions
    onViewSchedule() {
        console.log('Viewing schedule...');
        // Navigate to schedule view
    }
    onSubmitMissingLog() {
        console.log('Opening missing log submission...');
        // Navigate to DTR adjustment or missing log form
    }
    onViewDTR() {
        console.log('Viewing DTR...');
        // Navigate to DTR view
    }
    onViewAllLogs() {
        console.log('Viewing all attendance logs...');
        // Navigate to full attendance history
    }
    // Utility methods
    getStatusBadgeClass(status) {
        switch (status) {
            case 'in-progress':
                return 'status-in-progress';
            case 'complete':
                return 'status-complete';
            case 'missing':
                return 'status-missing';
            default:
                return 'status-default';
        }
    }
    calculateDuration(startTime, endTime) {
        // Simple duration calculation for demo
        // In real implementation, you'd use proper date/time calculation
        return '8h 30m'; // Placeholder
    }
    get clockButtonText() {
        return this.isCurrentlyWorking ? 'Clock Out' : 'Clock In';
    }
    get clockButtonIcon() {
        return this.isCurrentlyWorking ? 'access_time_filled' : 'timer';
    }
    trackByLogId(index, log) {
        return log.id;
    }
};
exports.EmployeeAttendanceComponent = EmployeeAttendanceComponent;
exports.EmployeeAttendanceComponent = EmployeeAttendanceComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-employee-attendance',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './employee-attendance.component.html',
        styleUrls: ['./employee-attendance.component.scss']
    }),
    __metadata("design:paramtypes", [])
], EmployeeAttendanceComponent);
//# sourceMappingURL=employee-attendance.component.js.map