import { OnInit } from '@angular/core';
interface DigitalFootprintSummary {
    totalLogins: number;
    wellnessActivities: number;
    lastActive: string;
}
interface DigitalActivity {
    date: string;
    activity: string;
    details: string;
}
export declare class DigitalFootprintComponent implements OnInit {
    loading: boolean;
    summary: DigitalFootprintSummary | null;
    activities: DigitalActivity[];
    ngOnInit(): void;
    fetchDigitalFootprint(): void;
}
export {};
//# sourceMappingURL=digital-footprint.component.d.ts.map