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
exports.AuditTrailService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
var ReportType;
(function (ReportType) {
    ReportType["EMPLOYEE"] = "employee";
    ReportType["PAYROLL"] = "payroll";
    ReportType["ATTENDANCE"] = "attendance";
    ReportType["LEAVE"] = "leave";
    ReportType["PERFORMANCE"] = "performance";
    ReportType["CUSTOM"] = "custom";
})(ReportType || (ReportType = {}));
let AuditTrailService = class AuditTrailService {
    auditTrailsSubject = new rxjs_1.BehaviorSubject([]);
    auditTrails$ = this.auditTrailsSubject.asObservable();
    constructor() { }
    // Get current audit trails
    getAuditTrails() {
        return this.auditTrailsSubject.value;
    }
    // Add new audit trail entry
    addAuditTrailEntry(auditEntry) {
        console.log('Service: Adding audit trail entry:', auditEntry);
        const currentTrails = this.auditTrailsSubject.value;
        console.log('Service: Current trails count:', currentTrails.length);
        const updatedTrails = [auditEntry, ...currentTrails]; // Add to beginning
        // Optional: Limit the number of entries to prevent memory issues
        if (updatedTrails.length > 1000) {
            updatedTrails.splice(1000);
        }
        console.log('Service: Updated trails count:', updatedTrails.length);
        this.auditTrailsSubject.next(updatedTrails);
        console.log('Service: New audit trail entry added via service:', auditEntry);
    }
    // Clear all audit trails
    clearAuditTrails() {
        this.auditTrailsSubject.next([]);
    }
    // Delete specific audit trail
    deleteAuditTrail(id) {
        const currentTrails = this.auditTrailsSubject.value;
        const updatedTrails = currentTrails.filter(trail => trail.id !== id);
        this.auditTrailsSubject.next(updatedTrails);
    }
    // Update audit trail
    updateAuditTrail(id, updates) {
        const currentTrails = this.auditTrailsSubject.value;
        const updatedTrails = currentTrails.map(trail => trail.id === id ? { ...trail, ...updates } : trail);
        this.auditTrailsSubject.next(updatedTrails);
    }
};
exports.AuditTrailService = AuditTrailService;
exports.AuditTrailService = AuditTrailService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], AuditTrailService);
//# sourceMappingURL=audit-trail.service.js.map