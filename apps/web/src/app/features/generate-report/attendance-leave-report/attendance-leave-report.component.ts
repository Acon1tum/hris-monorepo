import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-leave-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-leave-report.component.html',
  styleUrl: './attendance-leave-report.component.scss'
})
export class AttendanceLeaveReportComponent {
  reports = [
    { id: 1, name: 'Daily Time Record (CSC Form 48)', description: 'Record of daily time in and out of employees', format: 'PDF', frequency: 'Daily per employee' },
    { id: 2, name: 'Employee Attendance Report', description: 'Summary of employee attendance for a specific period', format: 'PDF/Excel', frequency: 'Daily/Weekly/Monthly' },
    { id: 3, name: 'Flag Raising Attendance Report', description: 'Record of attendance for flag raising ceremonies', format: 'PDF/Excel', frequency: 'As needed/Weekly' },
    { id: 4, name: 'Employee Perpetual Leave Card', description: 'Permanent record of leave credits and usage for each employee', format: 'PDF', frequency: 'As needed/Updated with each leave' },
    { id: 5, name: 'Application for Leave of Absence (CS Form No. 6)', description: 'Official form for requesting leave of absence', format: 'PDF', frequency: 'As needed per employee' },
    { id: 6, name: 'Maternity Leave Allocation Notice (CS Form No. 6a)', description: 'Notice of allocation of maternity leave credits', format: 'PDF', frequency: 'As needed per employee' },
    { id: 7, name: 'Certificate of COC/CTO', description: 'Certification of Completion of Contract/Completion of Term of Office', format: 'PDF', frequency: 'As needed per employee' },
    { id: 8, name: 'Compensatory Overtime Credit Monitoring', description: 'Track and monitor compensatory overtime credits earned by employees', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 9, name: 'Maagap Awardees List', description: 'List of employees who have received the Maagap attendance award', format: 'PDF/Excel', frequency: 'Monthly/Quarterly/Annually' },
    { id: 10, name: 'Certification on LAWOP', description: 'Certification on Leave Without Pay', format: 'PDF', frequency: 'As needed per employee' },
    { id: 11, name: 'Earned Leave Balance Summary', description: 'Summary of earned leave balances for all employees', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 12, name: 'Certificate of Leave Credits for Monetization', description: 'Certification of available leave credits that are eligible for monetization', format: 'PDF', frequency: 'Monthly' },
    { id: 13, name: 'Certificate of Leave Without Pay', description: 'Official certification for Leave Without Pay', format: 'PDF', frequency: 'As needed per employee' },
    { id: 14, name: 'DTR Adjustments Summary Report', description: 'Summary of all Daily Time Record adjustments made during a period', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 15, name: 'Force Leave Report', description: 'Report of employees who have been assigned force leave', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 16, name: 'List of Employees with incomplete DTR entries', description: 'Identify employees with missing Daily Time Record entries', format: 'PDF/Excel', frequency: 'Daily/Weekly' },
    { id: 17, name: 'Overtime Accomplishment Report', description: 'Report of overtime hours and work accomplished', format: 'PDF/Excel', frequency: 'Weekly/Monthly' },
    { id: 18, name: 'Overtime Summary Report', description: 'Summary of overtime hours by department or organization', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 19, name: 'Overtime Pay Monitoring Report', description: 'Monitor and track overtime pay expenses', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 20, name: 'Perfect Attendance', description: 'List of employees with perfect attendance during a specified period', format: 'PDF/Excel', frequency: 'Monthly/Quarterly/Annually' },
    { id: 21, name: 'Report on the Availment of VL, SL, SPL and others', description: 'Report on the utilization of various leave types (Vacation Leave, Sick Leave, Special Privilege Leave, etc.)', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 22, name: 'Tardiness and Undertime', description: 'Record of employee tardiness and undertime incidents', format: 'PDF/Excel', frequency: 'Weekly/Monthly' },
    { id: 23, name: 'Tardiness and Undertime Monitoring Report', description: 'Monitoring report for tracking patterns of tardiness and undertime', format: 'PDF/Excel', frequency: 'Weekly/Monthly' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating attendance/leave report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
