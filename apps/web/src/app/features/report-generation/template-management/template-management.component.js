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
exports.TemplateManagementComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
var ReportType;
(function (ReportType) {
    ReportType["EMPLOYEE"] = "EMPLOYEE";
    ReportType["PAYROLL"] = "PAYROLL";
    ReportType["PERFORMANCE"] = "PERFORMANCE";
    ReportType["ATTENDANCE"] = "ATTENDANCE";
    ReportType["CUSTOM"] = "CUSTOM";
})(ReportType || (ReportType = {}));
let TemplateManagementComponent = class TemplateManagementComponent {
    fb;
    showCreateModal = false;
    showLayoutModal = false;
    editingTemplate = null;
    editingLayout = null;
    templateForm;
    layoutForm;
    reportTemplates = [];
    reportTypes = Object.values(ReportType);
    departments = ['All', 'Human Resources', 'Finance', 'IT Department', 'Operations'];
    globalLayouts = [
        {
            id: '1',
            name: 'Standard Report Layout',
            description: 'Default layout for standard reports with professional styling',
            isDefault: true,
            config: {
                pageSize: 'A4',
                margins: '2.5cm',
                fontFamily: 'Arial',
                colorScheme: ['#2563eb', '#16a34a', '#dc2626', '#eab308']
            }
        },
        {
            id: '2',
            name: 'Compact Layout',
            description: 'Space-efficient layout for detailed reports',
            isDefault: false,
            config: {
                pageSize: 'A4',
                margins: '1.5cm',
                fontFamily: 'Calibri',
                colorScheme: ['#4a90e2', '#50c878', '#ff6b6b', '#ffd700']
            }
        }
    ];
    constructor(fb) {
        this.fb = fb;
        this.templateForm = this.createTemplateForm();
        this.layoutForm = this.createLayoutForm();
    }
    ngOnInit() {
        this.loadSampleData();
    }
    createTemplateForm() {
        return this.fb.group({
            name: ['', [forms_1.Validators.required]],
            description: [''],
            type: ['', [forms_1.Validators.required]],
            department: ['', [forms_1.Validators.required]],
            sections: this.fb.array([]),
            fields: this.fb.array([]),
            styling: this.fb.group({
                headerColor: ['#4a90e2'],
                fontFamily: ['Arial'],
                fontSize: ['12pt']
            })
        });
    }
    createLayoutForm() {
        return this.fb.group({
            name: ['', [forms_1.Validators.required]],
            description: [''],
            config: this.fb.group({
                pageSize: ['A4', [forms_1.Validators.required]],
                margins: ['2.5cm', [forms_1.Validators.required]],
                fontFamily: ['Arial', [forms_1.Validators.required]],
                colorScheme: this.fb.array([
                    this.fb.control('#2563eb'),
                    this.fb.control('#16a34a'),
                    this.fb.control('#dc2626'),
                    this.fb.control('#eab308')
                ])
            })
        });
    }
    get sections() {
        return this.templateForm.get('sections');
    }
    get fields() {
        return this.templateForm.get('fields');
    }
    get colorScheme() {
        return this.layoutForm.get('config.colorScheme');
    }
    addSection() {
        this.sections.push(this.fb.control(''));
    }
    removeSection(index) {
        this.sections.removeAt(index);
    }
    addField() {
        this.fields.push(this.fb.control(''));
    }
    removeField(index) {
        this.fields.removeAt(index);
    }
    addColor() {
        if (this.colorScheme.length < 6) {
            this.colorScheme.push(this.fb.control('#000000'));
        }
    }
    removeColor(index) {
        if (this.colorScheme.length > 1) {
            this.colorScheme.removeAt(index);
        }
    }
    openCreateTemplateModal() {
        this.editingTemplate = null;
        this.templateForm.reset({
            styling: {
                headerColor: '#4a90e2',
                fontFamily: 'Arial',
                fontSize: '12pt'
            }
        });
        this.showCreateModal = true;
    }
    openCreateLayoutModal() {
        this.editingLayout = null;
        this.layoutForm.reset({
            config: {
                pageSize: 'A4',
                margins: '2.5cm',
                fontFamily: 'Arial',
                colorScheme: ['#2563eb', '#16a34a', '#dc2626', '#eab308']
            }
        });
        this.showLayoutModal = true;
    }
    closeCreateTemplateModal() {
        this.showCreateModal = false;
        this.editingTemplate = null;
        this.templateForm.reset();
        this.sections.clear();
        this.fields.clear();
    }
    closeLayoutModal() {
        this.showLayoutModal = false;
        this.editingLayout = null;
        this.layoutForm.reset();
    }
    editTemplate(template) {
        this.editingTemplate = template;
        this.templateForm.patchValue({
            name: template.name,
            description: template.description,
            type: template.type,
            department: template.department,
            styling: template.layout.styling
        });
        // Clear and repopulate sections
        this.sections.clear();
        template.layout.sections.forEach(section => {
            this.sections.push(this.fb.control(section));
        });
        // Clear and repopulate fields
        this.fields.clear();
        template.layout.fields.forEach(field => {
            this.fields.push(this.fb.control(field));
        });
        this.showCreateModal = true;
    }
    editLayout(layout) {
        this.editingLayout = layout;
        this.layoutForm.patchValue({
            name: layout.name,
            description: layout.description,
            config: {
                pageSize: layout.config.pageSize,
                margins: layout.config.margins,
                fontFamily: layout.config.fontFamily
            }
        });
        // Clear and repopulate color scheme
        const colorSchemeArray = this.layoutForm.get('config.colorScheme');
        colorSchemeArray.clear();
        layout.config.colorScheme.forEach(color => {
            colorSchemeArray.push(this.fb.control(color));
        });
        this.showLayoutModal = true;
    }
    saveTemplate() {
        if (this.templateForm.valid) {
            const formValue = this.templateForm.value;
            const template = {
                id: this.editingTemplate?.id || crypto.randomUUID(),
                name: formValue.name,
                description: formValue.description,
                department: formValue.department,
                lastModified: new Date(),
                status: this.editingTemplate?.status || 'draft',
                type: formValue.type,
                layout: {
                    sections: formValue.sections.filter((s) => s.trim()),
                    fields: formValue.fields.filter((f) => f.trim()),
                    styling: formValue.styling
                }
            };
            if (this.editingTemplate) {
                // Update existing template
                const index = this.reportTemplates.findIndex(t => t.id === this.editingTemplate.id);
                if (index !== -1) {
                    this.reportTemplates[index] = template;
                }
            }
            else {
                // Add new template
                this.reportTemplates.push(template);
            }
            this.closeCreateTemplateModal();
        }
    }
    saveLayout() {
        if (this.layoutForm.valid) {
            const formValue = this.layoutForm.value;
            const layout = {
                id: this.editingLayout?.id || crypto.randomUUID(),
                name: formValue.name,
                description: formValue.description,
                isDefault: this.editingLayout?.isDefault || false,
                config: {
                    pageSize: formValue.config.pageSize,
                    margins: formValue.config.margins,
                    fontFamily: formValue.config.fontFamily,
                    colorScheme: formValue.config.colorScheme.filter((c) => c.trim())
                }
            };
            if (this.editingLayout) {
                // Update existing layout
                const index = this.globalLayouts.findIndex(l => l.id === this.editingLayout.id);
                if (index !== -1) {
                    this.globalLayouts[index] = layout;
                }
            }
            else {
                // Add new layout
                this.globalLayouts.push(layout);
            }
            this.closeLayoutModal();
        }
    }
    deleteTemplate(id) {
        if (confirm('Are you sure you want to delete this template?')) {
            const index = this.reportTemplates.findIndex(t => t.id === id);
            if (index !== -1) {
                this.reportTemplates.splice(index, 1);
            }
        }
    }
    deleteLayout(id) {
        if (confirm('Are you sure you want to delete this layout?')) {
            const index = this.globalLayouts.findIndex(l => l.id === id);
            if (index !== -1 && !this.globalLayouts[index].isDefault) {
                this.globalLayouts.splice(index, 1);
            }
            else {
                alert('Cannot delete the default layout');
            }
        }
    }
    setDefaultLayout(id) {
        this.globalLayouts.forEach(layout => {
            layout.isDefault = layout.id === id;
        });
    }
    previewTemplate(template) {
        // TODO: Implement template preview functionality
        console.log('Previewing template:', template);
    }
    previewLayout(layout) {
        // TODO: Implement layout preview functionality
        console.log('Previewing layout:', layout);
    }
    getTemplateStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'active':
                return '#28a745';
            case 'draft':
                return '#ffc107';
            case 'archived':
                return '#6c757d';
            default:
                return '#6c757d';
        }
    }
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    loadSampleData() {
        this.reportTemplates = [
            {
                id: '1',
                name: 'Monthly Financial Report',
                description: 'Standard financial report template with income statement and balance sheet sections',
                department: 'Finance',
                lastModified: new Date('2024-03-15'),
                status: 'active',
                type: ReportType.PAYROLL,
                layout: {
                    sections: ['Income Statement', 'Balance Sheet', 'Cash Flow'],
                    fields: ['Revenue', 'Expenses', 'Net Income', 'Assets', 'Liabilities'],
                    styling: {
                        headerColor: '#4a90e2',
                        fontFamily: 'Arial',
                        fontSize: '12pt'
                    }
                }
            },
            {
                id: '2',
                name: 'Employee Performance Review',
                description: 'Quarterly performance evaluation template',
                department: 'Human Resources',
                lastModified: new Date('2024-03-10'),
                status: 'draft',
                type: ReportType.EMPLOYEE,
                layout: {
                    sections: ['Goals', 'Achievements', 'Areas for Improvement'],
                    fields: ['Employee Name', 'Department', 'Manager', 'Rating', 'Comments'],
                    styling: {
                        headerColor: '#28a745',
                        fontFamily: 'Calibri',
                        fontSize: '11pt'
                    }
                }
            }
        ];
    }
};
exports.TemplateManagementComponent = TemplateManagementComponent;
exports.TemplateManagementComponent = TemplateManagementComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-template-management',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
        templateUrl: './template-management.component.html',
        styleUrls: ['./template-management.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], TemplateManagementComponent);
//# sourceMappingURL=template-management.component.js.map