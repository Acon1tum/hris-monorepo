"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalFootprintComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let DigitalFootprintComponent = class DigitalFootprintComponent {
    loading = true;
    summary = null;
    activities = [];
    ngOnInit() {
        this.fetchDigitalFootprint();
    }
    fetchDigitalFootprint() {
        // Simulate API call
        setTimeout(() => {
            this.summary = {
                totalLogins: 42,
                wellnessActivities: 15,
                lastActive: '2024-06-10 14:23',
            };
            this.activities = [
                { date: '2024-06-10', activity: 'Login', details: 'Web Portal' },
                { date: '2024-06-09', activity: 'Completed Wellness Survey', details: 'Monthly Check-in' },
                { date: '2024-06-08', activity: 'Joined Yoga Session', details: 'Health & Wellness Program' },
                { date: '2024-06-07', activity: 'Login', details: 'Mobile App' },
                { date: '2024-06-06', activity: 'Viewed Health Tips', details: 'Article: Healthy Eating' },
            ];
            this.loading = false;
        }, 1200);
    }
};
exports.DigitalFootprintComponent = DigitalFootprintComponent;
exports.DigitalFootprintComponent = DigitalFootprintComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-digital-footprint',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './digital-footprint.component.html',
        styleUrls: ['./digital-footprint.component.scss']
    })
], DigitalFootprintComponent);
//# sourceMappingURL=digital-footprint.component.js.map