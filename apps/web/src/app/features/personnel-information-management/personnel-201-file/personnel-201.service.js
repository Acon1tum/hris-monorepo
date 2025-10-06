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
exports.Personnel201Service = void 0;
exports.getDocumentSrc = getDocumentSrc;
exports.getDocumentBlobUrl = getDocumentBlobUrl;
// Fade-in animation for personnel-201-file is handled in the component's HTML and SCSS via the .fade-in-smooth class.
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const http_1 = require("@angular/common/http");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../../../environments/environment");
// Helper to get the correct document source for viewing
function getDocumentSrc(doc) {
    // Check if fileUrl contains base64 data (starts with data:)
    if (doc.fileUrl && doc.fileUrl.startsWith('data:')) {
        return doc.fileUrl;
    }
    // Fallback to base64 field if it exists
    if (doc.base64) {
        return doc.base64;
    }
    // Fallback to fileUrl with backend prefix (adjust as needed)
    return 'http://localhost:3000' + doc.fileUrl;
}
// Optionally, for large files or better performance, you can convert base64 to Blob URL:
function getDocumentBlobUrl(doc) {
    // Check if fileUrl contains base64 data (starts with data:)
    const base64Data = doc.fileUrl && doc.fileUrl.startsWith('data:') ? doc.fileUrl : doc.base64;
    if (base64Data) {
        const arr = base64Data.split(',');
        if (arr.length === 2) {
            const mimeMatch = arr[0].match(/:(.*?);/);
            if (!mimeMatch)
                return null;
            const mime = mimeMatch[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const blob = new Blob([u8arr], { type: mime });
            return URL.createObjectURL(blob);
        }
    }
    return null;
}
let Personnel201Service = class Personnel201Service {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/personnel`;
    constructor(http) {
        this.http = http;
    }
    getPersonnelFiles(page = 1, limit = 10, search, department) {
        let params = new http_1.HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('_ts', Date.now().toString()); // cache-busting param
        if (search) {
            params = params.set('search', search);
        }
        if (department) {
            params = params.set('department', department);
        }
        return this.http.get(`${this.apiUrl}`, { params }).pipe((0, operators_1.map)(response => ({
            data: response.data.map((personnel) => this.transformPersonnelData(personnel)),
            pagination: response.pagination
        })), (0, operators_1.catchError)(this.handleError));
    }
    getPersonnelById(id) {
        return this.http.get(`${this.apiUrl}/${id}`).pipe((0, operators_1.map)(response => this.transformPersonnelData(response.data)), (0, operators_1.catchError)(this.handleError));
    }
    createPersonnel(personnelData) {
        return this.http.post(`${this.apiUrl}`, personnelData).pipe((0, operators_1.map)(response => this.transformPersonnelData(response.data)), (0, operators_1.catchError)(this.handleError));
    }
    updatePersonnel(id, personnelData) {
        return this.http.put(`${this.apiUrl}/${id}`, personnelData).pipe((0, operators_1.map)(response => this.transformPersonnelData(response.data)), (0, operators_1.catchError)(this.handleError));
    }
    deletePersonnel(id) {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe((0, operators_1.map)(() => void 0), (0, operators_1.catchError)(this.handleError));
    }
    getPersonnelStats() {
        return this.http.get(`${this.apiUrl}/stats`).pipe((0, operators_1.map)(response => response.data), (0, operators_1.catchError)(this.handleError));
    }
    getDepartments() {
        return this.http.get(`${environment_1.environment.apiUrl}/system/departments`).pipe((0, operators_1.map)(response => response.data || []), (0, operators_1.catchError)(this.handleError));
    }
    getUniquePositions() {
        return this.getPersonnelFiles().pipe((0, operators_1.map)(response => Array.from(new Set(response.data.map((f) => f.position).filter(Boolean)))));
    }
    // Helper method to map department name to ID
    async getDepartmentIdByName(departmentName) {
        try {
            console.log('🔍 getDepartmentIdByName called with:', departmentName);
            const departments = await (0, rxjs_1.firstValueFrom)(this.getDepartments());
            console.log('📋 All available departments:', departments);
            if (!departments || departments.length === 0) {
                console.warn('⚠️ No departments available!');
                return undefined;
            }
            const department = departments.find(dept => {
                const match = dept.department_name.toLowerCase().trim() === departmentName.toLowerCase().trim();
                console.log(`🔎 Comparing "${dept.department_name}" with "${departmentName}" = ${match}`);
                return match;
            });
            console.log('🏢 Department mapping result:', {
                searchFor: departmentName,
                found: department,
                mappedId: department?.id
            });
            if (!department) {
                console.error('❌ Department not found! Available departments:', departments.map(d => d.department_name).join(', '));
            }
            return department?.id;
        }
        catch (error) {
            console.error('❌ Error getting department ID:', error);
            return undefined;
        }
    }
    // Transform backend data to frontend format
    transformPersonnelData(data) {
        const fullName = [data.first_name, data.middle_name, data.last_name]
            .filter(Boolean)
            .join(' ');
        let profilePictureUrl = '';
        if (data.user && data.user.profile_picture) {
            profilePictureUrl = data.user.profile_picture;
        }
        return {
            id: data.id,
            employeeName: fullName,
            firstName: data.first_name,
            middleName: data.middle_name,
            lastName: data.last_name,
            email: data.user?.email,
            contact_number: data.contact_number,
            address: data.address,
            department: data.department?.department_name || 'N/A',
            departmentName: data.department?.department_name,
            position: data.designation || 'N/A',
            designation: data.designation,
            dateCreated: data.created_at ? new Date(data.created_at).toISOString().slice(0, 10) : '',
            lastModified: data.updated_at ? new Date(data.updated_at).toISOString().slice(0, 10) : '',
            createdBy: 'System', // You can enhance this based on your audit requirements
            modifiedBy: 'System',
            auditTrail: [], // You can populate this from audit logs if available
            date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().slice(0, 10) : '',
            gender: data.gender,
            civil_status: data.civil_status,
            employment_type: data.employment_type,
            date_hired: data.date_hired ? new Date(data.date_hired).toISOString().slice(0, 10) : '',
            salary: data.salary,
            gsis_number: data.gsis_number,
            pagibig_number: data.pagibig_number,
            philhealth_number: data.philhealth_number,
            sss_number: data.sss_number,
            tin_number: data.tin_number,
            user: data.user,
            profilePictureUrl: profilePictureUrl,
            profilePictureFile: null,
            jobLevel: data.jobLevel || '',
            jobGrade: data.jobGrade || '',
        };
    }
    handleError = (error) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            // Server-side error
            errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error('Personnel Service Error:', errorMessage);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
    uploadDocuments(personnelId, documents) {
        return this.http.post(`${this.apiUrl}/${personnelId}/documents`, { documents });
    }
    getEmployeeDocuments(personnelId) {
        return this.http.get(`${this.apiUrl}/${personnelId}/documents`).pipe((0, operators_1.map)(res => res.data));
    }
    uploadDocumentAsBase64(personnelId, file, title, description) {
        return new rxjs_1.Observable(observer => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                this.http.post(`${this.apiUrl}/${personnelId}/documents`, {
                    documents: [{
                            title,
                            description,
                            fileType: file.type,
                            fileSize: file.size,
                            base64,
                            category: 'general',
                            isPrivate: false
                        }]
                }).subscribe({
                    next: (res) => observer.next(res),
                    error: (err) => observer.error(err),
                    complete: () => observer.complete()
                });
            };
            reader.onerror = (err) => observer.error(err);
            reader.readAsDataURL(file); // This will produce a data URL with the correct prefix
        });
    }
};
exports.Personnel201Service = Personnel201Service;
exports.Personnel201Service = Personnel201Service = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], Personnel201Service);
//# sourceMappingURL=personnel-201.service.js.map