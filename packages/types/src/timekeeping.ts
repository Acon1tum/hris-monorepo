import { BaseEntity, AttendanceStatus, ApprovalStatus } from './common';

export interface WorkSchedule extends BaseEntity {
  scheduleName: string;
  isFlextime: boolean;
  startTime?: Date;
  endTime?: Date;
  breakStartTime?: Date;
  breakEndTime?: Date;
  breakDeducted: boolean;
  isWorkFromHome: boolean;
}

export interface PersonnelSchedule extends BaseEntity {
  personnelId: string;
  scheduleId: string;
  startDate: Date;
  endDate?: Date;
  createdBy: string;
}

export interface AttendanceLog extends BaseEntity {
  personnelId: string;
  logDate: Date;
  timeIn?: Date;
  timeOut?: Date;
  totalHours?: number;
  status: AttendanceStatus;
  biometricUsed: boolean;
  evidencePath?: string;
}

export interface DtrAdjustmentRequest extends BaseEntity {
  personnelId: string;
  logDate: Date;
  originalTimeIn?: Date;
  originalTimeOut?: Date;
  requestedTimeIn?: Date;
  requestedTimeOut?: Date;
  reason: string;
  supportingDocument?: string;
  status: ApprovalStatus;
  requestDate: Date;
  approvedBy: string;
  approvalDate?: Date;
}

export interface OvertimeRequest extends BaseEntity {
  personnelId: string;
  overtimeDate: Date;
  startTime: Date;
  endTime: Date;
  totalHours: number;
  reason: string;
  status: ApprovalStatus;
  requestDate: Date;
  approvedBy?: string;
  approvalDate?: Date;
}

export interface CreateAttendanceLogRequest {
  logDate: Date;
  timeIn?: Date;
  timeOut?: Date;
  status: AttendanceStatus;
  evidencePath?: string;
}

export interface UpdateAttendanceLogRequest {
  timeIn?: Date;
  timeOut?: Date;
  status?: AttendanceStatus;
  evidencePath?: string;
}

export interface CreateDtrAdjustmentRequest {
  logDate: Date;
  originalTimeIn?: Date;
  originalTimeOut?: Date;
  requestedTimeIn?: Date;
  requestedTimeOut?: Date;
  reason: string;
  supportingDocument?: string;
}

export interface ApproveDtrAdjustmentRequest {
  status: ApprovalStatus;
  approvalComments?: string;
}

export interface CreateOvertimeRequest {
  overtimeDate: Date;
  startTime: Date;
  endTime: Date;
  reason: string;
}

export interface ApproveOvertimeRequest {
  status: ApprovalStatus;
  approvalComments?: string;
}
