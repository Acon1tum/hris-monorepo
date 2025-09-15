# LMS Database Package

This package contains the database schema and client for the Learning Management System (LMS) module of the HRIS monorepo.

## Features

- **Course Management**: Create and manage courses with modules, lessons, and assignments
- **Student Management**: Handle student enrollments, progress tracking, and certificates
- **Instructor Management**: Manage instructor profiles and course assignments
- **Learning Paths**: Create structured learning journeys with multiple courses
- **Assessment Tools**: Quizzes, assignments, and progress tracking
- **Discussion Forums**: Course-specific discussion boards
- **Certification System**: Generate and manage course completion certificates
- **Notification System**: Real-time notifications for students and instructors

## Database Schema

The LMS database includes the following main entities:

### Core Entities
- **Course**: Main course entity with metadata, pricing, and status
- **Instructor**: Course instructors with profiles and expertise
- **Student**: Student profiles with learning goals and progress
- **CourseModule**: Course structure with ordered modules
- **Lesson**: Individual lessons with different types (video, text, quiz, assignment)
- **Enrollment**: Student course enrollments with progress tracking

### Assessment & Learning
- **Quiz**: Course quizzes with questions and attempts
- **Assignment**: Course assignments with submissions and grading
- **StudentProgress**: Detailed progress tracking per lesson
- **Certificate**: Course completion certificates

### Advanced Features
- **LearningPath**: Structured learning journeys
- **Discussion**: Course discussion forums
- **Notification**: System notifications
- **SystemSetting**: Configurable system settings

## Setup

1. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Update LMS_DATABASE_URL with your database connection string
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Generate Prisma Client**:
   ```bash
   pnpm run db:generate
   ```

4. **Run Database Migrations**:
   ```bash
   pnpm run db:migrate
   ```

5. **Seed Database** (optional):
   ```bash
   pnpm run db:seed
   ```

## Usage

```typescript
import { lmsPrisma, Course, Student, Enrollment } from '@hris/lms-db';

// Create a new course
const course = await lmsPrisma.course.create({
  data: {
    title: 'Advanced React Development',
    description: 'Learn advanced React patterns and best practices',
    level: 'Advanced',
    status: 'Published',
    category: 'Web Development',
    instructorId: 'instructor-id',
    // ... other fields
  },
});

// Enroll a student in a course
const enrollment = await lmsPrisma.enrollment.create({
  data: {
    courseId: course.id,
    studentId: 'student-id',
    status: 'Enrolled',
  },
});

// Track student progress
const progress = await lmsPrisma.studentProgress.create({
  data: {
    studentId: 'student-id',
    lessonId: 'lesson-id',
    status: 'Completed',
    completedAt: new Date(),
  },
});
```

## Available Scripts

- `pnpm run build` - Build the TypeScript code
- `pnpm run dev` - Watch mode for development
- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:seed` - Seed database with sample data
- `pnpm run db:studio` - Open Prisma Studio
- `pnpm run clean` - Clean build artifacts

## Database Connection

The LMS database uses a separate connection from the main HRIS database. Configure the `LMS_DATABASE_URL` environment variable to point to your LMS database instance.

Example:
```
LMS_DATABASE_URL="postgresql://username:password@localhost:5432/lms_database?schema=public"
```

## Integration with HRIS

This LMS database is designed to work alongside the main HRIS database. Students and instructors can be linked to HRIS personnel records through the `userId` field, allowing for seamless integration between the two systems.

## Development

When making changes to the schema:

1. Update the `schema.prisma` file
2. Run `pnpm run db:migrate` to create and apply migrations
3. Run `pnpm run db:generate` to update the Prisma client
4. Update TypeScript types if needed
5. Test your changes with `pnpm run db:studio`
