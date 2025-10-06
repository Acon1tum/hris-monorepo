interface Loan {
    id: string;
    loanType: string;
    amount: string;
    balance: string;
    term: string;
    status: string;
    repaymentProgress: number;
    originalAmount: number;
    interestRate: number;
    totalAmountRepaid: number;
    remainingBalance: number;
    startDate: string;
    endDate: string;
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
}
interface RepaymentHistory {
    cutoff: string;
    installmentAmount: string;
    paymentDate: string;
    status: string;
}
interface LoanApplication {
    loanType: string;
    loanAmount: number;
    loanTerm: number;
    loanPurpose: string;
    monthlyIncome: number;
    existingLoans: number;
    collateral: string;
}
interface LoanApplicationRecord {
    id: string;
    applicationDate: string;
    loanType: string;
    amount: number;
    term: number;
    status: string;
    purpose: string;
    monthlyIncome: number;
    existingLoans: number;
    collateral: string;
}
export declare class LoansComponent {
    activeTab: 'current' | 'applications' | 'history';
    loans: Loan[];
    loanApplications: LoanApplicationRecord[];
    repaymentHistory: RepaymentHistory[];
    selectedLoan: Loan | null;
    selectedApplication: LoanApplicationRecord | null;
    showLoanDetails: boolean;
    showLoanApplication: boolean;
    showApplicationDetails: boolean;
    isSubmitting: boolean;
    loanApplication: LoanApplication;
    setActiveTab(tab: 'current' | 'applications' | 'history'): void;
    viewApplicationDetails(application: LoanApplicationRecord): void;
    closeApplicationDetails(): void;
    cancelApplication(application: LoanApplicationRecord): void;
    applyForLoan(): void;
    closeLoanApplication(): void;
    resetLoanApplication(): void;
    submitLoanApplication(): void;
    calculateMonthlyPayment(): number;
    calculateTotalInterest(): number;
    calculateTotalAmount(): number;
    downloadSummary(): void;
    viewLoanDetails(loan: Loan): void;
    closeLoanDetails(): void;
    formatCurrency(amount: number): string;
    formatPercentage(rate: number): string;
    formatDate(dateString: string): string;
}
export {};
//# sourceMappingURL=loans.component.d.ts.map