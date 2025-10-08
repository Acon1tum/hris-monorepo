import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll-report.component.html',
  styleUrl: './payroll-report.component.scss'
})
export class PayrollReportComponent {
  reports = [
    { id: 1, name: 'Employee Payslip', description: 'Detailed breakdown of an employee\'s salary for a specific pay period', format: 'PDF', frequency: 'Per payroll period' },
    { id: 2, name: 'Payroll Summary', description: 'Summary of payroll for a specific period', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 3, name: 'Government Contributions Reports', description: 'Reports for various government contributions (GSIS, PhilHealth, Pag-IBIG, etc.)', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 4, name: 'Withholding Tax Report', description: 'Report of taxes withheld from employees\' salaries', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 5, name: 'Loan and Remittance Reports', description: 'Reports for various employee loans and remittances', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 6, name: 'Employee Earnings and Deduction Report', description: 'Comprehensive report of all earnings and deductions per employee', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 7, name: 'BIR 1601-C (Monthly Report of Tax Withheld)', description: 'Monthly tax withholding report for submission to BIR', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 8, name: 'BIR 2316 (Certificate of Compensation Payment/Tax Withheld)', description: 'Certificate of compensation and tax withheld for each employee', format: 'PDF', frequency: 'Annually/Upon request' },
    { id: 9, name: 'BIR Alphalist', description: 'Alphabetical list of employees with compensation information for BIR', format: 'Excel', frequency: 'Annually' },
    { id: 10, name: 'BIR Alphalist Terminated before year end', description: 'Alphalist for employees who were terminated before the end of the year', format: 'Excel', frequency: 'Annually' },
    { id: 11, name: 'BIR Tax Payments', description: 'Report of total tax payments made to BIR', format: 'PDF/Excel', frequency: 'Monthly/Quarterly' },
    { id: 12, name: 'ATM Alpha List', description: 'List formatted for bank ATM payroll processing', format: 'Excel', frequency: 'Per payroll period' },
    { id: 13, name: 'Bank Payroll Register', description: 'Register of payroll for bank processing', format: 'Excel', frequency: 'Per payroll period' },
    { id: 14, name: 'Certificate of Last Salary Received', description: 'Certificate of the last salary received by an employee', format: 'PDF', frequency: 'As needed per employee' },
    { id: 15, name: 'Consolidated Remittance List per Unit', description: 'Consolidated list of remittances by organizational unit', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 16, name: 'Consolidated Remittance Summary per Unit', description: 'Summary of remittances by organizational unit', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 17, name: 'Disbursement Voucher', description: 'Official document for salary disbursement', format: 'PDF', frequency: 'Per payroll period' },
    { id: 18, name: 'Entitlement of Longevity Pay', description: 'Report of employees entitled to longevity pay', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 19, name: 'Entitlement of Loyalty Pay', description: 'Report of employees entitled to loyalty pay', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 20, name: 'Entitlement of Salary Adjustment', description: 'Report of employees entitled to salary adjustment', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 21, name: 'General Payroll Alpha List per Unit', description: 'Alphabetical list of employees for general payroll by unit', format: 'Excel', frequency: 'Per payroll period' },
    { id: 22, name: 'General Payroll Cover Sheet', description: 'Cover sheet for general payroll documents', format: 'PDF', frequency: 'Per payroll period' },
    { id: 23, name: 'General Payroll Summary Grand Total', description: 'Grand total summary for general payroll', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 24, name: 'General Payroll Summary per Unit', description: 'Summary of general payroll by unit', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 25, name: 'General Payslip for Contracts of Service', description: 'Payslip for employees under contract of service', format: 'PDF', frequency: 'Per payroll period' },
    { id: 26, name: 'General Payslip for Regulars and Non-careers', description: 'Payslip for regular and non-career employees', format: 'PDF', frequency: 'Per payroll period' },
    { id: 27, name: 'GSIS Certificate of Contribution', description: 'Certificate of GSIS contributions per employee', format: 'PDF', frequency: 'As needed per employee' },
    { id: 28, name: 'GSIS Contributions Remittance File', description: 'File formatted for GSIS online contribution remittance', format: 'Excel', frequency: 'Monthly' },
    { id: 29, name: 'GSIS Member Registration Form', description: 'Form for GSIS member registration', format: 'PDF', frequency: 'As needed per employee' },
    { id: 30, name: 'HDMF Housing Loan Remittance', description: 'Report for HDMF housing loan remittances', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 31, name: 'HDMF Modified Pag-Ibig II Remittance', description: 'Report for Pag-IBIG II contributions', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 32, name: 'HDMF Multi-Purpose Loan Remittance', description: 'Report for Pag-IBIG multi-purpose loan remittances', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 33, name: 'Landbank Upload file', description: 'File formatted for Landbank payroll upload', format: 'File', frequency: 'Per payroll period' },
    { id: 34, name: 'Loan Summary Report', description: 'Summary of all types of loans', format: 'PDF/Excel', frequency: 'Monthly' },
    { id: 35, name: 'Notice of Longevity Pay', description: 'Official notice of longevity pay entitlement', format: 'PDF', frequency: 'As needed per employee' },
    { id: 36, name: 'Notice of Longevity Pay Increase', description: 'Notice of increase in longevity pay', format: 'PDF', frequency: 'As needed per employee' },
    { id: 37, name: 'Notice of Salary Adjustment', description: 'Official notice of salary adjustment', format: 'PDF', frequency: 'As needed per employee' },
    { id: 38, name: 'Notice of Salary Increment', description: 'Notice of salary increment', format: 'PDF', frequency: 'As needed per employee' },
    { id: 39, name: 'Notice of Step Increment', description: 'Notice of step increment in salary grade', format: 'PDF', frequency: 'As needed per employee' },
    { id: 40, name: 'Pag-ibig Certificate of Contribution', description: 'Certificate of Pag-IBIG contribution per employee', format: 'PDF', frequency: 'As needed per employee' },
    { id: 41, name: 'Pag-ibig Contributions Remittance File', description: 'File formatted for Pag-IBIG online contribution remittance', format: 'Excel', frequency: 'Monthly' },
    { id: 42, name: 'Pag-ibig Member Registration Form', description: 'Form for Pag-IBIG member registration', format: 'PDF', frequency: 'As needed per employee' },
    { id: 43, name: 'Paycheck Journal', description: 'Journal of all paycheck disbursements', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 44, name: 'Payroll Register', description: 'Detailed register of payroll disbursements', format: 'PDF/Excel', frequency: 'Per payroll period' },
    { id: 45, name: 'Special Payroll Alpha List per Unit', description: 'Alphabetical list of employees for special payroll by unit', format: 'Excel', frequency: 'As needed' },
    { id: 46, name: 'Special Payroll Cover Sheet', description: 'Cover sheet for special payroll documents', format: 'PDF', frequency: 'As needed' },
    { id: 47, name: 'Special Payroll Summary Grand Total', description: 'Grand total summary for special payroll', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 48, name: 'Special Payroll Summary per Unit', description: 'Summary of special payroll by unit', format: 'PDF/Excel', frequency: 'As needed' },
    { id: 49, name: 'Special Payslip for Regulars and Non-careers', description: 'Payslip for special payroll periods for regular and non-career employees', format: 'PDF', frequency: 'As needed' },
    { id: 50, name: 'Year-end Adjustment Report per Unit', description: 'Report of year-end payroll adjustments by unit', format: 'PDF/Excel', frequency: 'Annually' }
  ];

  generateReport(reportId: number) {
    console.log(`Generating payroll report: ${reportId}`);
    // In a real implementation, this would call a service to generate the report
    alert(`Generating ${this.reports.find(r => r.id === reportId)?.name}...`);
  }
}