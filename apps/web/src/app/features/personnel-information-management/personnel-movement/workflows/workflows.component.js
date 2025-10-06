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
exports.WorkflowsComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
let WorkflowsComponent = class WorkflowsComponent {
    router;
    workflows = [];
    selectedWorkflow = null;
    isEditing = false;
    // Form data
    workflowForm = {
        name: '',
        description: '',
        approvalSteps: []
    };
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.loadWorkflows();
    }
    loadWorkflows() {
        // Mock data - replace with actual API call
        this.workflows = [
            {
                id: 1,
                name: 'Promotion Workflow',
                description: 'Workflow for promotions within the company.',
                status: 'Active',
                approvalSteps: [
                    {
                        id: 1,
                        stepNumber: 1,
                        approvers: 'Manager, HR',
                        conditions: 'Employee Performance > 80%'
                    },
                    {
                        id: 2,
                        stepNumber: 2,
                        approvers: 'HR Director',
                        conditions: 'Step 1 Approved'
                    }
                ]
            },
            {
                id: 2,
                name: 'Transfer Workflow',
                description: 'Workflow for transferring employees between departments.',
                status: 'Inactive',
                approvalSteps: [
                    {
                        id: 3,
                        stepNumber: 1,
                        approvers: 'Department Head',
                        conditions: 'Position Available'
                    }
                ]
            },
            {
                id: 3,
                name: 'Reassignment Workflow',
                description: 'Workflow for reassigning employees to different roles.',
                status: 'Active',
                approvalSteps: [
                    {
                        id: 4,
                        stepNumber: 1,
                        approvers: 'Manager',
                        conditions: 'Role Change Requested'
                    }
                ]
            }
        ];
    }
    onNavigateToPersonnelMovement() {
        this.router.navigate(['/personnel-information-management/personnel-movement']);
    }
    onCreateNewWorkflow() {
        this.isEditing = true;
        this.selectedWorkflow = null;
        this.resetForm();
    }
    onEditWorkflow(workflow) {
        this.isEditing = true;
        this.selectedWorkflow = workflow;
        this.workflowForm = {
            name: workflow.name,
            description: workflow.description,
            approvalSteps: [...workflow.approvalSteps]
        };
    }
    onDeleteWorkflow(workflow) {
        if (confirm(`Are you sure you want to delete the workflow "${workflow.name}"?`)) {
            this.workflows = this.workflows.filter(w => w.id !== workflow.id);
        }
    }
    onAddApprovalStep() {
        const newStep = {
            id: Date.now(),
            stepNumber: this.workflowForm.approvalSteps.length + 1,
            approvers: '',
            conditions: ''
        };
        this.workflowForm.approvalSteps.push(newStep);
    }
    onEditApprovalStep(step) {
        // Implement edit step functionality
        console.log('Edit step:', step);
    }
    onDeleteApprovalStep(step) {
        this.workflowForm.approvalSteps = this.workflowForm.approvalSteps.filter(s => s.id !== step.id);
        // Reorder step numbers
        this.workflowForm.approvalSteps.forEach((s, index) => {
            s.stepNumber = index + 1;
        });
    }
    onCancel() {
        this.isEditing = false;
        this.selectedWorkflow = null;
        this.resetForm();
    }
    onSaveWorkflow() {
        if (!this.workflowForm.name.trim()) {
            alert('Please enter a workflow name');
            return;
        }
        if (this.selectedWorkflow) {
            // Update existing workflow
            const index = this.workflows.findIndex(w => w.id === this.selectedWorkflow.id);
            if (index !== -1) {
                this.workflows[index] = {
                    ...this.selectedWorkflow,
                    name: this.workflowForm.name,
                    description: this.workflowForm.description,
                    approvalSteps: this.workflowForm.approvalSteps
                };
            }
        }
        else {
            // Create new workflow
            const newWorkflow = {
                id: Date.now(),
                name: this.workflowForm.name,
                description: this.workflowForm.description,
                status: 'Active',
                approvalSteps: this.workflowForm.approvalSteps
            };
            this.workflows.push(newWorkflow);
        }
        this.isEditing = false;
        this.selectedWorkflow = null;
        this.resetForm();
    }
    resetForm() {
        this.workflowForm = {
            name: '',
            description: '',
            approvalSteps: []
        };
    }
    getStatusClass(status) {
        return status === 'Active' ? 'status-badge-active' : 'status-badge-inactive';
    }
};
exports.WorkflowsComponent = WorkflowsComponent;
exports.WorkflowsComponent = WorkflowsComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-workflows',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './workflows.component.html',
        styleUrls: ['./workflows.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], WorkflowsComponent);
//# sourceMappingURL=workflows.component.js.map