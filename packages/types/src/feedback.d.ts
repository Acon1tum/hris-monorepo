import { BaseEntity, FeedbackType, FeedbackStatus } from './common';
export interface EmployeeFeedback extends BaseEntity {
    personnelId: string;
    feedbackType: FeedbackType;
    feedbackContent: string;
    isAnonymous: boolean;
    submittedAt: Date;
    status: FeedbackStatus;
    response?: string;
    respondedBy?: string;
    respondedAt?: Date;
}
export interface CreateEmployeeFeedbackRequest {
    personnelId: string;
    feedbackType: FeedbackType;
    feedbackContent: string;
    isAnonymous?: boolean;
}
export interface UpdateEmployeeFeedbackRequest {
    feedbackType?: FeedbackType;
    feedbackContent?: string;
    isAnonymous?: boolean;
    status?: FeedbackStatus;
}
export interface RespondToFeedbackRequest {
    response: string;
}
//# sourceMappingURL=feedback.d.ts.map