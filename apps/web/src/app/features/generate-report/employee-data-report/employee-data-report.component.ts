import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-data-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-data-report.component.html',
  styleUrl: './employee-data-report.component.scss'
})
export class EmployeeDataReportComponent {
  reports = [
    { id: 1, name: 'Certificate of Employment', description: 'Official certification of employment status', format: 'PDF', frequency: 'As needed per employee' },
    { id: 2, name: 'Certificate of Employment with Compensation', description: 'Employment certificate including compensation details', format: 'PDF', frequency: 'As needed per employee' },
    { id: 3, name: 'Certificate of Employment with Duties and Responsibilities', description: 'Employment certificate including job responsibilities', format: 'PDF', frequency: 'As needed per employee' },
    { id: 4, name: 'Certificate of Employment With or Without Compensation', description: 'Employment certificate indicating compensation status', format: 'PDF', frequency: 'As needed per employee' },
    { id: 5, name: 'Employment History', description: 'Complete history of employment within the organization', format: 'PDF', frequency: 'As needed per employee' },
    { id: 6, name: 'Employee Service Record', description: 'Complete record of employee\'s service within the organization', format: 'PDF', frequency: 'As needed/Updated with personnel actions' },
    { id: 7, name: 'PDS with WES', description: 'Personal Data Sheet with Work Experience Sheet', format: 'PDF', frequency: 'As needed/When required by CSC' },
    { id: 8, name: 'NOSI', description: 'Notice of Separation from Office (Initial)', format: 'PDF', frequency: 'As needed per separation' },
    { id: 9, name: 'NOSA', description: 'Notice of Separation from Office (Acceptance)', format: 'PDF', frequency: 'As needed per separation' },
    { id: 10, name: 'Monthly / Yearly Report on Step Increment', description: 'Report of employees receiving step increments', format: 'PDF/Excel', frequency: 'Monthly/Yearly' },
    { id: 11, name: 'List of Separated Employees', description: 'List of all employees who have been separated from service', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 12, name: 'CSC Accession and Separation Report', description: 'Report of employees accessioned and separated for CSC', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 13, name: 'Senate Form D', description: 'Senate Form D - Official Directory of Government Officials', format: 'PDF/Excel', frequency: 'As required by Senate' },
    { id: 14, name: 'CSC Inventory of Government Human Resources (IGHR)', description: 'Comprehensive inventory of government human resources', format: 'PDF/Excel', frequency: 'As required by CSC' },
    { id: 15, name: 'Summary of Personnel Complement including COS, JOS', description: 'Summary of all personnel including Contract of Service and Job Order Service', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 16, name: 'List and Number of Employees by Age', description: 'Demographic report of employees by age groups', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 17, name: 'List and Number of Employees by Birth Dates', description: 'Report of employees with their birth dates', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 18, name: 'List and Number of Employees by Class', description: 'Report of employees grouped by employee class', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 19, name: 'List and Number of Employees by Employment Status', description: 'Report of employees grouped by employment status', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 20, name: 'List and Number of Employees by Gender', description: 'Gender distribution report of employees', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 21, name: 'List and Number of Employees by Length of Service', description: 'Report of employees grouped by length of service', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 22, name: 'List and Number of Employees by Position Title', description: 'Report of employees grouped by position title', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 23, name: 'List and Number of Employees by Profession', description: 'Report of employees grouped by profession', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 24, name: 'List and Number of Employees by Salary Grade', description: 'Report of employees grouped by salary grade', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 25, name: 'List and Number of Employees by Unit', description: 'Report of employees grouped by organizational unit', format: 'PDF/Excel', frequency: 'Quarterly/Annually' },
    { id: 26, name: 'Personal Data Sheet', description: 'Complete Personal Data Sheet (CSC Form 212)', format: 'PDF', frequency: 'As needed/When required by CSC' },
    { id: 27, name: 'Work Experience Sheet', description: 'Detailed work experience documentation', format: 'PDF', frequency: 'As needed/When required by CSC' },
    { id: 28, name: 'Personal Services Itemization - Plantilla of Personnel (PSIPOP)', description: 'Complete plantilla of all personnel positions', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 29, name: 'Personnel Movement', description: 'Report of all personnel movements (promotions, transfers, etc.)', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 30, name: 'GOCC Information for Operations and Compensation', description: 'Information on Government Owned and Controlled Corporations with complement data', format: 'PDF/Excel', frequency: 'As needed/Annually' },
    { id: 31, name: 'Service Record', description: 'Complete service record of an employee', format: 'PDF', frequency: 'As needed per employee' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating employee data report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
