import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
export type { Prisma };
export type { Course, Instructor, Student, CourseModule, Lesson, Quiz, Question, Assignment, Enrollment, CourseReview, Certificate, LearningPath, LearningPathCourse, LearningPathEnrollment, StudentProgress, QuizAttempt, AssignmentSubmission, Discussion, DiscussionReply, Notification, SystemSetting, CourseStatus, CourseLevel, EnrollmentStatus, LessonType, QuizType, AssignmentStatus, CertificateStatus, LearningPathStatus, ProgressStatus } from '@prisma/client';
declare global {
    var lmsPrisma: PrismaClient | undefined;
}
export declare const lmsPrisma: any;
export default lmsPrisma;
//# sourceMappingURL=client.d.ts.map