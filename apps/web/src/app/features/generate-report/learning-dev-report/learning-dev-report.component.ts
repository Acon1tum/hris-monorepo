import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-dev-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-dev-report.component.html',
  styleUrl: './learning-dev-report.component.scss'
})
export class LearningDevReportComponent {
  reports = [
    { id: 1, name: 'Training Certificate for in-house training', description: 'Certificate issued to employees who completed in-house training', format: 'PDF', frequency: 'As needed per training completion' },
    { id: 2, name: 'Training Report (Monthly/Quarterly / Annual)', description: 'Comprehensive report of all training activities conducted', format: 'PDF/Excel', frequency: 'Monthly/Quarterly/Annually' },
    { id: 3, name: 'Learning and Development Plan', description: 'Report of planned learning and development activities', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 4, name: 'Entitlement of Post Graduate Course', description: 'Report of employees entitled to post-graduate course benefits', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 5, name: 'Trainings Attended by Employees by Class', description: 'Report of trainings attended grouped by employee class', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 6, name: 'Trainings Attended by Employees by Employment Status', description: 'Report of trainings attended grouped by employment status', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 7, name: 'Trainings Attended by Employees by Position Title', description: 'Report of trainings attended grouped by position title', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 8, name: 'Trainings Attended by Employees by Profession', description: 'Report of trainings attended grouped by profession', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 9, name: 'Trainings Attended by Employees by Salary Grade', description: 'Report of trainings attended grouped by salary grade', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 10, name: 'Trainings Attended by Employees by Unit', description: 'Report of trainings attended grouped by organizational unit', format: 'PDF/Excel', frequency: 'Quarterly/Annually' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating learning and development report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
