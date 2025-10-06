import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface UserProfile {
    general: {
        firstName: string;
        middleName: string;
        lastName: string;
        fullName: string;
        birthdate: string;
        contactNumber: string;
        address: string;
        email: string;
        gender: string;
        civilStatus: string;
        citizenship: string;
    };
    employment: {
        employmentType: string;
        designation: string;
        department: string;
        appointmentDate: string;
        startDate: string;
        employmentStatus: string;
        jobLevel: string;
        jobGrade: string;
    };
    membership: {
        gsis: string;
        pagibig: string;
        philhealth: string;
        sss: string;
    };
    other: {
        dependents: string;
        emergencyContactName: string;
        emergencyContactNumber: string;
        emergencyContactRelationship: string;
    };
}
export interface EmployeeDocument {
    id: string;
    personnelId: string;
    title: string;
    description: string | null;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface UploadDocumentRequest {
    title: string;
    description?: string;
    category?: string;
    file: File;
}
export declare class EmployeeSelfService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    fetchMyProfile(): Observable<{
        success: boolean;
        data: UserProfile;
        message: string;
    }>;
    updateMyProfile(profileData: Partial<UserProfile>): Observable<{
        success: boolean;
        message: string;
    }>;
    getMyDocuments(): Observable<{
        success: boolean;
        data: EmployeeDocument[];
        message: string;
    }>;
    uploadDocument(uploadData: UploadDocumentRequest): Observable<{
        success: boolean;
        data: EmployeeDocument;
        message: string;
    }>;
    deleteDocument(documentId: string): Observable<{
        success: boolean;
        message: string;
    }>;
    downloadDocument(document: EmployeeDocument): void;
}
//# sourceMappingURL=employee-self.service.d.ts.map