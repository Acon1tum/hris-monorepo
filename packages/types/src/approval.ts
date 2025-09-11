import { BaseEntity, RequestType, ApprovalStatus } from './common';

export interface Approval extends BaseEntity {
  requestType: RequestType;
  requestId: string;
  approvalStep: number;
  status: ApprovalStatus;
  approvedBy?: string;
  approvalDate?: Date;
}

export interface CreateApprovalRequest {
  requestType: RequestType;
  requestId: string;
  approvalStep?: number;
}

export interface UpdateApprovalRequest {
  status: ApprovalStatus;
  approvalComments?: string;
}

