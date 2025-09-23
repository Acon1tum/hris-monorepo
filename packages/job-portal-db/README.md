# Job Portal Database Package

This package contains the Prisma schema and database client for the HRIS Job Portal system.

## Features

- **Job Management**: Complete job posting and application management
- **User Management**: Support for different user roles (Admin, HR, Applicant, etc.)
- **Application Tracking**: Full application lifecycle management
- **Interview Scheduling**: Interview and examination scheduling system
- **Skills Management**: Skills tracking and matching
- **Analytics**: Job portal analytics and reporting
- **Notifications**: User notification system
- **Document Management**: File upload and management

## Database Schema

### Core Models

- **User**: System users with role-based access
- **JobPosting**: Job postings with detailed requirements
- **JobApplicant**: Applicant profiles and information
- **JobApplication**: Application records linking applicants to jobs
- **Department**: Organizational departments
- **JobTitle**: Job position definitions
- **Personnel**: Employee records

### Application Management

- **ApplicationDocument**: Supporting documents for applications
- **InterviewSchedule**: Interview scheduling and management
- **ExaminationSchedule**: Examination scheduling and results
- **ApplicantAssessment**: Assessment and evaluation records
- **ApplicationNote**: Internal notes and comments

### Skills & Experience

- **Skill**: Skills database
- **ApplicantSkill**: Applicant skill profiles
- **JobSkill**: Required skills for job postings
- **WorkExperience**: Applicant work history
- **Education**: Educational background
- **Certification**: Professional certifications

### User Features

- **SavedJob**: Job bookmarking
- **JobAlert**: Job notification alerts
- **JobView**: Job view tracking
- **UserDocument**: Document management

### System

- **Notification**: User notifications
- **AuditLog**: System audit trail
- **SystemSetting**: Configuration settings
- **JobPortalAnalytics**: Analytics data

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
# .env
JOB_PORTAL_DATABASE_URL="postgresql://username:password@localhost:5432/job_portal_db"
```

3. Generate Prisma client:
```bash
pnpm db:generate
```

4. Run database migrations:
```bash
pnpm db:migrate
```

5. Seed the database:
```bash
pnpm db:seed
```

## Usage

```typescript
import { prisma } from '@hris/job-portal-db';

// Create a job posting
const jobPosting = await prisma.jobPosting.create({
  data: {
    job_title_id: 'title-id',
    department_id: 'dept-id',
    job_description: 'Job description...',
    // ... other fields
  },
});

// Get job applications
const applications = await prisma.jobApplication.findMany({
  where: {
    position_id: 'job-posting-id',
  },
  include: {
    applicant: true,
    interview_schedules: true,
  },
});
```

## Scripts

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema changes to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:reset` - Reset database and run migrations
- `pnpm db:deploy` - Deploy migrations to production

## Environment Variables

- `JOB_PORTAL_DATABASE_URL` - PostgreSQL connection string

## Database Features

### Job Posting Management
- Rich job descriptions with requirements and benefits
- Skills-based job matching
- Multiple employment types and work arrangements
- Application deadline management
- Featured and urgent job highlighting

### Application Process
- Multi-stage application workflow
- Document upload and management
- Interview and examination scheduling
- Assessment and evaluation system
- Application status tracking

### User Experience
- Job search and filtering
- Saved jobs and job alerts
- Profile management
- Skills and experience tracking
- Document management

### Analytics & Reporting
- Job view tracking
- Application analytics
- User engagement metrics
- Performance monitoring

## Contributing

1. Make changes to the Prisma schema
2. Generate migration: `pnpm db:migrate`
3. Update seed data if needed
4. Test your changes
5. Submit a pull request

## License

MIT




