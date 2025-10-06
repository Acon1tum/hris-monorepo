import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyProfileResponse } from '../interfaces/my-profile.interface';
export declare class EmployeeSelfService {
    private http;
    private apiUrl;
    constructor(http: HttpClient);
    fetchMyProfile(): Observable<MyProfileResponse>;
    updateMyProfile(payload: any): Observable<MyProfileResponse>;
}
//# sourceMappingURL=employee-self-service.service.d.ts.map