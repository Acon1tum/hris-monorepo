import { OnInit } from '@angular/core';
interface Request {
    id: string;
    type: string;
    status: string;
    createdBy: string;
    date: string | Date;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
    assignedTo?: string;
}
interface WorkflowStep {
    id: string;
    name: string;
    role: string;
    order: number;
    isRequired: boolean;
    estimatedDays: number;
}
interface EscalationRule {
    id: string;
    name: string;
    condition: string;
    action: string;
    timeLimit: number;
    notifyTo: string;
}
interface Workflow {
    id: string;
    name: string;
    description: string;
    requestType: string;
    isActive: boolean;
    steps: WorkflowStep[];
    escalationRules: EscalationRule[];
    createdAt: Date;
    updatedAt: Date;
}
interface AuditLog {
    id: string;
    action: string;
    entityType: 'Request' | 'Workflow' | 'Step' | 'Escalation' | 'System';
    entityId: string;
    entityName: string;
    userId: string;
    userName: string;
    timestamp: Date;
    details: string;
    ipAddress: string;
    userAgent: string;
    changes?: {
        field: string;
        oldValue: string;
        newValue: string;
    }[];
}
interface AnalyticsData {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    averageProcessingTime: number;
    requestsByType: {
        type: string;
        count: number;
        percentage: number;
    }[];
    requestsByStatus: {
        status: string;
        count: number;
        percentage: number;
    }[];
    requestsByPriority: {
        priority: string;
        count: number;
        percentage: number;
    }[];
    requestsByMonth: {
        month: string;
        count: number;
    }[];
    topRequesters: {
        name: string;
        count: number;
    }[];
    topApprovers: {
        name: string;
        count: number;
    }[];
    workflowEfficiency: {
        workflowName: string;
        avgTime: number;
        successRate: number;
    }[];
    complianceMetrics: {
        slaCompliance: number;
        averageResponseTime: number;
        escalationRate: number;
        approvalRate: number;
    };
}
interface ComplianceReport {
    id: string;
    reportType: string;
    period: string;
    generatedAt: Date;
    data: any;
    status: 'Generated' | 'Processing' | 'Failed';
}
export declare class AdminRequestComponent implements OnInit {
    requests: Request[];
    requestTypes: string[];
    workflows: Workflow[];
    auditLogs: AuditLog[];
    analyticsData: AnalyticsData;
    complianceReports: ComplianceReport[];
    showDialog: boolean;
    isEdit: boolean;
    dialogTitle: string;
    requestForm: Request;
    editIndex: number | null;
    showWorkflowDialog: boolean;
    isWorkflowEdit: boolean;
    workflowDialogTitle: string;
    workflowForm: Workflow;
    editWorkflowIndex: number | null;
    showStepDialog: boolean;
    isStepEdit: boolean;
    stepDialogTitle: string;
    stepForm: WorkflowStep;
    editStepIndex: number | null;
    currentWorkflowId: string;
    showEscalationDialog: boolean;
    isEscalationEdit: boolean;
    escalationDialogTitle: string;
    escalationForm: EscalationRule;
    editEscalationIndex: number | null;
    showAnalyticsDialog: boolean;
    showAuditDialog: boolean;
    showComplianceDialog: boolean;
    selectedAnalyticsPeriod: string;
    selectedAuditFilters: {
        action: string;
        entityType: string;
        userId: string;
        dateRange: string;
    };
    filterText: string;
    advancedFilter: {
        type: string;
        status: string;
        date: string;
        priority: string;
        assignedTo: string;
    };
    workflowFilterText: string;
    workflowTypeFilter: string;
    isLoading: boolean;
    showAdvancedFilters: boolean;
    selectedRequests: string[];
    selectedWorkflows: string[];
    currentTab: string;
    statistics: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    availableRoles: string[];
    escalationConditions: string[];
    escalationActions: string[];
    analyticsPeriods: {
        value: string;
        label: string;
    }[];
    auditActions: string[];
    auditEntityTypes: string[];
    constructor();
    ngOnInit(): void;
    getEmptyRequest(): Request;
    getEmptyWorkflow(): Workflow;
    getEmptyStep(): WorkflowStep;
    getEmptyEscalationRule(): EscalationRule;
    getEmptyAnalytics(): AnalyticsData;
    generateId(): string;
    loadRequests(): void;
    loadWorkflows(): void;
    loadAuditLogs(): void;
    loadComplianceReports(): void;
    generateSampleAuditLogs(): AuditLog[];
    generateSampleComplianceReports(): ComplianceReport[];
    saveRequests(): void;
    saveWorkflows(): void;
    saveAuditLogs(): void;
    saveComplianceReports(): void;
    logAudit(action: string, entityType: string, entityId: string, userName: string, details: string, changes?: any[]): void;
    calculateStatistics(): void;
    generateAnalytics(): void;
    generateMonthlyData(): {
        month: string;
        count: number;
    }[];
    openDialog(edit?: boolean, index?: number | null): void;
    closeDialog(): void;
    saveRequest(): void;
    deleteRequest(index: number): void;
    openWorkflowDialog(edit?: boolean, index?: number | null): void;
    closeWorkflowDialog(): void;
    saveWorkflow(): void;
    deleteWorkflow(index: number): void;
    toggleWorkflow(workflowId: string): void;
    openStepDialog(workflowId: string, edit?: boolean, stepIndex?: number | null): void;
    closeStepDialog(): void;
    saveStep(): void;
    deleteStep(workflowId: string, stepIndex: number): void;
    openEscalationDialog(workflowId: string, edit?: boolean, escalationIndex?: number | null): void;
    closeEscalationDialog(): void;
    saveEscalationRule(): void;
    deleteEscalationRule(workflowId: string, escalationIndex: number): void;
    openAnalyticsDialog(): void;
    closeAnalyticsDialog(): void;
    openAuditDialog(): void;
    closeAuditDialog(): void;
    openComplianceDialog(): void;
    closeComplianceDialog(): void;
    generateComplianceReport(): void;
    exportAuditLogs(): void;
    filteredRequests(): Request[];
    filteredWorkflows(): Workflow[];
    filteredAuditLogs(): AuditLog[];
    formatDate(date: Date): string;
    getStatusColor(status: string): string;
    getPriorityColor(priority: string): string;
    showNotification(message: string, type?: 'success' | 'error' | 'warning' | 'info'): void;
    setCurrentTab(tab: string): void;
    toggleWorkflowSelection(workflowId: string): void;
    selectAllWorkflows(): void;
    bulkActivateWorkflows(): void;
    bulkDeactivateWorkflows(): void;
    deleteSelectedWorkflows(): void;
    exportWorkflows(): void;
    clearAdvancedFilters(): void;
    clearWorkflowFilters(): void;
    clearAuditFilters(): void;
    applyAdvancedFilters(): void;
    toggleAdvancedFilters(): void;
    deleteSelectedRequests(): void;
    toggleRequestSelection(requestId: string): void;
    selectAllRequests(): void;
    exportRequests(): void;
    bulkApprove(): void;
    bulkReject(): void;
}
export {};
//# sourceMappingURL=admin-request.component.d.ts.map