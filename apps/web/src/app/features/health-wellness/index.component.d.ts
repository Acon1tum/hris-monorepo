import { ChartOptions, ChartDataset, ChartData } from 'chart.js';
import { VoiceComponent } from './voice/voice.component';
import { FaceScanComponent } from './face-scan/face-scan.component';
import { DigitalFootprintComponent } from './digital-footprint/digital-footprint.component';
import { Router } from '@angular/router';
export declare class HealthWellnessComponent {
    private router;
    constructor(router: Router);
    VoiceComponent: typeof VoiceComponent;
    FaceScanComponent: typeof FaceScanComponent;
    DigitalFootprintComponent: typeof DigitalFootprintComponent;
    title: string;
    healthFeatures: {
        name: string;
        description: string;
        icon: string;
    }[];
    barChartLabels: string[];
    allBarChartDatasets: ChartDataset<'bar'>[];
    barChartData: ChartData<'bar'>;
    barChartOptions: ChartOptions;
    filterType: 'all' | 'good' | 'bad';
    toggleFilter(type: 'good' | 'bad'): void;
    get totalScans(): number;
    doughnutChartData: ChartData<'doughnut'>;
    doughnutChartOptions: ChartOptions<'doughnut'>;
    lineChartData: ChartData<'line'>;
    lineChartOptions: ChartOptions<'line'>;
    get totalRequests(): number;
    fadeInFlag: boolean;
    selectedActivity: 'dashboard' | 'voice' | 'face' | 'digital';
    selectActivity(type: 'dashboard' | 'voice' | 'face' | 'digital'): void;
    goToJoinProgram(): void;
    goToWellnessEvents(): void;
}
//# sourceMappingURL=index.component.d.ts.map