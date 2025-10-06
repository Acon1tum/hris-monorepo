import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Personnel201File {
    id: string;
    employeeName: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    suffix?: string;
    email?: string;
    contact_number?: string;
    address?: string;
    department: string;
    departmentName?: string;
    position: string;
    designation?: string;
    dateCreated: string;
    lastModified: string;
    createdBy: string;
    modifiedBy: string;
    auditTrail: AuditTrailEntry[];
    fileName?: string;
    profilePictureUrl?: string;
    profilePictureFile?: File | null;
    date_of_birth?: string;
    gender?: string;
    civil_status?: string;
    citizenship?: string;
    employment_type?: string;
    date_hired?: string;
    employment_status?: string;
    salary?: number;
    gsis_number?: string;
    pagibig_number?: string;
    philhealth_number?: string;
    sss_number?: string;
    tin_number?: string;
    dependents?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
    emergencyContactRelationship?: string;
    user?: {
        id: string;
        username: string;
        email: string;
        status: string;
    };
    jobLevel?: string;
    jobGrade?: string;
}
export interface AuditTrailEntry {
    action: 'create' | 'edit' | 'delete';
    timestamp: string;
    user: string;
    details: string;
}
export interface PersonnelCreateRequest {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    date_of_birth?: string;
    gender?: string;
    civil_status?: string;
    contact_number?: string;
    address?: string;
    department_id?: string;
    designation?: string;
    employment_type: string;
    date_hired: string;
    salary: number;
    gsis_number?: string;
    pagibig_number?: string;
    philhealth_number?: string;
    sss_number?: string;
    tin_number?: string;
    profile_picture?: string;
}
export interface PersonnelUpdateRequest {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    date_of_birth?: string;
    gender?: string;
    civil_status?: string;
    contact_number?: string;
    address?: string;
    department_id?: string;
    designation?: string;
    employment_type?: string;
    date_hired?: string;
    salary?: number;
    gsis_number?: string;
    pagibig_number?: string;
    philhealth_number?: string;
    sss_number?: string;
    tin_number?: string;
    email?: string;
    profile_picture?: string | null;
}
export interface EmployeeDocument {
    id: string;
    personnelId: string;
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    category: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    base64?: string;
    showPreview?: boolean;
}
export declare function getDocumentSrc(doc: EmployeeDocument): string;
export declare function getDocumentBlobUrl(doc: EmployeeDocument): string | null;
export declare class Personnel201Service {
    private http;
    private readonly apiUrl;
    constructor(http: HttpClient);
    getPersonnelFiles(page?: number, limit?: number, search?: string, department?: string): Observable<{
        data: Personnel201File[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getPersonnelById(id: string): Observable<Personnel201File>;
    createPersonnel(personnelData: PersonnelCreateRequest): Observable<Personnel201File>;
    updatePersonnel(id: string, personnelData: PersonnelUpdateRequest): Observable<Personnel201File>;
    deletePersonnel(id: string): Observable<void>;
    getPersonnelStats(): Observable<any>;
    getDepartments(): Observable<{
        id: string;
        department_name: string;
    }[]>;
    getUniquePositions(): Observable<string[]>;
    getDepartmentIdByName(departmentName: string): Promise<string | undefined>;
    private transformPersonnelData;
    private handleError;
    uploadDocuments(personnelId: string, documents: any[]): Observable<any>;
    getEmployeeDocuments(personnelId: string): Observable<EmployeeDocument[]>;
    uploadDocumentAsBase64(personnelId: string, file: File, title: string, description: string): Observable<any>;
}
//# sourceMappingURL=personnel-201.service.d.ts.map