import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeSelfService } from '../../../services/employee-self-service.service';
import { UserProfile } from '../../../interfaces/my-profile.interface';
export declare class MyProfileComponent implements OnInit {
    private employeeSelfService;
    private fb;
    userProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
    showEditModal: boolean;
    savingEdit: boolean;
    editProfileForm: FormGroup;
    toastMessage: string;
    showToast: boolean;
    showToastNotification(message: string): void;
    constructor(employeeSelfService: EmployeeSelfService, fb: FormBuilder);
    ngOnInit(): void;
    fetchProfile(): void;
    patchEditProfileForm(): void;
    formatDateForInput(dateStr: string): string;
    onEditProfile(): void;
    onCancelEditProfile(): void;
    onSaveEditProfile(): void;
    get generalInformationFields(): {
        label: string;
        value: string;
    }[];
    get employmentDetailsFields(): {
        label: string;
        value: string;
    }[];
    get membershipInformationFields(): {
        label: string;
        value: string;
    }[];
    get otherInformationFields(): {
        label: string;
        value: string;
    }[];
}
//# sourceMappingURL=my-profile.component.d.ts.map