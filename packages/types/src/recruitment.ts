import { BaseEntity, EmploymentType, PostingStatus, ApplicationStatus, InterviewType, InterviewStatus, ExamStatus, ExamResult, Recommendation, CertificateType, RequestStatus } from './common';

export interface JobPosting extends BaseEntity {
  jobTitleId: string;
  departmentId: string;
  jobDescription: string;
  qualifications: string;
  technicalCompetencies?: string;
  salaryRange?: string;
  employmentType: EmploymentType;
  numVacancies: number;
  applicationDeadline: Date;
  postingStatus: PostingStatus;
  createdBy: string;
}

export interface JobApplicant extends BaseEntity {
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  currentEmployer?: string;
  highestEducation?: string;
  resumePath?: string;
  isExistingEmployee: boolean;
  applicationDate: Date;
}

export interface JobApplication extends BaseEntity {
  positionId: string;
  applicantId: string;
  coverLetter?: string;
  status: ApplicationStatus;
  applicationDate: Date;
  withdrawnDate?: Date;
  remarks?: string;
}

export interface ApplicationDocument extends BaseEntity {
  applicationId: string;
  documentType: string;
  documentPath: string;
  uploadDate: Date;
}

export interface InterviewSchedule extends BaseEntity {
  applicationId: string;
  interviewerId: string;
  interviewDate: Date;
  interviewType: InterviewType;
  interviewStatus: InterviewStatus;
  interviewLocation?: string;
  interviewNotes?: string;
  rating?: number;
}

export interface ExaminationSchedule extends BaseEntity {
  applicationId: string;
  examType: string;
  examDate: Date;
  examLocation?: string;
  examStatus: ExamStatus;
  score?: number;
  passingScore?: number;
  result: ExamResult;
  examinerId?: string;
  notes?: string;
}

export interface ApplicantAssessment extends BaseEntity {
  applicationId: string;
  assessorId: string;
  assessmentDate: Date;
  criteriaTechnical?: number;
  criteriaExperience?: number;
  criteriaEducation?: number;
  criteriaCommunication?: number;
  criteriaCulturalFit?: number;
  overallRating?: number;
  comments?: string;
  recommendation: Recommendation;
}

export interface CertificateRequest extends BaseEntity {
  personnelId: string;
  certificateType: CertificateType;
  purpose: string;
  status: RequestStatus;
  requestDate: Date;
  completionDate?: Date;
  processedBy?: string;
  remarks?: string;
}

export interface CreateJobPostingRequest {
  jobTitleId: string;
  departmentId: string;
  jobDescription: string;
  qualifications: string;
  technicalCompetencies?: string;
  salaryRange?: string;
  employmentType: EmploymentType;
  numVacancies?: number;
  applicationDeadline: Date;
}

export interface CreateJobApplicantRequest {
  userId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  currentEmployer?: string;
  highestEducation?: string;
  resumePath?: string;
  isExistingEmployee?: boolean;
}

export interface CreateJobApplicationRequest {
  positionId: string;
  applicantId: string;
  coverLetter?: string;
}

export interface UpdateJobApplicationRequest {
  status: ApplicationStatus;
  remarks?: string;
}

export interface CreateInterviewScheduleRequest {
  applicationId: string;
  interviewerId: string;
  interviewDate: Date;
  interviewType: InterviewType;
  interviewLocation?: string;
}

export interface UpdateInterviewScheduleRequest {
  interviewDate?: Date;
  interviewType?: InterviewType;
  interviewStatus?: InterviewStatus;
  interviewLocation?: string;
  interviewNotes?: string;
  rating?: number;
}

export interface CreateExaminationScheduleRequest {
  applicationId: string;
  examType: string;
  examDate: Date;
  examLocation?: string;
  passingScore?: number;
  examinerId?: string;
}

export interface UpdateExaminationScheduleRequest {
  examDate?: Date;
  examLocation?: string;
  examStatus?: ExamStatus;
  score?: number;
  result?: ExamResult;
  notes?: string;
}

export interface CreateApplicantAssessmentRequest {
  applicationId: string;
  assessorId: string;
  criteriaTechnical?: number;
  criteriaExperience?: number;
  criteriaEducation?: number;
  criteriaCommunication?: number;
  criteriaCulturalFit?: number;
  overallRating?: number;
  comments?: string;
  recommendation: Recommendation;
}

export interface CreateCertificateRequestRequest {
  personnelId: string;
  certificateType: CertificateType;
  purpose: string;
}
