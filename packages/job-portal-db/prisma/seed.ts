import { PrismaClient, RoleType, EmploymentType, PostingStatus, JobCategory, WorkArrangement, ExperienceLevel, EducationLevel } from '@prisma/client-job';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding job portal database...');

  // Create departments
  const hrDept = await prisma.department.create({
    data: {
      department_name: 'Human Resources',
      description: 'Handles recruitment, employee relations, and HR policies',
      agency_code: 'HR001',
      office_code: 'HR-001',
    },
  });

  const itDept = await prisma.department.create({
    data: {
      department_name: 'Information Technology',
      description: 'Manages IT infrastructure and software development',
      agency_code: 'IT001',
      office_code: 'IT-001',
    },
  });

  // Create job titles
  const hrManager = await prisma.jobTitle.create({
    data: {
      title: 'HR Manager',
      description: 'Oversees human resources operations and policies',
      employment_type: EmploymentType.Plantilla,
      salary_grade: 'SG_18',
      position_classification: 'Professional_Supervisory',
      salary_min: 50000,
      salary_max: 70000,
    },
  });

  const softwareDev = await prisma.jobTitle.create({
    data: {
      title: 'Software Developer',
      description: 'Develops and maintains software applications',
      employment_type: EmploymentType.Contractual,
      salary_grade: 'SG_15',
      position_classification: 'Professional_Non_Supervisory',
      salary_min: 35000,
      salary_max: 50000,
    },
  });

  // Create skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: {
        skill_name: 'JavaScript',
        category: 'Programming',
        description: 'JavaScript programming language',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'TypeScript',
        category: 'Programming',
        description: 'TypeScript programming language',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'React',
        category: 'Frontend',
        description: 'React.js library for building user interfaces',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'Node.js',
        category: 'Backend',
        description: 'Node.js runtime environment',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'PostgreSQL',
        category: 'Database',
        description: 'PostgreSQL database management system',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'Human Resources Management',
        category: 'Management',
        description: 'HR management and employee relations',
      },
    }),
    prisma.skill.create({
      data: {
        skill_name: 'Recruitment',
        category: 'HR',
        description: 'Talent acquisition and recruitment processes',
      },
    }),
  ]);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password_hash: '$2b$10$example.hash', // This should be properly hashed
      email: 'admin@company.com',
      role: RoleType.Admin,
    },
  });

  // Create HR user
  const hrUser = await prisma.user.create({
    data: {
      username: 'hr_manager',
      password_hash: '$2b$10$example.hash', // This should be properly hashed
      email: 'hr@company.com',
      role: RoleType.HR,
    },
  });

  // Create personnel records
  const adminPersonnel = await prisma.personnel.create({
    data: {
      user_id: adminUser.id,
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@company.com',
      employment_type: EmploymentType.Plantilla,
      salary: 60000,
      department_id: hrDept.id,
      job_title_id: hrManager.id,
    },
  });

  const hrPersonnel = await prisma.personnel.create({
    data: {
      user_id: hrUser.id,
      first_name: 'HR',
      last_name: 'Manager',
      email: 'hr@company.com',
      employment_type: EmploymentType.Plantilla,
      salary: 55000,
      department_id: hrDept.id,
      job_title_id: hrManager.id,
    },
  });

  // Create job postings
  const jobPosting1 = await prisma.jobPosting.create({
    data: {
      job_title_id: softwareDev.id,
      department_id: itDept.id,
      job_description: 'We are looking for a skilled Software Developer to join our IT team. You will be responsible for developing and maintaining web applications using modern technologies.',
      qualifications: 'Bachelor\'s degree in Computer Science or related field, 3+ years of experience in web development',
      technical_competencies: 'JavaScript, TypeScript, React, Node.js, PostgreSQL',
      salary_range: '₱35,000 - ₱50,000',
      employment_type: EmploymentType.Contractual,
      work_arrangement: WorkArrangement.Hybrid,
      experience_level: ExperienceLevel.Mid_Level,
      education_level: EducationLevel.Bachelor,
      num_vacancies: 2,
      application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      posting_status: PostingStatus.Published,
      job_category: JobCategory.Information_Technology,
      location: 'Metro Manila',
      benefits: 'Health insurance, 13th month pay, vacation leave',
      requirements: '3+ years experience, portfolio of previous work',
      responsibilities: 'Develop web applications, maintain existing systems, collaborate with team',
      skills_required: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      tags: ['web-development', 'javascript', 'react', 'nodejs'],
      is_featured: true,
      created_by: adminUser.id,
    },
  });

  const jobPosting2 = await prisma.jobPosting.create({
    data: {
      job_title_id: hrManager.id,
      department_id: hrDept.id,
      job_description: 'We are seeking an experienced HR Manager to lead our human resources department and oversee all HR operations.',
      qualifications: 'Bachelor\'s degree in Human Resources or related field, 5+ years of HR experience',
      technical_competencies: 'HR Management, Recruitment, Employee Relations, Labor Law',
      salary_range: '₱50,000 - ₱70,000',
      employment_type: EmploymentType.Plantilla,
      work_arrangement: WorkArrangement.On_Site,
      experience_level: ExperienceLevel.Senior_Level,
      education_level: EducationLevel.Bachelor,
      num_vacancies: 1,
      application_deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      posting_status: PostingStatus.Published,
      job_category: JobCategory.Human_Resources,
      location: 'Quezon City',
      benefits: 'Health insurance, 13th month pay, vacation leave, performance bonus',
      requirements: '5+ years HR experience, knowledge of labor laws',
      responsibilities: 'Manage HR team, oversee recruitment, handle employee relations',
      skills_required: ['Human Resources Management', 'Recruitment', 'Employee Relations'],
      tags: ['hr', 'management', 'recruitment'],
      is_featured: false,
      created_by: adminUser.id,
    },
  });

  // Add job skills
  await Promise.all([
    prisma.jobSkill.create({
      data: {
        job_posting_id: jobPosting1.id,
        skill_id: skills[0].id, // JavaScript
        is_required: true,
        skill_level: 'Advanced',
        years_required: 3,
      },
    }),
    prisma.jobSkill.create({
      data: {
        job_posting_id: jobPosting1.id,
        skill_id: skills[1].id, // TypeScript
        is_required: true,
        skill_level: 'Intermediate',
        years_required: 2,
      },
    }),
    prisma.jobSkill.create({
      data: {
        job_posting_id: jobPosting1.id,
        skill_id: skills[2].id, // React
        is_required: true,
        skill_level: 'Advanced',
        years_required: 3,
      },
    }),
    prisma.jobSkill.create({
      data: {
        job_posting_id: jobPosting2.id,
        skill_id: skills[5].id, // Human Resources Management
        is_required: true,
        skill_level: 'Expert',
        years_required: 5,
      },
    }),
    prisma.jobSkill.create({
      data: {
        job_posting_id: jobPosting2.id,
        skill_id: skills[6].id, // Recruitment
        is_required: true,
        skill_level: 'Advanced',
        years_required: 3,
      },
    }),
  ]);

  // Create system settings
  await prisma.systemSetting.createMany({
    data: [
      {
        setting_key: 'job_portal_name',
        setting_value: 'HRIS Job Portal',
        description: 'Name of the job portal system',
        is_public: true,
      },
      {
        setting_key: 'max_file_size',
        setting_value: '10485760', // 10MB
        description: 'Maximum file size for document uploads in bytes',
        is_public: false,
      },
      {
        setting_key: 'allowed_file_types',
        setting_value: 'pdf,doc,docx,jpg,jpeg,png',
        description: 'Comma-separated list of allowed file types for uploads',
        is_public: false,
      },
      {
        setting_key: 'application_deadline_buffer',
        setting_value: '7',
        description: 'Number of days before deadline to send reminders',
        is_public: false,
      },
    ],
  });

  console.log('✅ Job portal database seeded successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${await prisma.department.count()} departments`);
  console.log(`   - ${await prisma.jobTitle.count()} job titles`);
  console.log(`   - ${await prisma.skill.count()} skills`);
  console.log(`   - ${await prisma.user.count()} users`);
  console.log(`   - ${await prisma.personnel.count()} personnel records`);
  console.log(`   - ${await prisma.jobPosting.count()} job postings`);
  console.log(`   - ${await prisma.systemSetting.count()} system settings`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



