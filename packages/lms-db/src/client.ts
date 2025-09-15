import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

export type { Prisma };

// Re-export all types from Prisma
export type {
  Course,
  Instructor,
  Student,
  CourseModule,
  Lesson,
  Quiz,
  Question,
  Assignment,
  Enrollment,
  CourseReview,
  Certificate,
  LearningPath,
  LearningPathCourse,
  LearningPathEnrollment,
  StudentProgress,
  QuizAttempt,
  AssignmentSubmission,
  Discussion,
  DiscussionReply,
  Notification,
  SystemSetting,
  CourseStatus,
  CourseLevel,
  EnrollmentStatus,
  LessonType,
  QuizType,
  AssignmentStatus,
  CertificateStatus,
  LearningPathStatus,
  ProgressStatus
} from '@prisma/client';

declare global {
  var lmsPrisma: PrismaClient | undefined;
}

export const lmsPrisma = globalThis.lmsPrisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.lmsPrisma = lmsPrisma;
}

export default lmsPrisma;
