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
exports.PersonnelMovementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
let PersonnelMovementComponent = class PersonnelMovementComponent {
    router;
    personnelMovements = [];
    filteredMovements = [];
    searchTerm = '';
    currentPage = 1;
    itemsPerPage = 8;
    totalItems = 0;
    // Departments for dropdown
    departments = [
        'HR',
        'Finance',
        'Marketing',
        'Sales',
        'Engineering',
        'Operations',
        'Product',
        'IT',
        'Customer Service',
        'Legal',
        'Procurement',
        'Logistics',
        'Admin'
    ];
    // Modal states
    showNewMovementModal = false;
    showViewMovementModal = false;
    showEditMovementModal = false;
    // Selected movement for view/edit
    selectedMovement = null;
    // Form data for new movement
    newMovement = {
        employeeName: '',
        department: '',
        previousDepartment: '',
        currentRole: '',
        previousRole: '',
        movementType: 'Promotion',
        effectiveDate: '',
        status: 'Pending',
        reasons: '',
        approvedBy: '',
        approvedDate: '',
        remarks: ''
    };
    // Form data for editing movement
    editMovement = {
        employeeName: '',
        department: '',
        previousDepartment: '',
        currentRole: '',
        previousRole: '',
        movementType: 'Promotion',
        effectiveDate: '',
        status: 'Pending',
        reasons: '',
        approvedBy: '',
        approvedDate: '',
        remarks: ''
    };
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.loadPersonnelMovements();
    }
    loadPersonnelMovements() {
        // Mock data - replace with actual API call
        this.personnelMovements = [
            {
                id: 1,
                employeeName: 'Ethan Harper',
                department: 'Marketing',
                previousDepartment: 'Sales',
                currentRole: 'Marketing Specialist',
                previousRole: 'Sales Representative',
                movementType: 'Promotion',
                effectiveDate: '2024-07-15',
                status: 'Approved',
                reasons: 'Outstanding performance in sales, demonstrated strong marketing skills and leadership potential. Successfully led multiple campaigns and showed initiative in cross-departmental projects.',
                approvedBy: 'Sarah Johnson',
                approvedDate: '2024-07-10',
                remarks: 'Employee has shown exceptional growth and is ready for increased responsibilities.'
            },
            {
                id: 2,
                employeeName: 'Olivia Bennett',
                department: 'Sales',
                previousDepartment: 'Customer Service',
                currentRole: 'Sales Associate',
                previousRole: 'Customer Service Representative',
                movementType: 'Transfer',
                effectiveDate: '2024-07-20',
                status: 'Pending',
                reasons: 'Requested transfer to sales department to pursue career growth in sales and business development. Has strong customer relationship skills that would benefit the sales team.',
                approvedBy: '',
                approvedDate: '',
                remarks: 'Transfer request under review by department heads.'
            },
            {
                id: 3,
                employeeName: 'Noah Carter',
                department: 'Engineering',
                previousDepartment: 'Engineering',
                currentRole: 'Software Engineer',
                previousRole: 'Senior Software Engineer',
                movementType: 'Demotion',
                effectiveDate: '2024-07-25',
                status: 'Rejected',
                reasons: 'Performance issues and failure to meet project deadlines. Multiple code review failures and lack of team collaboration.',
                approvedBy: '',
                approvedDate: '',
                remarks: 'Performance improvement plan recommended instead of demotion.'
            },
            {
                id: 4,
                employeeName: 'Ava Thompson',
                department: 'Finance',
                previousDepartment: 'Accounting',
                currentRole: 'Financial Analyst',
                previousRole: 'Accountant',
                movementType: 'Promotion',
                effectiveDate: '2024-08-01',
                status: 'Approved',
                reasons: 'Excellent analytical skills and attention to detail. Successfully completed advanced financial modeling certification and demonstrated leadership in process improvements.',
                approvedBy: 'Michael Chen',
                approvedDate: '2024-07-28',
                remarks: 'Ready for advanced financial analysis responsibilities.'
            },
            {
                id: 5,
                employeeName: 'Liam Foster',
                department: 'HR',
                previousDepartment: 'Admin',
                currentRole: 'HR Generalist',
                previousRole: 'Administrative Assistant',
                movementType: 'Transfer',
                effectiveDate: '2024-08-05',
                status: 'Pending',
                reasons: 'Career development opportunity to work in HR department. Has relevant experience in employee relations and administrative tasks.',
                approvedBy: '',
                approvedDate: '',
                remarks: 'Transfer approved by Admin manager, pending HR director approval.'
            },
            {
                id: 6,
                employeeName: 'Isabella Reed',
                department: 'Operations',
                previousDepartment: 'Operations',
                currentRole: 'Operations Manager',
                previousRole: 'Operations Supervisor',
                movementType: 'Promotion',
                effectiveDate: '2024-08-10',
                status: 'Approved',
                reasons: 'Demonstrated exceptional leadership skills and operational efficiency improvements. Successfully managed team of 15 employees and improved process workflows.',
                approvedBy: 'David Wilson',
                approvedDate: '2024-08-05',
                remarks: 'Natural leader with strong operational mindset.'
            },
            {
                id: 7,
                employeeName: 'Jackson Hayes',
                department: 'Product',
                previousDepartment: 'Engineering',
                currentRole: 'Product Manager',
                previousRole: 'Software Engineer',
                movementType: 'Transfer',
                effectiveDate: '2024-08-15',
                status: 'Pending',
                reasons: 'Strong technical background combined with business acumen. Interested in product strategy and user experience design.',
                approvedBy: '',
                approvedDate: '',
                remarks: 'Cross-functional transfer to leverage technical expertise in product management.'
            }
        ];
        this.totalItems = this.personnelMovements.length;
        this.filterMovements();
    }
    filterMovements() {
        if (!this.searchTerm.trim()) {
            this.filteredMovements = this.personnelMovements;
        }
        else {
            this.filteredMovements = this.personnelMovements.filter(movement => movement.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                movement.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                movement.currentRole.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                movement.movementType.toLowerCase().includes(this.searchTerm.toLowerCase()));
        }
        this.currentPage = 1;
        this.totalItems = this.filteredMovements.length;
    }
    get paginatedMovements() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredMovements.slice(startIndex, endIndex);
    }
    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    get startItem() {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }
    get endItem() {
        return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    }
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
    getStatusClass(status) {
        switch (status) {
            case 'Approved':
                return 'status-approved';
            case 'Pending':
                return 'status-pending';
            case 'Rejected':
                return 'status-rejected';
            default:
                return '';
        }
    }
    getMovementTypeClass(type) {
        switch (type) {
            case 'Promotion':
                return 'bg-blue-100 text-blue-800';
            case 'Transfer':
                return 'bg-purple-100 text-purple-800';
            case 'Demotion':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return '';
        }
    }
    onSearch() {
        this.filterMovements();
    }
    onNewMovement() {
        this.resetNewMovementForm();
        this.showNewMovementModal = true;
    }
    closeNewMovementModal() {
        this.showNewMovementModal = false;
    }
    resetNewMovementForm() {
        this.newMovement = {
            employeeName: '',
            department: '',
            previousDepartment: '',
            currentRole: '',
            previousRole: '',
            movementType: 'Promotion',
            effectiveDate: '',
            status: 'Pending',
            reasons: '',
            approvedBy: '',
            approvedDate: '',
            remarks: ''
        };
    }
    createMovement() {
        if (this.newMovement.employeeName &&
            this.newMovement.department &&
            this.newMovement.currentRole &&
            this.newMovement.movementType &&
            this.newMovement.effectiveDate) {
            const newId = this.personnelMovements.length > 0 ? Math.max(...this.personnelMovements.map(m => m.id)) + 1 : 1;
            const movement = {
                id: newId,
                employeeName: this.newMovement.employeeName,
                department: this.newMovement.department,
                previousDepartment: this.newMovement.previousDepartment || undefined,
                currentRole: this.newMovement.currentRole,
                previousRole: this.newMovement.previousRole || undefined,
                movementType: this.newMovement.movementType,
                effectiveDate: this.newMovement.effectiveDate,
                status: this.newMovement.status,
                reasons: this.newMovement.reasons || undefined,
                approvedBy: this.newMovement.approvedBy || undefined,
                approvedDate: this.newMovement.approvedDate || undefined,
                remarks: this.newMovement.remarks || undefined
            };
            this.personnelMovements.unshift(movement);
            this.filterMovements();
            this.closeNewMovementModal();
        }
    }
    onViewMovement(movement) {
        this.selectedMovement = movement;
        this.showViewMovementModal = true;
    }
    closeViewMovementModal() {
        this.showViewMovementModal = false;
        this.selectedMovement = null;
    }
    onEditMovement(movement) {
        this.selectedMovement = movement;
        this.editMovement = {
            employeeName: movement.employeeName,
            department: movement.department,
            previousDepartment: movement.previousDepartment || '',
            currentRole: movement.currentRole,
            previousRole: movement.previousRole || '',
            movementType: movement.movementType,
            effectiveDate: movement.effectiveDate,
            status: movement.status,
            reasons: movement.reasons || '',
            approvedBy: movement.approvedBy || '',
            approvedDate: movement.approvedDate || '',
            remarks: movement.remarks || ''
        };
        this.showEditMovementModal = true;
    }
    closeEditMovementModal() {
        this.showEditMovementModal = false;
        this.selectedMovement = null;
        this.resetEditMovementForm();
    }
    resetEditMovementForm() {
        this.editMovement = {
            employeeName: '',
            department: '',
            previousDepartment: '',
            currentRole: '',
            previousRole: '',
            movementType: 'Promotion',
            effectiveDate: '',
            status: 'Pending',
            reasons: '',
            approvedBy: '',
            approvedDate: '',
            remarks: ''
        };
    }
    updateMovement() {
        if (this.selectedMovement &&
            this.editMovement.employeeName &&
            this.editMovement.department &&
            this.editMovement.currentRole &&
            this.editMovement.movementType &&
            this.editMovement.effectiveDate) {
            const index = this.personnelMovements.findIndex(m => m.id === this.selectedMovement.id);
            if (index !== -1) {
                this.personnelMovements[index] = {
                    ...this.personnelMovements[index],
                    employeeName: this.editMovement.employeeName,
                    department: this.editMovement.department,
                    previousDepartment: this.editMovement.previousDepartment || undefined,
                    currentRole: this.editMovement.currentRole,
                    previousRole: this.editMovement.previousRole || undefined,
                    movementType: this.editMovement.movementType,
                    effectiveDate: this.editMovement.effectiveDate,
                    status: this.editMovement.status,
                    reasons: this.editMovement.reasons || undefined,
                    approvedBy: this.editMovement.approvedBy || undefined,
                    approvedDate: this.editMovement.approvedDate || undefined,
                    remarks: this.editMovement.remarks || undefined
                };
                this.filterMovements();
                this.closeEditMovementModal();
            }
        }
    }
    onNavigateToWorkflows() {
        this.router.navigate(['/personnel-information-management/workflows']);
    }
    onNavigateToAuditTrail() {
        this.router.navigate(['/personnel-information-management/audit-trail']);
    }
    onDeleteMovement(movement) {
        if (confirm(`Are you sure you want to delete the movement for ${movement.employeeName}?`)) {
            this.personnelMovements = this.personnelMovements.filter(m => m.id !== movement.id);
            this.filterMovements();
        }
    }
};
exports.PersonnelMovementComponent = PersonnelMovementComponent;
exports.PersonnelMovementComponent = PersonnelMovementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-personnel-movement',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './personnel-movement.component.html',
        styleUrls: ['./personnel-movement.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], PersonnelMovementComponent);
//# sourceMappingURL=personnel-movement.component.js.map