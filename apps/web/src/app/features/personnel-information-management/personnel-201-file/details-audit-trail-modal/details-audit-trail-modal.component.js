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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsAuditTrailModalComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const personnel_201_service_1 = require("../personnel-201.service");
const http_1 = require("@angular/common/http");
const core_2 = require("@angular/core");
const jszip_1 = __importDefault(require("jszip"));
const file_saver_1 = require("file-saver");
let DetailsAuditTrailModalComponent = class DetailsAuditTrailModalComponent {
    http;
    personnelService;
    cdr;
    file = null;
    personnelId = '';
    close = new core_1.EventEmitter();
    closing = false;
    employeeDocuments = [];
    // Image modal state
    showImageModal = false;
    selectedImageDoc = null;
    zoomLevel = 1;
    // Pan state for free look
    panX = 0;
    panY = 0;
    isDragging = false;
    dragStartX = 0;
    dragStartY = 0;
    constructor(http, personnelService, cdr) {
        this.http = http;
        this.personnelService = personnelService;
        this.cdr = cdr;
    }
    ngOnInit() {
        if (this.file && this.file.id) {
            this.personnelService.getEmployeeDocuments(this.file.id).subscribe((docs) => {
                this.employeeDocuments = docs.map(doc => ({ ...doc, showPreview: false }));
                this.cdr.detectChanges();
            });
        }
    }
    onClose() {
        this.closing = true;
        setTimeout(() => {
            this.close.emit();
            this.closing = false;
        }, 400); // match animation duration
    }
    getDocumentSrc = personnel_201_service_1.getDocumentSrc;
    openDocument(doc) {
        // Try to use Blob URL for best compatibility
        const blobUrl = (0, personnel_201_service_1.getDocumentBlobUrl)(doc);
        if (blobUrl) {
            window.open(blobUrl, '_blank');
            return;
        }
        // Fallback to data URL or fileUrl
        window.open(this.getDocumentSrc(doc), '_blank');
    }
    // Image modal logic
    openImageModal(doc) {
        this.selectedImageDoc = doc;
        this.showImageModal = true;
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
    }
    closeImageModal() {
        this.showImageModal = false;
        this.selectedImageDoc = null;
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
    }
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.2, 5);
    }
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.2);
    }
    resetZoom() {
        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
    }
    // Free look (pan/drag) handlers
    onImageMouseDown(event) {
        if (this.zoomLevel === 1)
            return; // Only allow pan if zoomed in
        this.isDragging = true;
        this.dragStartX = event.clientX - this.panX;
        this.dragStartY = event.clientY - this.panY;
        event.preventDefault();
    }
    onImageMouseMove(event) {
        if (!this.isDragging)
            return;
        this.panX = event.clientX - this.dragStartX;
        this.panY = event.clientY - this.dragStartY;
    }
    onImageMouseUp() {
        this.isDragging = false;
    }
    onImageMouseLeave() {
        this.isDragging = false;
    }
    // Touch events for mobile
    onImageTouchStart(event) {
        if (this.zoomLevel === 1)
            return;
        this.isDragging = true;
        const touch = event.touches[0];
        this.dragStartX = touch.clientX - this.panX;
        this.dragStartY = touch.clientY - this.panY;
    }
    onImageTouchMove(event) {
        if (!this.isDragging)
            return;
        const touch = event.touches[0];
        this.panX = touch.clientX - this.dragStartX;
        this.panY = touch.clientY - this.dragStartY;
    }
    onImageTouchEnd() {
        this.isDragging = false;
    }
    async downloadAllAttachments() {
        if (!this.employeeDocuments.length)
            return;
        const zip = new jszip_1.default();
        const fetchBlob = async (url) => {
            const response = await fetch(url);
            return await response.blob();
        };
        const addFileToZip = async (doc) => {
            let filename = doc.title || 'document';
            // Add extension if missing
            if (doc.fileType && !filename.endsWith('.' + doc.fileType.split('/')[1])) {
                filename += '.' + doc.fileType.split('/')[1];
            }
            if (doc.fileUrl && doc.fileUrl.startsWith('data:')) {
                // base64 data URL
                const arr = doc.fileUrl.split(',');
                if (arr.length === 2) {
                    const mimeMatch = arr[0].match(/:(.*?);/);
                    const mime = mimeMatch ? mimeMatch[1] : '';
                    const bstr = atob(arr[1]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    zip.file(filename, u8arr, { binary: true });
                }
            }
            else if (doc.fileUrl) {
                // Try to fetch as blob
                try {
                    const blob = await fetchBlob(doc.fileUrl.startsWith('http') ? doc.fileUrl : 'http://localhost:3000' + doc.fileUrl);
                    zip.file(filename, blob);
                }
                catch (e) {
                    // skip file if fetch fails
                }
            }
        };
        await Promise.all(this.employeeDocuments.map(doc => addFileToZip(doc)));
        // Generate zip filename based on employee name
        let zipName = 'attachments.zip';
        if (this.file) {
            const first = this.file.firstName ? this.file.firstName.trim() : '';
            const last = this.file.lastName ? this.file.lastName.trim() : '';
            zipName = `${first} ${last} - Document(s).zip`;
        }
        const content = await zip.generateAsync({ type: 'blob' });
        (0, file_saver_1.saveAs)(content, zipName);
    }
    downloadSingleAttachment(doc) {
        let filename = doc.title || 'document';
        if (doc.fileType && !filename.endsWith('.' + doc.fileType.split('/')[1])) {
            filename += '.' + doc.fileType.split('/')[1];
        }
        if (doc.fileUrl && doc.fileUrl.startsWith('data:')) {
            // base64 data URL
            const arr = doc.fileUrl.split(',');
            if (arr.length === 2) {
                const mimeMatch = arr[0].match(/:(.*?);/);
                const mime = mimeMatch ? mimeMatch[1] : '';
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const blob = new Blob([u8arr], { type: mime });
                (0, file_saver_1.saveAs)(blob, filename);
            }
        }
        else if (doc.fileUrl) {
            // Download from URL
            const url = doc.fileUrl.startsWith('http') ? doc.fileUrl : 'http://localhost:3000' + doc.fileUrl;
            fetch(url)
                .then(res => res.blob())
                .then(blob => (0, file_saver_1.saveAs)(blob, filename));
        }
    }
    viewSingleAttachment(doc) {
        if (doc.fileType && doc.fileType.startsWith('image/')) {
            this.openImageModal(doc);
        }
        else if (doc.fileType === 'application/pdf') {
            this.openDocument(doc);
        }
        else {
            // For other types, try to download or open in new tab
            const url = doc.fileUrl.startsWith('http') ? doc.fileUrl : 'http://localhost:3000' + doc.fileUrl;
            window.open(url, '_blank');
        }
    }
    formatFileSize(bytes) {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
        else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        }
        else {
            return bytes + ' B';
        }
    }
};
exports.DetailsAuditTrailModalComponent = DetailsAuditTrailModalComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], DetailsAuditTrailModalComponent.prototype, "file", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], DetailsAuditTrailModalComponent.prototype, "personnelId", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], DetailsAuditTrailModalComponent.prototype, "close", void 0);
exports.DetailsAuditTrailModalComponent = DetailsAuditTrailModalComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-details-audit-trail-modal',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './details-audit-trail-modal.component.html',
        styleUrls: ['./details-audit-trail-modal.component.scss']
    }),
    __metadata("design:paramtypes", [http_1.HttpClient,
        personnel_201_service_1.Personnel201Service,
        core_2.ChangeDetectorRef])
], DetailsAuditTrailModalComponent);
//# sourceMappingURL=details-audit-trail-modal.component.js.map