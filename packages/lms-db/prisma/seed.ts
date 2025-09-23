import { PrismaClient } from '@prisma/client-lms';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding LMS database...');

  // Create system settings
  await prisma.systemSetting.createMany({
    data: [
      {
        key: 'site_name',
        value: 'Learning Management System',
        description: 'Name of the learning management system',
        category: 'general',
        isPublic: true,
      },
      {
        key: 'max_file_size',
        value: '10485760', // 10MB in bytes
        description: 'Maximum file upload size in bytes',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'allowed_file_types',
        value: 'pdf,doc,docx,ppt,pptx,jpg,jpeg,png,mp4,avi,mov',
        description: 'Allowed file types for uploads',
        category: 'uploads',
        isPublic: false,
      },
      {
        key: 'default_course_duration',
        value: '60',
        description: 'Default course duration in minutes',
        category: 'courses',
        isPublic: false,
      },
    ],
    skipDuplicates: true,
  });

  // Create sample instructor
  const instructor = await prisma.instructor.create({
    data: {
      userId: 'instructor-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      bio: 'Experienced software developer and educator with 10+ years in the industry.',
      expertise: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Database Design'],
      isVerified: true,
      isActive: true,
    },
  });

  // Create sample student
  const student = await prisma.student.create({
    data: {
      userId: 'student-001',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      interests: ['Web Development', 'Data Science', 'UI/UX Design'],
      learningGoals: ['Learn modern web development', 'Build portfolio projects'],
      isActive: true,
    },
  });

  // Create sample course
  const course = await prisma.course.create({
    data: {
      title: 'Complete Web Development Bootcamp',
      description: 'Learn modern web development from scratch with HTML, CSS, JavaScript, and React.',
      shortDescription: 'Master web development with this comprehensive course',
      objectives: [
        'Build responsive websites with HTML and CSS',
        'Create interactive web applications with JavaScript',
        'Develop modern React applications',
        'Understand backend development with Node.js',
        'Deploy applications to production'
      ],
      prerequisites: ['Basic computer skills', 'No prior programming experience required'],
      duration: 1200, // 20 hours
      level: 'Beginner',
      status: 'Published',
      category: 'Web Development',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      isPublic: true,
      isFree: true,
      instructorId: instructor.id,
      publishedAt: new Date(),
    },
  });

  // Create course modules
  const module1 = await prisma.courseModule.create({
    data: {
      courseId: course.id,
      title: 'HTML Fundamentals',
      description: 'Learn the basics of HTML structure and elements',
      order: 1,
      duration: 180, // 3 hours
      isPublished: true,
    },
  });

  const module2 = await prisma.courseModule.create({
    data: {
      courseId: course.id,
      title: 'CSS Styling',
      description: 'Master CSS for beautiful and responsive designs',
      order: 2,
      duration: 240, // 4 hours
      isPublished: true,
    },
  });

  // Create lessons for module 1
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module1.id,
        title: 'Introduction to HTML',
        description: 'Understanding HTML structure and basic elements',
        type: 'Video',
        order: 1,
        duration: 30,
        isPublished: true,
        isFree: true,
        videoUrl: 'https://example.com/videos/html-intro.mp4',
        videoDuration: 1800, // 30 minutes
      },
      {
        moduleId: module1.id,
        title: 'HTML Elements and Tags',
        description: 'Learn about different HTML elements and how to use them',
        type: 'Text',
        order: 2,
        duration: 45,
        isPublished: true,
        isFree: true,
        content: 'HTML uses tags to structure content...',
      },
      {
        moduleId: module1.id,
        title: 'HTML Forms',
        description: 'Creating interactive forms with HTML',
        type: 'Video',
        order: 3,
        duration: 60,
        isPublished: true,
        isFree: true,
        videoUrl: 'https://example.com/videos/html-forms.mp4',
        videoDuration: 3600, // 60 minutes
      },
    ],
  });

  // Create lessons for module 2
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module2.id,
        title: 'CSS Basics',
        description: 'Introduction to CSS styling',
        type: 'Video',
        order: 1,
        duration: 40,
        isPublished: true,
        isFree: true,
        videoUrl: 'https://example.com/videos/css-basics.mp4',
        videoDuration: 2400, // 40 minutes
      },
      {
        moduleId: module2.id,
        title: 'CSS Layouts',
        description: 'Understanding CSS layout techniques',
        type: 'Text',
        order: 2,
        duration: 50,
        isPublished: true,
        isFree: true,
        content: 'CSS provides several layout methods...',
      },
    ],
  });

  // Create enrollment
  await prisma.enrollment.create({
    data: {
      courseId: course.id,
      studentId: student.id,
      status: 'Enrolled',
      enrolledAt: new Date(),
      isPaid: false,
    },
  });

  // Create learning path
  const learningPath = await prisma.learningPath.create({
    data: {
      title: 'Full-Stack Developer Path',
      description: 'Complete path to become a full-stack developer',
      shortDescription: 'Master both frontend and backend development',
      category: 'Web Development',
      tags: ['Full-Stack', 'JavaScript', 'React', 'Node.js', 'Database'],
      level: 'Intermediate',
      status: 'Published',
      isPublic: true,
      isFree: true,
      estimatedDuration: 200, // 200 hours
      publishedAt: new Date(),
    },
  });

  // Add course to learning path
  await prisma.learningPathCourse.create({
    data: {
      learningPathId: learningPath.id,
      courseId: course.id,
      order: 1,
      isRequired: true,
    },
  });

  // Create learning path enrollment
  await prisma.learningPathEnrollment.create({
    data: {
      learningPathId: learningPath.id,
      studentId: student.id,
      status: 'Enrolled',
      enrolledAt: new Date(),
      isPaid: false,
    },
  });

  console.log('✅ LMS database seeded successfully!');
  console.log(`📚 Created course: ${course.title}`);
  console.log(`👨‍🏫 Created instructor: ${instructor.firstName} ${instructor.lastName}`);
  console.log(`👩‍🎓 Created student: ${student.firstName} ${student.lastName}`);
  console.log(`🛤️ Created learning path: ${learningPath.title}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding LMS database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
