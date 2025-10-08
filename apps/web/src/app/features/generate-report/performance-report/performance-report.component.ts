import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-report.component.html',
  styleUrl: './performance-report.component.scss'
})
export class PerformanceReportComponent {
  reports = [
    { id: 1, name: 'Individual Performance Commitment and Review Form', description: 'Form for individual employee performance planning and review', format: 'PDF', frequency: 'Annually' },
    { id: 2, name: 'Division Performance Commitment and Review Form', description: 'Form for division-level performance planning and review', format: 'PDF', frequency: 'Annually' },
    { id: 3, name: 'Office Performance Commitment and Review Form', description: 'Form for office-level performance planning and review', format: 'PDF', frequency: 'Annually' },
    { id: 4, name: 'Individual Development Plan Form', description: 'Form for planning individual employee development activities', format: 'PDF', frequency: 'Annually' },
    { id: 5, name: 'Coaching and Mentoring Form', description: 'Form to document coaching and mentoring sessions', format: 'PDF', frequency: 'As needed' },
    { id: 6, name: 'Summary of Performance Ratings (per Office and/or per Year)', description: 'Summary of performance ratings at office level and/or by year', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 7, name: 'Performance Ratings of Employees by Class', description: 'Report of performance ratings grouped by employee class', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 8, name: 'Performance Ratings of Employees by Employment Status', description: 'Report of performance ratings grouped by employment status', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 9, name: 'Performance Ratings of Employees by Position Title', description: 'Report of performance ratings grouped by position title', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 10, name: 'Performance Ratings of Employees by Salary Grade', description: 'Report of performance ratings grouped by salary grade', format: 'PDF/Excel', frequency: 'Annually' },
    { id: 11, name: 'Performance Ratings of Employees by Unit', description: 'Report of performance ratings grouped by organizational unit', format: 'PDF/Excel', frequency: 'Annually' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating performance report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
