"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
let LoansComponent = class LoansComponent {
    activeTab = 'current';
    loans = [
        {
            id: '1',
            loanType: 'Personal Loan',
            amount: '$5,000',
            balance: '$2,500',
            term: '24 months',
            status: 'Active',
            repaymentProgress: 50,
            originalAmount: 5000,
            interestRate: 8.5,
            totalAmountRepaid: 2500,
            remainingBalance: 2500,
            startDate: '2023-01-15',
            endDate: '2025-01-15',
            monthlyPayment: 208.33,
            totalInterest: 850,
            totalAmount: 5850
        },
        {
            id: '2',
            loanType: 'Car Loan',
            amount: '$15,000',
            balance: '$10,000',
            term: '60 months',
            status: 'Active',
            repaymentProgress: 33,
            originalAmount: 15000,
            interestRate: 6.2,
            totalAmountRepaid: 5000,
            remainingBalance: 10000,
            startDate: '2022-06-01',
            endDate: '2027-06-01',
            monthlyPayment: 291.67,
            totalInterest: 2500,
            totalAmount: 17500
        },
        {
            id: '3',
            loanType: 'Home Loan',
            amount: '$100,000',
            balance: '$95,000',
            term: '360 months',
            status: 'Active',
            repaymentProgress: 5,
            originalAmount: 100000,
            interestRate: 4.8,
            totalAmountRepaid: 5000,
            remainingBalance: 95000,
            startDate: '2023-03-01',
            endDate: '2053-03-01',
            monthlyPayment: 524.67,
            totalInterest: 88900,
            totalAmount: 188900
        }
    ];
    loanApplications = [
        {
            id: '1',
            applicationDate: '2024-11-15',
            loanType: 'Personal Loan',
            amount: 25000,
            term: 24,
            status: 'Approved',
            purpose: 'Home renovation',
            monthlyIncome: 45000,
            existingLoans: 0,
            collateral: 'None'
        },
        {
            id: '2',
            applicationDate: '2024-10-20',
            loanType: 'Car Loan',
            amount: 300000,
            term: 60,
            status: 'Pending',
            purpose: 'Vehicle purchase',
            monthlyIncome: 55000,
            existingLoans: 25000,
            collateral: 'Vehicle registration'
        },
        {
            id: '3',
            applicationDate: '2024-09-10',
            loanType: 'Business Loan',
            amount: 500000,
            term: 36,
            status: 'Rejected',
            purpose: 'Business expansion',
            monthlyIncome: 75000,
            existingLoans: 100000,
            collateral: 'Business assets'
        },
        {
            id: '4',
            applicationDate: '2024-08-05',
            loanType: 'Education Loan',
            amount: 150000,
            term: 48,
            status: 'Processing',
            purpose: 'Graduate studies',
            monthlyIncome: 40000,
            existingLoans: 0,
            collateral: 'None'
        }
    ];
    repaymentHistory = [
        {
            cutoff: '2024-07-15',
            installmentAmount: '$208.33',
            paymentDate: '2024-07-15',
            status: 'Paid'
        },
        {
            cutoff: '2024-07-31',
            installmentAmount: '$208.33',
            paymentDate: '2024-07-31',
            status: 'Paid'
        },
        {
            cutoff: '2024-08-15',
            installmentAmount: '$208.33',
            paymentDate: '2024-08-15',
            status: 'Paid'
        },
        {
            cutoff: '2024-08-31',
            installmentAmount: '$208.33',
            paymentDate: '2024-08-31',
            status: 'Paid'
        },
        {
            cutoff: '2024-09-15',
            installmentAmount: '$208.33',
            paymentDate: '2024-09-15',
            status: 'Paid'
        }
    ];
    selectedLoan = null;
    selectedApplication = null;
    showLoanDetails = false;
    showLoanApplication = false;
    showApplicationDetails = false;
    isSubmitting = false;
    loanApplication = {
        loanType: '',
        loanAmount: 0,
        loanTerm: 0,
        loanPurpose: '',
        monthlyIncome: 0,
        existingLoans: 0,
        collateral: ''
    };
    setActiveTab(tab) {
        this.activeTab = tab;
    }
    viewApplicationDetails(application) {
        this.selectedApplication = application;
        this.showApplicationDetails = true;
    }
    closeApplicationDetails() {
        this.showApplicationDetails = false;
        this.selectedApplication = null;
    }
    cancelApplication(application) {
        if (confirm('Are you sure you want to cancel this loan application? This action cannot be undone.')) {
            // Remove the application from the list
            const index = this.loanApplications.findIndex(app => app.id === application.id);
            if (index > -1) {
                this.loanApplications.splice(index, 1);
            }
            this.closeApplicationDetails();
            alert('Loan application has been cancelled successfully.');
        }
    }
    applyForLoan() {
        this.showLoanApplication = true;
        this.resetLoanApplication();
    }
    closeLoanApplication() {
        this.showLoanApplication = false;
        this.resetLoanApplication();
    }
    resetLoanApplication() {
        this.loanApplication = {
            loanType: '',
            loanAmount: 0,
            loanTerm: 0,
            loanPurpose: '',
            monthlyIncome: 0,
            existingLoans: 0,
            collateral: ''
        };
        this.isSubmitting = false;
    }
    submitLoanApplication() {
        if (!this.loanApplication.loanType || !this.loanApplication.loanAmount || !this.loanApplication.loanTerm) {
            return;
        }
        this.isSubmitting = true;
        // Simulate API call
        setTimeout(() => {
            console.log('Loan application submitted:', this.loanApplication);
            // Add the new application to the list
            const newApplication = {
                id: (this.loanApplications.length + 1).toString(),
                applicationDate: new Date().toISOString().split('T')[0],
                loanType: this.loanApplication.loanType,
                amount: this.loanApplication.loanAmount,
                term: this.loanApplication.loanTerm,
                status: 'Pending',
                purpose: this.loanApplication.loanPurpose,
                monthlyIncome: this.loanApplication.monthlyIncome,
                existingLoans: this.loanApplication.existingLoans,
                collateral: this.loanApplication.collateral
            };
            this.loanApplications.unshift(newApplication);
            this.isSubmitting = false;
            this.closeLoanApplication();
            // Switch to applications tab to show the new application
            this.setActiveTab('applications');
            // For demo purposes, show success alert
            alert('Loan application submitted successfully! We will review your application and contact you soon.');
        }, 2000);
    }
    calculateMonthlyPayment() {
        if (!this.loanApplication.loanAmount || !this.loanApplication.loanTerm) {
            return 0;
        }
        const principal = this.loanApplication.loanAmount;
        const annualRate = 0.08; // 8% annual interest rate
        const monthlyRate = annualRate / 12;
        const numberOfPayments = this.loanApplication.loanTerm;
        if (monthlyRate === 0) {
            return principal / numberOfPayments;
        }
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        return Math.round(monthlyPayment * 100) / 100;
    }
    calculateTotalInterest() {
        const monthlyPayment = this.calculateMonthlyPayment();
        const totalPayments = monthlyPayment * this.loanApplication.loanTerm;
        return Math.round((totalPayments - this.loanApplication.loanAmount) * 100) / 100;
    }
    calculateTotalAmount() {
        return this.loanApplication.loanAmount + this.calculateTotalInterest();
    }
    downloadSummary() {
        // Implement download functionality
        console.log('Downloading summary...');
    }
    viewLoanDetails(loan) {
        this.selectedLoan = loan;
        this.showLoanDetails = true;
    }
    closeLoanDetails() {
        this.showLoanDetails = false;
        this.selectedLoan = null;
    }
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
    formatPercentage(rate) {
        return `${rate.toFixed(1)}%`;
    }
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};
exports.LoansComponent = LoansComponent;
exports.LoansComponent = LoansComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-loans',
        standalone: true,
        imports: [common_1.CommonModule, forms_1.FormsModule],
        templateUrl: './loans.component.html',
        styleUrls: ['./loans.component.scss']
    })
], LoansComponent);
//# sourceMappingURL=loans.component.js.map