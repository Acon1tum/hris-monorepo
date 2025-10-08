import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './management-dashboard.component.html',
  styleUrl: './management-dashboard.component.scss'
})
export class ManagementDashboardComponent {
  reports = [
    { id: 1, name: 'Headcount by Function', description: 'Visual representation of employee count by organizational function', format: 'Dashboard', frequency: 'Real-time / Monthly' },
    { id: 2, name: 'Overall Performance Rating', description: 'Summary of overall employee performance ratings across the organization', format: 'Dashboard', frequency: 'Quarterly / Annually' },
    { id: 3, name: 'Applicant Status', description: 'Real-time status of all job applicants in the system', format: 'Dashboard', frequency: 'Real-time' },
    { id: 4, name: 'Total Salary YTD (vs previous month)', description: 'Year-to-date total salary expenditure compared to previous month', format: 'Dashboard', frequency: 'Monthly' },
    { id: 5, name: 'Average Salary', description: 'Average salary across the organization and by various parameters', format: 'Dashboard', frequency: 'Monthly' },
    { id: 6, name: 'Average Age', description: 'Average age of employees in the organization', format: 'Dashboard', frequency: 'Quarterly' },
    { id: 7, name: 'Absenteeism Rate', description: 'Rate of absenteeism across the organization', format: 'Dashboard', frequency: 'Monthly' },
    { id: 8, name: 'Contracts Expiring', description: 'Dashboard showing all contracts expiring within specific periods', format: 'Dashboard', frequency: 'Real-time / Weekly' },
    { id: 9, name: 'Employee costs/year (vs operating cost)', description: 'Employee costs compared to total operating costs', format: 'Dashboard', frequency: 'Monthly / Annually' },
    { id: 10, name: 'Compensation Distribution by Department', description: 'Distribution of compensation costs by organizational department', format: 'Dashboard', frequency: 'Monthly / Quarterly' },
    { id: 11, name: 'Absence by Reasons', description: 'Breakdown of absences by reason (sick leave, vacation, etc.)', format: 'Dashboard', frequency: 'Monthly' },
    { id: 12, name: 'Employee Distribution (by age, gender, etc.)', description: 'Demographic distribution of employees', format: 'Dashboard', frequency: 'Quarterly / Annually' },
    { id: 13, name: 'Payroll Expense per month', description: 'Monthly payroll expenses', format: 'Dashboard', frequency: 'Monthly' },
    { id: 14, name: 'Monthly Payroll Variance', description: 'Variance of actual payroll from budgeted payroll', format: 'Dashboard', frequency: 'Monthly' },
    { id: 15, name: 'Breakdown of payroll (salary, OT, bonus etc.)', description: 'Detailed breakdown of payroll components', format: 'Dashboard', frequency: 'Monthly' },
    { id: 16, name: 'Personal Services Itemization - Plantilla of Personnel (PSIPOP)', description: 'Visual representation of personnel plantilla', format: 'Dashboard', frequency: 'As needed' },
    { id: 17, name: 'GOCC Information for Operations and Compensation', description: 'Dashboard for GOCC information', format: 'Dashboard', frequency: 'As needed' },
    { id: 18, name: 'Executive Dashboard', description: 'Executive-level dashboard with key metrics', format: 'Dashboard', frequency: 'Real-time' },
    { id: 19, name: 'HR Management Dashboard', description: 'HR management-level dashboard with key metrics', format: 'Dashboard', frequency: 'Daily' },
    { id: 20, name: 'Department Management Dashboard', description: 'Department-specific dashboard with key metrics', format: 'Dashboard', frequency: 'Daily' },
    { id: 21, name: 'Recruitment Dashboard', description: 'Dashboard for tracking recruitment metrics', format: 'Dashboard', frequency: 'Daily' },
    { id: 22, name: 'Payroll Dashboard', description: 'Dashboard for tracking payroll metrics', format: 'Dashboard', frequency: 'Daily' },
    { id: 23, name: 'Training and Development Dashboard', description: 'Dashboard for tracking training and development metrics', format: 'Dashboard', frequency: 'Daily' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating management dashboard report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
