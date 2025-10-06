import { BaseEntity, ApprovalStatus } from './common';
export interface LeaveType extends BaseEntity {
    leaveTypeName: string;
    description?: string;
    requiresDocument: boolean;
    maxDays?: number;
    isActive: boolean;
}
export interface LeaveBalance extends BaseEntity {
    personnelId: string;
    leaveTypeId: string;
    year: string;
    totalCredits: number;
    usedCredits: number;
    earnedCredits: number;
    lastUpdated: Date;
}
export interface LeaveAdjustment extends BaseEntity {
    personnelId: string;
    leaveTypeId: string;
    year: string;
    adjustmentType: string;
    adjustmentAmount: number;
    reason: string;
    previousBalance: number;
    newBalance: number;
    createdBy: string;
}
export interface LeaveApplication extends BaseEntity {
    personnelId: string;
    leaveTypeId: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    status: ApprovalStatus;
    reason?: string;
    supportingDocument?: string;
    requestDate: Date;
    approvedBy?: string;
    approvalDate?: Date;
    approvalComments?: string;
}
export interface LeaveMonetization extends BaseEntity {
    personnelId: string;
    leaveTypeId: string;
    daysToMonetize: number;
    status: ApprovalStatus;
    amount?: number;
    requestDate: Date;
    approvedBy?: string;
    approvalDate?: Date;
}
export interface CreateLeaveApplicationRequest {
    leaveTypeId: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    supportingDocument?: string;
}
export interface UpdateLeaveApplicationRequest {
    startDate?: Date;
    endDate?: Date;
    reason?: string;
    supportingDocument?: string;
}
export interface ApproveLeaveRequest {
    status: ApprovalStatus;
    approvalComments?: string;
}
export interface CreateLeaveTypeRequest {
    leaveTypeName: string;
    description?: string;
    requiresDocument?: boolean;
    maxDays?: number;
}
export interface UpdateLeaveTypeRequest {
    leaveTypeName?: string;
    description?: string;
    requiresDocument?: boolean;
    maxDays?: number;
    isActive?: boolean;
}
//# sourceMappingURL=leave.d.ts.map