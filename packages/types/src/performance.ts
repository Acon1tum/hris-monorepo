import { BaseEntity, ReviewStatus, EvaluationStatus } from './common';

export interface PerformanceReview extends BaseEntity {
  personnelId: string;
  reviewerId: string;
  reviewPeriodStart: Date;
  reviewPeriodEnd: Date;
  reviewDate: Date;
  performanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  goals?: string;
  status: ReviewStatus;
}

export interface PerformanceEvaluation extends BaseEntity {
  personnelId: string;
  reviewerId: string;
  evaluationPeriodStart: Date;
  evaluationPeriodEnd: Date;
  evaluationDate: Date;
  selfAssessment?: string;
  managerComments?: string;
  peerFeedback?: string;
  kpiScore?: number;
  overallPerformanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  recommendedTraining?: string;
  status: EvaluationStatus;
}

export interface CreatePerformanceReviewRequest {
  personnelId: string;
  reviewerId: string;
  reviewPeriodStart: Date;
  reviewPeriodEnd: Date;
  performanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  goals?: string;
}

export interface UpdatePerformanceReviewRequest {
  performanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  goals?: string;
  status?: ReviewStatus;
}

export interface CreatePerformanceEvaluationRequest {
  personnelId: string;
  reviewerId: string;
  evaluationPeriodStart: Date;
  evaluationPeriodEnd: Date;
  selfAssessment?: string;
  managerComments?: string;
  peerFeedback?: string;
  kpiScore?: number;
  overallPerformanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  recommendedTraining?: string;
}

export interface UpdatePerformanceEvaluationRequest {
  selfAssessment?: string;
  managerComments?: string;
  peerFeedback?: string;
  kpiScore?: number;
  overallPerformanceScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  recommendedTraining?: string;
  status?: EvaluationStatus;
}
