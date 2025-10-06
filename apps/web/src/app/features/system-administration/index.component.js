"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAdministrationComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let SystemAdministrationComponent = class SystemAdministrationComponent {
    title = 'System Administration';
    adminFeatures = [
        { name: 'User Management', description: 'Manage system users and permissions', icon: '👥' },
        { name: 'Role Management', description: 'Configure user roles and access levels', icon: '🔐' },
        { name: 'System Settings', description: 'Configure system-wide settings', icon: '⚙️' },
        { name: 'Audit Logs', description: 'View system activity and audit trails', icon: '📋' },
        { name: 'Backup & Recovery', description: 'Manage system backups and data recovery', icon: '💾' },
        { name: 'System Health', description: 'Monitor system performance and health', icon: '🏥' }
    ];
};
exports.SystemAdministrationComponent = SystemAdministrationComponent;
exports.SystemAdministrationComponent = SystemAdministrationComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-system-administration',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss']
    })
], SystemAdministrationComponent);
//# sourceMappingURL=index.component.js.map