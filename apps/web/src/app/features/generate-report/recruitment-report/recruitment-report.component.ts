import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruitment-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruitment-report.component.html',
  styleUrl: './recruitment-report.component.scss'
})
export class RecruitmentReportComponent {
  reports = [
    { id: 1, name: 'Oath of Office (CS Form No. 32)', description: 'Official oath-taking document for new employees', format: 'PDF', frequency: 'As needed per employee' },
    { id: 2, name: 'Appointment for Regulated Agencies (CS Form No. 33-A)', description: 'Appointment form for employees in regulated agencies', format: 'PDF', frequency: 'As needed per appointment' },
    { id: 3, name: 'Appointment for Accredited / Deregulated Agencies (CS Form No. 33-B)', description: 'Appointment form for employees in accredited/deregulated agencies', format: 'PDF', frequency: 'As needed per appointment' },
    { id: 4, name: 'Appointment Transmittal and Action Form (CS Form No. 1)', description: 'Form for transmitting appointment documents for action', format: 'PDF', frequency: 'As needed per appointment' },
    { id: 5, name: 'Report on Appointments Issued (RAI) (CS Form No. 2)', description: 'Monthly report on all appointments issued', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 6, name: 'Certification of Erasures / Alterations on Appointment (CS Form No. 3)', description: 'Certification for any erasures or alterations made on appointment papers', format: 'PDF', frequency: 'As needed when alterations occur' },
    { id: 7, name: 'Certification of Assumption to Duty (CS Form No. 4)', description: 'Certification that employee has assumed duties in the position', format: 'PDF', frequency: 'As needed per appointment' },
    { id: 8, name: 'Request for Publication of Vacant Positions (CS Form No. 9)', description: 'Request to publish vacant positions in official gazette or media', format: 'PDF', frequency: 'As needed per vacancy' },
    { id: 9, name: 'Acceptance of Resignation (CS Form No. 10)', description: 'Official acceptance document for employee resignation', format: 'PDF', frequency: 'As needed per resignation' },
    { id: 10, name: 'List of Contenders for the Vacant Position', description: 'List of applicants who met the qualifications for a vacant position', format: 'PDF/Excel', frequency: 'As needed per vacancy' },
    { id: 11, name: 'Summary of Scores with Top 5', description: 'Summary of examination/interview scores with top 5 contenders', format: 'PDF/Excel', frequency: 'As needed per selection process' },
    { id: 12, name: 'PSIPOP-Based Plantilla Report', description: 'Plantilla report based on PSIPOP (Personnel Services Itemization - Plantilla of Personnel)', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 13, name: 'Reports on Appointments Issued', description: 'Comprehensive report of all appointments issued', format: 'PDF/Excel', frequency: 'Monthly/Quarterly/Annually' },
    { id: 14, name: 'GOCC Information for Operations and Compensation', description: 'Information on Government Owned and Controlled Corporations with complement data', format: 'PDF/Excel', frequency: 'As needed/Annually' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating recruitment report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}
