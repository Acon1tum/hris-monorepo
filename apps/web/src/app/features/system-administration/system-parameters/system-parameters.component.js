"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemParametersComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let SystemParametersComponent = class SystemParametersComponent {
    searchTerm = '';
    activeTab = 'leave-types';
    tabs = [
        { id: 'leave-types', name: 'Leave Types', active: true },
        { id: 'dtr-adjustments', name: 'DTR Adjustments', active: false },
        { id: 'ot-types', name: 'OT Types', active: false },
        { id: 'work-schedules', name: 'Work Schedules', active: false },
        { id: 'holidays', name: 'Holidays', active: false },
        { id: 'additional-configs', name: 'Additional Configurations', active: false }
    ];
    leaveTypes = [
        {
            id: 1,
            name: 'Vacation Leave',
            description: 'Paid time off for employees to use for vacations or personal time.'
        },
        {
            id: 2,
            name: 'Sick Leave',
            description: 'Paid time off for employees to use when they are ill or need to care for a sick family member.'
        },
        {
            id: 3,
            name: 'Personal Leave',
            description: 'Unpaid time off for employees to use for personal reasons.'
        },
        {
            id: 4,
            name: 'Maternity Leave',
            description: 'Extended leave for new mothers as mandated by law.'
        },
        {
            id: 5,
            name: 'Paternity Leave',
            description: 'Leave for new fathers to bond with their newborn child.'
        }
    ];
    // Pagination properties
    currentPage = 1;
    itemsPerPage = 10;
    onSearch(event) {
        const target = event.target;
        this.searchTerm = target.value;
        this.currentPage = 1; // Reset to first page when searching
    }
    onTabChange(tabId) {
        this.tabs.forEach(tab => {
            tab.active = tab.id === tabId;
        });
        this.activeTab = tabId;
        this.searchTerm = ''; // Clear search when switching tabs
        this.currentPage = 1;
    }
    onAddLeaveType() {
        console.log('Add leave type clicked');
        // Implementation for opening add modal/form
    }
    onEditLeaveType(leaveType) {
        console.log('Edit leave type:', leaveType.name);
        // Implementation for opening edit modal/form
    }
    onDeleteLeaveType(leaveType) {
        console.log('Delete leave type:', leaveType.name);
        // Implementation for delete confirmation and action
    }
    get filteredLeaveTypes() {
        if (!this.searchTerm) {
            return this.leaveTypes;
        }
        return this.leaveTypes.filter(leaveType => leaveType.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            leaveType.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    get paginatedLeaveTypes() {
        const filtered = this.filteredLeaveTypes;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return filtered.slice(startIndex, endIndex);
    }
    get totalPages() {
        return Math.ceil(this.filteredLeaveTypes.length / this.itemsPerPage);
    }
    get displayStart() {
        if (this.filteredLeaveTypes.length === 0)
            return 0;
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }
    get displayEnd() {
        const end = this.currentPage * this.itemsPerPage;
        return Math.min(end, this.filteredLeaveTypes.length);
    }
    get displayTotal() {
        return this.filteredLeaveTypes.length;
    }
    onPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    onNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
    get canGoToPrevious() {
        return this.currentPage > 1;
    }
    get canGoToNext() {
        return this.currentPage < this.totalPages;
    }
    trackByLeaveTypeId(index, leaveType) {
        return leaveType.id;
    }
};
exports.SystemParametersComponent = SystemParametersComponent;
exports.SystemParametersComponent = SystemParametersComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-system-parameters',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './system-parameters.component.html',
        styleUrls: ['./system-parameters.component.scss']
    })
], SystemParametersComponent);
//# sourceMappingURL=system-parameters.component.js.map