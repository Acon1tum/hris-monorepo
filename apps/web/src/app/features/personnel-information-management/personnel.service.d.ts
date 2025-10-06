import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    hireDate: string;
    status: string;
    profileImage?: string;
}
export declare class PersonnelService {
    private http;
    private baseUrl;
    constructor(http: HttpClient);
    getDashboardEmployees(page?: number, limit?: number, search?: string): Observable<{
        data: Employee[];
        pagination: any;
    }>;
    getPersonnel(page?: number, limit?: number, search?: string): Observable<{
        data: Employee[];
        pagination: any;
    }>;
    private transformPersonnelData;
    private handleError;
}
//# sourceMappingURL=personnel.service.d.ts.map