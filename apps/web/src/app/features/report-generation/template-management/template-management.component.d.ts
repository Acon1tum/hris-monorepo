import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
declare enum ReportType {
    EMPLOYEE = "EMPLOYEE",
    PAYROLL = "PAYROLL",
    PERFORMANCE = "PERFORMANCE",
    ATTENDANCE = "ATTENDANCE",
    CUSTOM = "CUSTOM"
}
interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    department: string;
    lastModified: Date;
    status: 'active' | 'draft' | 'archived';
    type: ReportType;
    layout: {
        sections: string[];
        fields: string[];
        styling: {
            headerColor: string;
            fontFamily: string;
            fontSize: string;
        };
    };
}
interface GlobalLayout {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    config: {
        pageSize: string;
        margins: string;
        fontFamily: string;
        colorScheme: string[];
    };
}
export declare class TemplateManagementComponent implements OnInit {
    private fb;
    showCreateModal: boolean;
    showLayoutModal: boolean;
    editingTemplate: ReportTemplate | null;
    editingLayout: GlobalLayout | null;
    templateForm: FormGroup;
    layoutForm: FormGroup;
    reportTemplates: ReportTemplate[];
    reportTypes: ReportType[];
    departments: string[];
    globalLayouts: GlobalLayout[];
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    createTemplateForm(): FormGroup;
    createLayoutForm(): FormGroup;
    get sections(): FormArray;
    get fields(): FormArray;
    get colorScheme(): FormArray;
    addSection(): void;
    removeSection(index: number): void;
    addField(): void;
    removeField(index: number): void;
    addColor(): void;
    removeColor(index: number): void;
    openCreateTemplateModal(): void;
    openCreateLayoutModal(): void;
    closeCreateTemplateModal(): void;
    closeLayoutModal(): void;
    editTemplate(template: ReportTemplate): void;
    editLayout(layout: GlobalLayout): void;
    saveTemplate(): void;
    saveLayout(): void;
    deleteTemplate(id: string): void;
    deleteLayout(id: string): void;
    setDefaultLayout(id: string): void;
    previewTemplate(template: ReportTemplate): void;
    previewLayout(layout: GlobalLayout): void;
    getTemplateStatusColor(status: string): string;
    formatDate(date: Date): string;
    private loadSampleData;
}
export {};
//# sourceMappingURL=template-management.component.d.ts.map