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
exports.PersonnelService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const environment_1 = require("../../../environments/environment");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let PersonnelService = class PersonnelService {
    http;
    baseUrl = `${environment_1.environment.apiUrl}/personnel`;
    constructor(http) {
        this.http = http;
    }
    getDashboardEmployees(page = 1, limit = 10, search = '') {
        let params = new http_1.HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        if (search)
            params = params.set('search', search);
        return this.http.get(`${this.baseUrl}/dashboard-employees`, { params });
    }
    getPersonnel(page = 1, limit = 10, search = '') {
        let params = new http_1.HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        if (search)
            params = params.set('search', search);
        return this.http.get(`${this.baseUrl}`, { params }).pipe((0, operators_1.map)(response => ({
            data: response.data.map((personnel) => this.transformPersonnelData(personnel)),
            pagination: response.pagination
        })), (0, operators_1.catchError)(this.handleError));
    }
    transformPersonnelData(data) {
        return {
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.user?.email || '',
            department: data.department?.department_name || '',
            position: data.designation || '',
            hireDate: data.date_hired ? new Date(data.date_hired).toISOString().slice(0, 10) : '',
            status: data.user?.status || '',
            profileImage: data.user?.profile_picture || data.employeeSelfServiceProfile?.profilePicture || ''
        };
    }
    handleError = (error) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        }
        else {
            errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error('Personnel Service Error:', errorMessage);
        return (0, rxjs_1.throwError)(() => new Error(errorMessage));
    };
};
exports.PersonnelService = PersonnelService;
exports.PersonnelService = PersonnelService = __decorate([
    (0, core_1.Injectable)({ providedIn: 'root' }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], PersonnelService);
//# sourceMappingURL=personnel.service.js.map