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
exports.EmployeeSelfService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const environment_1 = require("../../environments/environment");
let EmployeeSelfService = class EmployeeSelfService {
    http;
    apiUrl = `${environment_1.environment.apiUrl}/employee-self-service`;
    constructor(http) {
        this.http = http;
    }
    // Profile management
    fetchMyProfile() {
        return this.http.get(`${this.apiUrl}/my-profile`);
    }
    updateMyProfile(profileData) {
        return this.http.put(`${this.apiUrl}/my-profile`, profileData);
    }
    // Document management
    getMyDocuments() {
        return this.http.get(`${this.apiUrl}/my-documents`);
    }
    uploadDocument(uploadData) {
        const formData = new FormData();
        formData.append('file', uploadData.file);
        formData.append('title', uploadData.title);
        if (uploadData.description) {
            formData.append('description', uploadData.description);
        }
        if (uploadData.category) {
            formData.append('category', uploadData.category);
        }
        return this.http.post(`${this.apiUrl}/upload-document`, formData);
    }
    deleteDocument(documentId) {
        return this.http.delete(`${this.apiUrl}/documents/${documentId}`);
    }
    downloadDocument(document) {
        const downloadUrl = `${environment_1.environment.apiUrl}${document.fileUrl}`;
        const link = window.document.createElement('a');
        link.href = downloadUrl;
        link.download = document.title;
        link.click();
    }
};
exports.EmployeeSelfService = EmployeeSelfService;
exports.EmployeeSelfService = EmployeeSelfService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], EmployeeSelfService);
//# sourceMappingURL=employee-self.service.js.map