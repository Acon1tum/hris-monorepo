import { ElementRef, OnInit } from '@angular/core';
interface FaceScanReport {
    expression: string;
    ageGroup: 'Young' | 'Adult';
    mole: boolean;
    pimples: boolean;
    clearSkin: boolean;
    faceShape: string;
    paleLips: boolean;
}
export declare class FaceScanComponent implements OnInit {
    videoElement: ElementRef<HTMLVideoElement>;
    scanResult: string | null;
    isScanning: boolean;
    cameraOpen: boolean;
    faceScanReport: FaceScanReport | null;
    modelsLoaded: boolean;
    error: string | null;
    ngOnInit(): Promise<void>;
    openCamera(): Promise<void>;
    startFaceScan(): Promise<void>;
    getDominantExpression(expressions: any): string;
}
export {};
//# sourceMappingURL=face-scan.component.d.ts.map