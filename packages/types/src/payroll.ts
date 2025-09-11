import { BaseEntity, PaymentStatus, LoanType, LoanStatus } from './common';

export interface PayrollRecord extends BaseEntity {
  personnelId: string;
  payrollPeriodStart: Date;
  payrollPeriodEnd: Date;
  basicSalary: number;
  salaryAdjustments: number;
  grossSalary: number;
  totalDeductions: number;
  netAmountDue: number;
  paymentStatus: PaymentStatus;
  bankAccountNumber?: string;
  processedDate: Date;
  processedBy?: string;
}

export interface Deduction extends BaseEntity {
  personnelId: string;
  payrollId: string;
  bir: number;
  pagibig: number;
  philhealth: number;
  sss: number;
  loans: number;
  otherDeductions: number;
}

export interface LoanRecord extends BaseEntity {
  personnelId: string;
  loanType: LoanType;
  loanSource: string;
  loanAmount: number;
  monthlyDeduction: number;
  startDate: Date;
  endDate?: Date;
  remainingBalance: number;
  status: LoanStatus;
}

export interface CreatePayrollRecordRequest {
  personnelId: string;
  payrollPeriodStart: Date;
  payrollPeriodEnd: Date;
  basicSalary: number;
  salaryAdjustments?: number;
  bankAccountNumber?: string;
}

export interface UpdatePayrollRecordRequest {
  basicSalary?: number;
  salaryAdjustments?: number;
  bankAccountNumber?: string;
  paymentStatus?: PaymentStatus;
}

export interface CreateLoanRecordRequest {
  personnelId: string;
  loanType: LoanType;
  loanSource: string;
  loanAmount: number;
  monthlyDeduction: number;
  startDate: Date;
  endDate?: Date;
}

export interface UpdateLoanRecordRequest {
  loanType?: LoanType;
  loanSource?: string;
  loanAmount?: number;
  monthlyDeduction?: number;
  endDate?: Date;
  status?: LoanStatus;
}
