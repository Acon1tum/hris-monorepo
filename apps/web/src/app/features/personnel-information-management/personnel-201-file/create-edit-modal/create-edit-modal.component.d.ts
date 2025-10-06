import { EventEmitter, AfterViewInit, ElementRef, Renderer2, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Personnel201ModalData {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    email: string;
    number: string;
    address: string;
    department: string;
    position: string;
    file?: File | null;
    birthdate?: string;
    gender?: string;
    civilStatus?: string;
    employmentType?: string;
    designation?: string;
    appointmentDate?: string;
    startDate?: string;
    employmentStatus?: string;
    jobLevel?: string;
    jobGrade?: string;
    gsis?: string;
    pagibig?: string;
    philhealth?: string;
    sss?: string;
    tin_number?: string;
    dependents?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    emergencyContactRelationship?: string;
    fileName?: string;
    profilePictureUrl?: string;
    profilePictureFile?: File | null;
    username?: string;
    password?: string;
    confirmPassword?: string;
    profilePictureBase64?: string | null;
}
export interface Department {
    id: string;
    department_name: string;
    description?: string;
    department_head?: string;
}
export declare class CreateEditModalComponent implements AfterViewInit {
    private renderer;
    private http;
    mode: 'create' | 'edit';
    data: Personnel201ModalData;
    departments: Department[];
    loading: boolean;
    save: EventEmitter<Personnel201ModalData>;
    cancel: EventEmitter<void>;
    personnelId: string;
    uploadDocuments: EventEmitter<{
        files: File[];
        metas: {
            title: string;
            description: string;
        }[];
    }>;
    refreshTable: EventEmitter<void>;
    fadeSections: QueryList<ElementRef>;
    modalForm: any;
    private lastScrollTop;
    constructor(renderer: Renderer2, http: HttpClient);
    isDragOver: boolean;
    showFloatingProfile: boolean;
    closing: boolean;
    formSubmitted: boolean;
    showValidationMessage: boolean;
    selectedFiles: File[];
    fileMetas: {
        title: string;
        description: string;
    }[];
    onWindowScroll(): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onFileChange(event: Event): void;
    onFileDrop(event: DragEvent): void;
    removeFile(index: number): void;
    onProfilePictureChange(event: any): void;
    removeProfilePicture(): void;
    onSave(): Promise<void>;
    private validatePassword;
    getPasswordStrengthClass(): string;
    getPasswordStrengthText(): string;
    hasUppercase(): boolean;
    hasLowercase(): boolean;
    hasNumber(): boolean;
    hasSpecialChar(): boolean;
    generateUsernameFromEmail(): string;
    hideValidationMessage(): void;
    onCancel(): void;
    ngAfterViewInit(): void;
    noop(event: Event): void;
}
//# sourceMappingURL=create-edit-modal.component.d.ts.map