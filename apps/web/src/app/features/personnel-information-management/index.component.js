"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonnelInformationManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const admin_dashboard_component_1 = require("./admin-dashboard/admin-dashboard.component");
const router_1 = require("@angular/router");
let PersonnelInformationManagementComponent = class PersonnelInformationManagementComponent {
    title = 'Personnel Information Management';
    showAdminDashboard = false;
    personnelFeatures = [
        { name: 'Employee Directory', description: 'View and manage employee information', icon: '📋' },
        { name: 'Employee Profiles', description: 'Detailed employee profiles and history', icon: '👤' },
        { name: 'Department Management', description: 'Organize employees by departments', icon: '🏢' },
        { name: 'Position Management', description: 'Manage job positions and titles', icon: '💼' },
        { name: 'Contact Information', description: 'Update employee contact details', icon: '📞' },
        { name: 'Document Management', description: 'Store and manage employee documents', icon: '📁' },
        { name: 'Admin Custom', description: 'Super Admin tools for system monitoring, alert management, and custom reporting', icon: '🛠️', route: '/personnel-information-management/admin-custom' }
    ];
    toggleAdminDashboard() {
        this.showAdminDashboard = !this.showAdminDashboard;
    }
};
exports.PersonnelInformationManagementComponent = PersonnelInformationManagementComponent;
exports.PersonnelInformationManagementComponent = PersonnelInformationManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-personnel-information-management',
        standalone: true,
        imports: [common_1.CommonModule, admin_dashboard_component_1.AdminDashboardComponent, router_1.RouterModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    })
], PersonnelInformationManagementComponent);
//# sourceMappingURL=index.component.js.map