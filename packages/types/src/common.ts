// Enums from Prisma schema
export enum RoleType {
  Admin = 'Admin',
  HR = 'HR',
  Employee = 'Employee',
  Manager = 'Manager',
  Applicant = 'Applicant'
}

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive'
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum CivilStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed'
}

export enum EmploymentType {
  Casual = 'Casual',
  Contractual = 'Contractual',
  Contract_Of_Service = 'Contract_Of_Service',
  Plantilla = 'Plantilla'
}

export enum SalaryGrade {
  SG_1 = 'SG_1',
  SG_2 = 'SG_2',
  SG_3 = 'SG_3',
  SG_4 = 'SG_4',
  SG_5 = 'SG_5',
  SG_6 = 'SG_6',
  SG_7 = 'SG_7',
  SG_8 = 'SG_8',
  SG_9 = 'SG_9',
  SG_10 = 'SG_10',
  SG_11 = 'SG_11',
  SG_12 = 'SG_12',
  SG_13 = 'SG_13',
  SG_14 = 'SG_14',
  SG_15 = 'SG_15',
  SG_16 = 'SG_16',
  SG_17 = 'SG_17',
  SG_18 = 'SG_18',
  SG_19 = 'SG_19',
  SG_20 = 'SG_20',
  SG_21 = 'SG_21',
  SG_22 = 'SG_22',
  SG_23 = 'SG_23',
  SG_24 = 'SG_24',
  SG_25 = 'SG_25',
  SG_26 = 'SG_26',
  SG_27 = 'SG_27',
  SG_28 = 'SG_28',
  SG_29 = 'SG_29',
  SG_30 = 'SG_30',
  SG_31 = 'SG_31',
  SG_32 = 'SG_32',
  SG_33 = 'SG_33'
}

export enum PositionClassification {
  Professional_Supervisory = 'Professional_Supervisory',
  Professional_Non_Supervisory = 'Professional_Non_Supervisory',
  Sub_Professional_Supervisory = 'Sub_Professional_Supervisory',
  Sub_Professional_Non_Supervisory = 'Sub_Professional_Non_Supervisory',
  Executive_Managerial = 'Executive_Managerial',
  Clerical = 'Clerical',
  Trades_Crafts_Labor = 'Trades_Crafts_Labor'
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  On_Leave = 'On_Leave',
  Work_From_Home = 'Work_From_Home'
}

export enum ApprovalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export enum MovementType {
  Promotion = 'Promotion',
  Transfer = 'Transfer',
  Re_employment = 'Re_employment',
  Reinstatement = 'Reinstatement',
  Voluntary_Demotion = 'Voluntary_Demotion',
  Disciplinary_Demotion = 'Disciplinary_Demotion',
  Reclassification = 'Reclassification',
  Reassignment = 'Reassignment',
  Detail = 'Detail',
  Designation = 'Designation',
  Probationary_Period = 'Probationary_Period',
  Item_Number_Change = 'Item_Number_Change',
  Step_Increment = 'Step_Increment',
  Salary_Adjustment = 'Salary_Adjustment',
  Reinstatement_Same_Position = 'Reinstatement_Same_Position'
}

export enum RecordType {
  Merit = 'Merit',
  Violation = 'Violation'
}

export enum CaseStatus {
  Filed = 'Filed',
  Under_Investigation = 'Under_Investigation',
  Resolved = 'Resolved',
  Dismissed = 'Dismissed',
  Appealed = 'Appealed'
}

export enum PaymentStatus {
  Pending = 'Pending',
  Processed = 'Processed',
  Disbursed = 'Disbursed'
}

export enum LoanType {
  Consolidated = 'Consolidated',
  Policy = 'Policy',
  Multi_Purpose = 'Multi_Purpose',
  Other = 'Other'
}

export enum LoanStatus {
  Active = 'Active',
  Fully_Paid = 'Fully_Paid',
  Delinquent = 'Delinquent'
}

export enum PostingStatus {
  Draft = 'Draft',
  Published = 'Published',
  Closed = 'Closed',
  Filled = 'Filled'
}

export enum ApplicationStatus {
  Pending = 'Pending',
  Pre_Screening = 'Pre_Screening',
  For_Interview = 'For_Interview',
  For_Examination = 'For_Examination',
  Shortlisted = 'Shortlisted',
  Selected = 'Selected',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn',
  Hired = 'Hired'
}

export enum InterviewType {
  Phone = 'Phone',
  Video = 'Video',
  On_Site = 'On_Site'
}

export enum InterviewStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum ExamStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum ExamResult {
  Passed = 'Passed',
  Failed = 'Failed',
  Pending = 'Pending'
}

export enum Recommendation {
  Hire = 'Hire',
  Consider = 'Consider',
  Reject = 'Reject'
}

export enum CertificateType {
  Employment = 'Employment',
  Contribution = 'Contribution',
  Service_Record = 'Service_Record',
  Other = 'Other'
}

export enum RequestStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Rejected = 'Rejected'
}

export enum ReviewStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Reviewed = 'Reviewed',
  Acknowledged = 'Acknowledged'
}

export enum TrainingStatus {
  Planned = 'Planned',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum ParticipantStatus {
  Enrolled = 'Enrolled',
  Completed = 'Completed',
  Failed = 'Failed',
  Dropped = 'Dropped'
}

export enum FeedbackType {
  System = 'System',
  HR_Service = 'HR_Service',
  Management = 'Management',
  Work_Environment = 'Work_Environment',
  Other = 'Other'
}

export enum FeedbackStatus {
  New = 'New',
  Under_Review = 'Under_Review',
  Addressed = 'Addressed',
  Closed = 'Closed'
}

export enum EvaluationStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Reviewed = 'Reviewed',
  Finalized = 'Finalized'
}

export enum RequestType {
  Leave = 'Leave',
  Payroll = 'Payroll',
  Recruitment = 'Recruitment'
}

export enum CourseStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived'
}

export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

// Common interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  search?: string;
  filters?: Record<string, any>;
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}
