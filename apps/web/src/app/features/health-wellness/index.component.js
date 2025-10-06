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
exports.HealthWellnessComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const ng2_charts_1 = require("ng2-charts");
const voice_component_1 = require("./voice/voice.component");
const face_scan_component_1 = require("./face-scan/face-scan.component");
const digital_footprint_component_1 = require("./digital-footprint/digital-footprint.component");
const animations_1 = require("@angular/animations");
const router_1 = require("@angular/router");
let HealthWellnessComponent = class HealthWellnessComponent {
    router;
    constructor(router) {
        this.router = router;
    }
    VoiceComponent = voice_component_1.VoiceComponent;
    FaceScanComponent = face_scan_component_1.FaceScanComponent;
    DigitalFootprintComponent = digital_footprint_component_1.DigitalFootprintComponent;
    title = 'Health & Wellness';
    healthFeatures = [
        { name: 'Health Programs', description: 'Access company health programs', icon: '🏥' },
        { name: 'Wellness Activities', description: 'Participate in wellness activities', icon: '🏃' },
        { name: 'Medical Records', description: 'View and manage medical records', icon: '📋' },
        { name: 'Insurance Management', description: 'Manage health insurance details', icon: '🩺' },
        { name: 'Health Assessments', description: 'Take health assessments and surveys', icon: '📝' },
        { name: 'Support Resources', description: 'Access support and counseling', icon: '🤝' }
    ];
    // Chart.js bar chart labels
    barChartLabels = ['23/06', '24/06', '25/06', '26/06', '27/06', '28/06', '30/06'];
    // Chart.js bar chart datasets
    allBarChartDatasets = [
        {
            label: 'Good score',
            data: [3, 2, 0, 1, 0, 2, 2],
            backgroundColor: 'rgba(79, 140, 255, 0.85)',
            borderRadius: 12,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.6,
            hoverBackgroundColor: 'rgba(12, 127, 242, 1)',
            borderWidth: 0,
        },
        {
            label: 'Bad score',
            data: [0, 1, 1, 0, 2, 0, 1],
            backgroundColor: 'rgba(255, 85, 82, 0.85)',
            borderRadius: 12,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.6,
            hoverBackgroundColor: 'rgba(185, 74, 72, 1)',
            borderWidth: 0,
        }
    ];
    // Chart.js bar chart data object
    barChartData = {
        labels: this.barChartLabels,
        datasets: [...this.allBarChartDatasets]
    };
    barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: { size: 15, family: 'Inter, Noto Sans, sans-serif' },
                    padding: 24,
                    boxWidth: 18,
                    boxHeight: 18,
                    usePointStyle: true,
                }
            },
            tooltip: {
                backgroundColor: '#222',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#eee',
                borderWidth: 1,
                padding: 12,
                caretSize: 8,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        layout: {
            padding: 16
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: { size: 14, family: 'Inter, Noto Sans, sans-serif' },
                    color: '#60758a',
                }
            },
            y: {
                grid: {
                    color: '#e5e7eb',
                },
                ticks: {
                    font: { size: 14, family: 'Inter, Noto Sans, sans-serif' },
                    color: '#60758a',
                    stepSize: 1,
                },
                beginAtZero: true,
                title: { display: false }
            }
        }
    };
    filterType = 'all';
    toggleFilter(type) {
        if (this.filterType === type) {
            this.filterType = 'all';
            this.barChartData = {
                labels: this.barChartLabels,
                datasets: [...this.allBarChartDatasets]
            };
        }
        else {
            this.filterType = type;
            this.barChartData = {
                labels: this.barChartLabels,
                datasets: [
                    type === 'good' ? this.allBarChartDatasets[0] : this.allBarChartDatasets[1]
                ]
            };
        }
    }
    get totalScans() {
        // Return the number of bars (data points) in the first dataset
        if (this.barChartData.datasets.length > 0 && Array.isArray(this.barChartData.datasets[0].data)) {
            return this.barChartData.datasets[0].data.length;
        }
        return 0;
    }
    // Chart.js doughnut chart data
    doughnutChartData = {
        labels: ['Good score', 'Bad score'],
        datasets: [
            {
                data: [
                    this.allBarChartDatasets[0].data.reduce((a, b) => (a ?? 0) + (b ?? 0), 0),
                    this.allBarChartDatasets[1].data.reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
                ],
                backgroundColor: ['#9cbeff', '#f7b6b6'],
                hoverBackgroundColor: ['#2491ff', '#ff5552'],
                borderWidth: 0,
                borderRadius: 32,
            }
        ]
    };
    doughnutChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#222',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#eee',
                borderWidth: 1,
                padding: 12,
                caretSize: 8,
                cornerRadius: 8,
                displayColors: true,
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true
        },
        cutout: '78%',
    };
    // Chart.js line chart data for Requests
    lineChartData = {
        labels: this.barChartLabels,
        datasets: [
            {
                // label: 'Total Requests',
                data: [3, 0, 0, 0, 0, 0, 2],
                borderColor: '#4F8CFF',
                backgroundColor: 'rgba(79, 140, 255, 0.25)',
                pointBackgroundColor: '#4F8CFF',
                pointBorderColor: '#4F8CFF',
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.2,
                borderWidth: 3,
            }
        ]
    };
    lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#222',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#eee',
                borderWidth: 1,
                padding: 12,
                caretSize: 8,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        layout: {
            padding: 16
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: { size: 14, family: 'Inter, Noto Sans, sans-serif' },
                    color: '#60758a',
                }
            },
            y: {
                grid: {
                    color: '#e5e7eb',
                },
                ticks: {
                    font: { size: 14, family: 'Inter, Noto Sans, sans-serif' },
                    color: '#60758a',
                    stepSize: 1,
                },
                beginAtZero: true,
                title: { display: false }
            }
        }
    };
    get totalRequests() {
        const good = this.allBarChartDatasets[0].data.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
        const bad = this.allBarChartDatasets[1].data.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
        return (good ?? 0) + (bad ?? 0);
    }
    fadeInFlag = true;
    selectedActivity = 'dashboard';
    selectActivity(type) {
        if (this.selectedActivity !== type) {
            this.fadeInFlag = false;
            setTimeout(() => {
                this.selectedActivity = type;
                this.fadeInFlag = true;
            }, 10);
        }
    }
    goToJoinProgram() {
        this.router.navigate(['/health-wellness/join-program']);
    }
    goToWellnessEvents() {
        this.router.navigate(['/health-wellness/wellness-events']);
    }
};
exports.HealthWellnessComponent = HealthWellnessComponent;
exports.HealthWellnessComponent = HealthWellnessComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-health-wellness',
        standalone: true,
        imports: [common_1.CommonModule, ng2_charts_1.BaseChartDirective, voice_component_1.VoiceComponent, face_scan_component_1.FaceScanComponent, digital_footprint_component_1.DigitalFootprintComponent],
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
        animations: [
            (0, animations_1.trigger)('routeAnimation', [
                (0, animations_1.transition)('dashboard => voice, dashboard => face, dashboard => digital', [
                    (0, animations_1.style)({ position: 'relative' }),
                    (0, animations_1.query)(':enter, :leave', [
                        (0, animations_1.style)({
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%'
                        })
                    ], { optional: true }),
                    (0, animations_1.group)([
                        (0, animations_1.query)(':leave', [
                            (0, animations_1.animate)('400ms cubic-bezier(0.4,0,0.2,1)', (0, animations_1.style)({ transform: 'translateX(-100%)', opacity: 0 }))
                        ], { optional: true }),
                        (0, animations_1.query)(':enter', [
                            (0, animations_1.style)({ transform: 'translateX(100%)', opacity: 0 }),
                            (0, animations_1.animate)('400ms cubic-bezier(0.4,0,0.2,1)', (0, animations_1.style)({ transform: 'translateX(0)', opacity: 1 }))
                        ], { optional: true })
                    ])
                ]),
                (0, animations_1.transition)('voice => dashboard, face => dashboard, digital => dashboard', [
                    (0, animations_1.style)({ position: 'relative' }),
                    (0, animations_1.query)(':enter, :leave', [
                        (0, animations_1.style)({
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%'
                        })
                    ], { optional: true }),
                    (0, animations_1.group)([
                        (0, animations_1.query)(':leave', [
                            (0, animations_1.animate)('400ms cubic-bezier(0.4,0,0.2,1)', (0, animations_1.style)({ transform: 'translateX(100%)', opacity: 0 }))
                        ], { optional: true }),
                        (0, animations_1.query)(':enter', [
                            (0, animations_1.style)({ transform: 'translateX(-100%)', opacity: 0 }),
                            (0, animations_1.animate)('400ms cubic-bezier(0.4,0,0.2,1)', (0, animations_1.style)({ transform: 'translateX(0)', opacity: 1 }))
                        ], { optional: true })
                    ])
                ])
            ]),
            (0, animations_1.trigger)('pageOpen', [
                (0, animations_1.transition)(':enter', [
                    (0, animations_1.style)({ opacity: 0, transform: 'translateY(30px)' }),
                    (0, animations_1.animate)('600ms cubic-bezier(0.23, 1, 0.32, 1)', (0, animations_1.style)({ opacity: 1, transform: 'none' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HealthWellnessComponent);
//# sourceMappingURL=index.component.js.map