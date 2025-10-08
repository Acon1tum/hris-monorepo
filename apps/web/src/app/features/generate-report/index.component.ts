import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceLeaveReportComponent } from './attendance-leave-report/attendance-leave-report.component';
import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { RecruitmentReportComponent } from './recruitment-report/recruitment-report.component';
import { PerformanceReportComponent } from './performance-report/performance-report.component';
import { LearningDevReportComponent } from './learning-dev-report/learning-dev-report.component';
import { EmployeeDataReportComponent } from './employee-data-report/employee-data-report.component';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [
    CommonModule,
    AttendanceLeaveReportComponent,
    PayrollReportComponent,
    RecruitmentReportComponent,
    PerformanceReportComponent,
    LearningDevReportComponent,
    EmployeeDataReportComponent,
    ManagementDashboardComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class GenerateReportComponent {
  activeTab = 'attendance-leave';

  tabs = [
    { id: 'attendance-leave', label: 'Attendance & Leave', component: AttendanceLeaveReportComponent },
    { id: 'payroll', label: 'Payroll', component: PayrollReportComponent },
    { id: 'recruitment', label: 'Recruitment & Placement', component: RecruitmentReportComponent },
    { id: 'performance', label: 'Performance', component: PerformanceReportComponent },
    { id: 'learning-dev', label: 'Learning & Development', component: LearningDevReportComponent },
    { id: 'employee-data', label: 'Employee Data', component: EmployeeDataReportComponent },
    { id: 'management', label: 'Management Reports', component: ManagementDashboardComponent }
  ];

  switchTab(tabId: string) {
    this.activeTab = tabId;
  }
}
