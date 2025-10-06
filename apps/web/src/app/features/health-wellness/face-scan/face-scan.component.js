"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceScanComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const faceapi = __importStar(require("face-api.js"));
let FaceScanComponent = class FaceScanComponent {
    videoElement;
    scanResult = null;
    isScanning = false;
    cameraOpen = false;
    faceScanReport = null;
    modelsLoaded = false;
    error = null;
    async ngOnInit() {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
            await faceapi.nets.faceExpressionNet.loadFromUri('/assets/models');
            await faceapi.nets.ageGenderNet.loadFromUri('/assets/models');
            this.modelsLoaded = true;
        }
        catch (e) {
            this.error = 'Failed to load face detection models.';
        }
    }
    async openCamera() {
        this.scanResult = null;
        this.faceScanReport = null;
        this.error = null;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (this.videoElement && this.videoElement.nativeElement) {
                this.videoElement.nativeElement.srcObject = stream;
            }
            this.cameraOpen = true;
        }
        catch (err) {
            this.scanResult = 'Camera access denied or not available.';
            this.cameraOpen = false;
        }
    }
    async startFaceScan() {
        this.scanResult = null;
        this.isScanning = true;
        this.faceScanReport = null;
        this.error = null;
        setTimeout(async () => {
            this.isScanning = false;
            const video = this.videoElement.nativeElement;
            if (!video || video.readyState < 2) {
                this.error = 'Camera not ready. Please try again.';
                return;
            }
            try {
                const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceExpressions()
                    .withAgeAndGender();
                if (detection) {
                    this.scanResult = 'Face detected!';
                    this.faceScanReport = {
                        expression: this.getDominantExpression(detection.expressions),
                        ageGroup: detection.age < 25 ? 'Young' : 'Adult',
                        mole: false, // Advanced: needs custom model
                        pimples: false, // Advanced: needs custom model
                        clearSkin: true, // Advanced: needs custom model
                        faceShape: 'Oval', // Advanced: can be estimated from landmarks
                        paleLips: false // Advanced: can be estimated from landmarks/colors
                    };
                }
                else {
                    this.scanResult = 'No face detected!';
                    this.faceScanReport = null;
                }
            }
            catch (e) {
                this.error = 'Face scan failed. Please try again.';
            }
        }, 2000);
    }
    getDominantExpression(expressions) {
        return Object.entries(expressions)
            .sort((a, b) => b[1] - a[1])[0][0];
    }
};
exports.FaceScanComponent = FaceScanComponent;
__decorate([
    (0, core_1.ViewChild)('videoElement', { static: false }),
    __metadata("design:type", core_1.ElementRef)
], FaceScanComponent.prototype, "videoElement", void 0);
exports.FaceScanComponent = FaceScanComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-face-scan',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './face-scan.component.html',
        styleUrls: ['./face-scan.component.scss']
    })
], FaceScanComponent);
//# sourceMappingURL=face-scan.component.js.map