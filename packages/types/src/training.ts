import { BaseEntity, TrainingStatus, ParticipantStatus, CourseStatus, CourseLevel } from './common';

export interface TrainingProgram extends BaseEntity {
  trainingName: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  trainer?: string;
  maxParticipants?: string;
  status: TrainingStatus;
  createdBy?: string;
}

export interface TrainingModule extends BaseEntity {
  trainingId: string;
  moduleName: string;
  content?: string;
  videoLink?: string;
}

export interface TrainingParticipant extends BaseEntity {
  trainingId: string;
  personnelId: string;
  status: ParticipantStatus;
  enrollmentDate: Date;
  completionDate?: Date;
  certificateIssued: boolean;
  feedback?: string;
}

export interface Course extends BaseEntity {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  duration: number;
  level: CourseLevel;
  status: CourseStatus;
  instructorId: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
}

export interface CourseModule extends BaseEntity {
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: string;
  resources: string[];
}

export interface CourseEnrollment extends BaseEntity {
  courseId: string;
  personnelId: string;
  enrollmentDate: Date;
  completionDate?: Date;
  status: string;
  progress: number;
  lastAccessedAt: Date;
}

export interface CreateTrainingProgramRequest {
  trainingName: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  trainer?: string;
  maxParticipants?: string;
}

export interface UpdateTrainingProgramRequest {
  trainingName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  trainer?: string;
  maxParticipants?: string;
  status?: TrainingStatus;
}

export interface CreateTrainingModuleRequest {
  trainingId: string;
  moduleName: string;
  content?: string;
  videoLink?: string;
}

export interface UpdateTrainingModuleRequest {
  moduleName?: string;
  content?: string;
  videoLink?: string;
}

export interface CreateCourseRequest {
  title: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  duration: number;
  level: CourseLevel;
  instructorId: string;
  category: string;
  tags: string[];
  thumbnailUrl?: string;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  objectives?: string[];
  prerequisites?: string[];
  duration?: number;
  level?: CourseLevel;
  status?: CourseStatus;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
}

export interface CreateCourseModuleRequest {
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: string;
  resources: string[];
}

export interface UpdateCourseModuleRequest {
  title?: string;
  description?: string;
  order?: number;
  duration?: number;
  content?: string;
  resources?: string[];
}

export interface EnrollInCourseRequest {
  courseId: string;
  personnelId: string;
}

export interface UpdateCourseEnrollmentRequest {
  status?: string;
  progress?: number;
}

