import { EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserManagementService, User } from '../user-management.service';
export declare class UserFormModalComponent implements OnInit, OnChanges {
    private fb;
    private userService;
    isOpen: boolean;
    user: User | null;
    isEdit: boolean;
    close: EventEmitter<void>;
    userSaved: EventEmitter<User>;
    userForm: FormGroup;
    loading: boolean;
    error: string | null;
    availableRoles: string[];
    availableStatuses: string[];
    constructor(fb: FormBuilder, userService: UserManagementService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private initializeForm;
    onClose(): void;
    onSubmit(): void;
    private markFormGroupTouched;
    getFieldError(fieldName: string): string;
    private getFieldLabel;
    isFieldInvalid(fieldName: string): boolean;
}
//# sourceMappingURL=user-form-modal.component.d.ts.map