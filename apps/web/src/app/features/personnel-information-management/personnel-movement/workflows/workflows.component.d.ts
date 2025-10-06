import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Workflow {
    id: number;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    approvalSteps: ApprovalStep[];
}
interface ApprovalStep {
    id: number;
    stepNumber: number;
    approvers: string;
    conditions: string;
}
export declare class WorkflowsComponent implements OnInit {
    private router;
    workflows: Workflow[];
    selectedWorkflow: Workflow | null;
    isEditing: boolean;
    workflowForm: {
        name: string;
        description: string;
        approvalSteps: ApprovalStep[];
    };
    constructor(router: Router);
    ngOnInit(): void;
    loadWorkflows(): void;
    onNavigateToPersonnelMovement(): void;
    onCreateNewWorkflow(): void;
    onEditWorkflow(workflow: Workflow): void;
    onDeleteWorkflow(workflow: Workflow): void;
    onAddApprovalStep(): void;
    onEditApprovalStep(step: ApprovalStep): void;
    onDeleteApprovalStep(step: ApprovalStep): void;
    onCancel(): void;
    onSaveWorkflow(): void;
    private resetForm;
    getStatusClass(status: string): string;
}
export {};
//# sourceMappingURL=workflows.component.d.ts.map