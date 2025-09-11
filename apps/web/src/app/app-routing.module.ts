import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'employee-self-service', loadComponent: () => import('./modules/employee-self-service/employee-self-service.component').then(m => m.EmployeeSelfServiceComponent) },
  { path: 'personnel-information', loadComponent: () => import('./modules/personnel-information-management/personnel-information-management.component').then(m => m.PersonnelInformationManagementComponent) },
  { path: 'leave-management', loadComponent: () => import('./modules/leave-management/leave-management.component').then(m => m.LeaveManagementComponent) },
  { path: 'timekeeping-attendance', loadComponent: () => import('./modules/timekeeping-attendance/timekeeping-attendance.component').then(m => m.TimekeepingAttendanceComponent) },
  { path: 'payroll-management', loadComponent: () => import('./modules/payroll-management/payroll-management.component').then(m => m.PayrollManagementComponent) },
  { path: 'performance-management', loadComponent: () => import('./modules/performance-management/performance-management.component').then(m => m.PerformanceManagementComponent) },
  { path: 'recruitment', loadComponent: () => import('./modules/recruitment/recruitment.component').then(m => m.RecruitmentComponent) },
  { path: 'job-portal-management', loadComponent: () => import('./modules/job-portal-management/job-portal-management.component').then(m => m.JobPortalManagementComponent) },
  { path: 'online-job-application', loadComponent: () => import('./modules/online-job-application-portal/online-job-application-portal.component').then(m => m.OnlineJobApplicationPortalComponent) },
  { path: 'health-wellness', loadComponent: () => import('./modules/health-wellness/health-wellness.component').then(m => m.HealthWellnessComponent) },
  { path: 'report-generation', loadComponent: () => import('./modules/report-generation/report-generation.component').then(m => m.ReportGenerationComponent) },
  { path: 'system-administration', loadComponent: () => import('./modules/system-administration/system-administration.component').then(m => m.SystemAdministrationComponent) },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
