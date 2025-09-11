import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (in reverse order of dependencies)
  console.log('🧹 Clearing existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.report.deleteMany();
  await prisma.approval.deleteMany();
  await prisma.document.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.employeeFeedback.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.employeeDocument.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.employeeSelfServiceProfile.deleteMany();
  await prisma.trainingParticipant.deleteMany();
  await prisma.trainingModule.deleteMany();
  await prisma.trainingProgram.deleteMany();
  await prisma.performanceEvaluation.deleteMany();
  await prisma.performanceReview.deleteMany();
  await prisma.certificateRequest.deleteMany();
  await prisma.applicantAssessment.deleteMany();
  await prisma.examinationSchedule.deleteMany();
  await prisma.interviewSchedule.deleteMany();
  await prisma.applicationDocument.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.jobApplicant.deleteMany();
  await prisma.jobPosting.deleteMany();
  await prisma.loanRecord.deleteMany();
  await prisma.deduction.deleteMany();
  await prisma.payrollRecord.deleteMany();
  await prisma.administrativeCase.deleteMany();
  await prisma.meritViolation.deleteMany();
  await prisma.personnelMovement.deleteMany();
  await prisma.overtimeRequest.deleteMany();
  await prisma.leaveMonetization.deleteMany();
  await prisma.leaveApplication.deleteMany();
  await prisma.leaveAdjustment.deleteMany();
  await prisma.leaveBalance.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.dtrAdjustmentRequest.deleteMany();
  await prisma.attendanceLog.deleteMany();
  await prisma.personnelSchedule.deleteMany();
  await prisma.workSchedule.deleteMany();
  await prisma.employmentHistory.deleteMany();
  await prisma.personnel.deleteMany();
  await prisma.jobTitle.deleteMany();
  await prisma.department.deleteMany();
  await prisma.userDocument.deleteMany();
  await prisma.user.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.systemModule.deleteMany();

  // Create System Settings
  console.log('⚙️ Creating system settings...');
  await prisma.systemSetting.createMany({
    data: [
      { setting_key: 'company_name', setting_value: 'Philippine Government Agency' },
      { setting_key: 'company_address', setting_value: '123 Government Center, Quezon City, Philippines' },
      { setting_key: 'company_phone', setting_value: '+63-2-1234-5678' },
      { setting_key: 'company_email', setting_value: 'info@govagency.ph' },
      { setting_key: 'max_leave_days', setting_value: '15' },
      { setting_key: 'working_hours_per_day', setting_value: '8' },
      { setting_key: 'overtime_rate', setting_value: '1.25' },
      { setting_key: 'tax_rate', setting_value: '0.20' },
      { setting_key: 'sss_rate', setting_value: '0.11' },
      { setting_key: 'pagibig_rate', setting_value: '0.02' },
      { setting_key: 'philhealth_rate', setting_value: '0.03' }
    ]
  });

  // Create System Modules
  console.log('📦 Creating system modules...');
  await prisma.systemModule.createMany({
    data: [
      { module_name: 'Personnel Information Management', is_active: true, can_be_disabled: false },
      { module_name: 'Leave Management', is_active: true, can_be_disabled: false },
      { module_name: 'Timekeeping & Attendance', is_active: true, can_be_disabled: false },
      { module_name: 'Payroll Management', is_active: true, can_be_disabled: false },
      { module_name: 'Performance Management', is_active: true, can_be_disabled: false },
      { module_name: 'Recruitment', is_active: true, can_be_disabled: false },
      { module_name: 'Job Portal Management', is_active: true, can_be_disabled: false },
      { module_name: 'Online Job Application Portal', is_active: true, can_be_disabled: false },
      { module_name: 'Health & Wellness', is_active: true, can_be_disabled: false },
      { module_name: 'Report Generation', is_active: true, can_be_disabled: false },
      { module_name: 'System Administration', is_active: true, can_be_disabled: false },
      { module_name: 'Employee Self Service', is_active: true, can_be_disabled: false }
    ]
  });

  // Create Departments
  console.log('🏢 Creating departments...');
  const departments = await prisma.department.createMany({
    data: [
      {
        department_name: 'Office of the Secretary',
        department_head: 'Secretary Juan Dela Cruz',
        description: 'Executive office of the agency',
        agency_code: 'AGY001',
        office_code: 'SEC001',
        is_plantilla_unit: true
      },
      {
        department_name: 'Human Resources Management Office',
        department_head: 'Director Maria Santos',
        description: 'Handles all HR functions',
        agency_code: 'AGY001',
        office_code: 'HRMO001',
        is_plantilla_unit: true
      },
      {
        department_name: 'Finance and Administration',
        department_head: 'Director Jose Garcia',
        description: 'Financial and administrative services',
        agency_code: 'AGY001',
        office_code: 'FAD001',
        is_plantilla_unit: true
      },
      {
        department_name: 'Information Technology Division',
        department_head: 'Chief Ana Rodriguez',
        description: 'IT services and support',
        agency_code: 'AGY001',
        office_code: 'ITD001',
        is_plantilla_unit: true
      },
      {
        department_name: 'Legal Division',
        department_head: 'Chief Legal Counsel Pedro Martinez',
        description: 'Legal services and compliance',
        agency_code: 'AGY001',
        office_code: 'LD001',
        is_plantilla_unit: true
      }
    ]
  });

  // Get department IDs for reference
  const deptList = await prisma.department.findMany();
  const officeOfSecretary = deptList.find(d => d.department_name === 'Office of the Secretary')!;
  const hrDepartment = deptList.find(d => d.department_name === 'Human Resources Management Office')!;
  const financeDepartment = deptList.find(d => d.department_name === 'Finance and Administration')!;
  const itDepartment = deptList.find(d => d.department_name === 'Information Technology Division')!;
  const legalDepartment = deptList.find(d => d.department_name === 'Legal Division')!;

  // Create Job Titles
  console.log('💼 Creating job titles...');
  const jobTitles = await prisma.jobTitle.createMany({
    data: [
      {
        title: 'Secretary',
        description: 'Head of the agency',
        employment_type: 'Plantilla',
        salary_grade: 'SG_30',
        position_classification: 'Executive_Managerial',
        plantilla_item_number: 'SEC-001',
        csc_eligibility_required: true,
        salary_min: 150000,
        salary_max: 200000,
        is_active: true
      },
      {
        title: 'Director III',
        description: 'Department Director',
        employment_type: 'Plantilla',
        salary_grade: 'SG_27',
        position_classification: 'Executive_Managerial',
        plantilla_item_number: 'DIR-001',
        csc_eligibility_required: true,
        salary_min: 120000,
        salary_max: 150000,
        is_active: true
      },
      {
        title: 'Chief Administrative Officer',
        description: 'Chief of administrative services',
        employment_type: 'Plantilla',
        salary_grade: 'SG_24',
        position_classification: 'Professional_Supervisory',
        plantilla_item_number: 'CAO-001',
        csc_eligibility_required: true,
        salary_min: 80000,
        salary_max: 100000,
        is_active: true
      },
      {
        title: 'Administrative Officer V',
        description: 'Senior administrative officer',
        employment_type: 'Plantilla',
        salary_grade: 'SG_18',
        position_classification: 'Professional_Non_Supervisory',
        plantilla_item_number: 'AO5-001',
        csc_eligibility_required: true,
        salary_min: 50000,
        salary_max: 65000,
        is_active: true
      },
      {
        title: 'Computer Programmer III',
        description: 'Senior programmer',
        employment_type: 'Plantilla',
        salary_grade: 'SG_18',
        position_classification: 'Professional_Non_Supervisory',
        plantilla_item_number: 'CP3-001',
        csc_eligibility_required: true,
        salary_min: 50000,
        salary_max: 65000,
        is_active: true
      },
      {
        title: 'Administrative Aide VI',
        description: 'Administrative support staff',
        employment_type: 'Plantilla',
        salary_grade: 'SG_6',
        position_classification: 'Sub_Professional_Non_Supervisory',
        plantilla_item_number: 'AA6-001',
        csc_eligibility_required: true,
        salary_min: 20000,
        salary_max: 25000,
        is_active: true
      }
    ]
  });

  // Get job title IDs
  const jobTitleList = await prisma.jobTitle.findMany();
  const secretaryTitle = jobTitleList.find(j => j.title === 'Secretary')!;
  const directorTitle = jobTitleList.find(j => j.title === 'Director III')!;
  const chiefTitle = jobTitleList.find(j => j.title === 'Chief Administrative Officer')!;
  const adminTitle = jobTitleList.find(j => j.title === 'Administrative Officer V')!;
  const programmerTitle = jobTitleList.find(j => j.title === 'Computer Programmer III')!;
  const aideTitle = jobTitleList.find(j => j.title === 'Administrative Aide VI')!;

  // Create Users
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 12);
  
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'secretary',
        email: 'secretary@govagency.ph',
        password_hash: hashedPassword,
        role: 'Admin',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'hr_director',
        email: 'hr.director@govagency.ph',
        password_hash: hashedPassword,
        role: 'HR',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'finance_director',
        email: 'finance.director@govagency.ph',
        password_hash: hashedPassword,
        role: 'Manager',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'it_chief',
        email: 'it.chief@govagency.ph',
        password_hash: hashedPassword,
        role: 'Manager',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'legal_chief',
        email: 'legal.chief@govagency.ph',
        password_hash: hashedPassword,
        role: 'Manager',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'admin_officer',
        email: 'admin.officer@govagency.ph',
        password_hash: hashedPassword,
        role: 'Employee',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'programmer',
        email: 'programmer@govagency.ph',
        password_hash: hashedPassword,
        role: 'Employee',
        status: 'Active',
        profile_picture: null
      },
      {
        username: 'clerk',
        email: 'clerk@govagency.ph',
        password_hash: hashedPassword,
        role: 'Employee',
        status: 'Active',
        profile_picture: null
      }
    ]
  });

  // Get user IDs
  const userList = await prisma.user.findMany();
  const secretaryUser = userList.find(u => u.username === 'secretary')!;
  const hrDirectorUser = userList.find(u => u.username === 'hr_director')!;
  const financeDirectorUser = userList.find(u => u.username === 'finance_director')!;
  const itChiefUser = userList.find(u => u.username === 'it_chief')!;
  const legalChiefUser = userList.find(u => u.username === 'legal_chief')!;
  const adminOfficerUser = userList.find(u => u.username === 'admin_officer')!;
  const programmerUser = userList.find(u => u.username === 'programmer')!;
  const clerkUser = userList.find(u => u.username === 'clerk')!;

  // Create Personnel Records
  console.log('👤 Creating personnel records...');
  const personnel = await prisma.personnel.createMany({
    data: [
      {
        user_id: secretaryUser.id,
        first_name: 'Juan',
        last_name: 'Dela Cruz',
        middle_name: 'Santos',
        date_of_birth: new Date('1970-05-15'),
        gender: 'Male',
        civil_status: 'Married',
        contact_number: '+63-917-123-4567',
        address: '123 Executive Village, Quezon City',
        department_id: officeOfSecretary.id,
        job_title_id: secretaryTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2020-01-15'),
        salary: 180000,
        gsis_number: 'GSIS-123456789',
        pagibig_number: 'PAGIBIG-123456789',
        philhealth_number: 'PHILHEALTH-123456789',
        sss_number: 'SSS-123456789',
        tin_number: 'TIN-123456789',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2015-06-15'),
        plantilla_item_number: 'SEC-001',
        agency_code: 'AGY001',
        office_code: 'SEC001'
      },
      {
        user_id: hrDirectorUser.id,
        first_name: 'Maria',
        last_name: 'Santos',
        middle_name: 'Garcia',
        date_of_birth: new Date('1975-08-20'),
        gender: 'Female',
        civil_status: 'Married',
        contact_number: '+63-917-234-5678',
        address: '456 HR Village, Makati City',
        department_id: hrDepartment.id,
        job_title_id: directorTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2018-03-01'),
        salary: 140000,
        gsis_number: 'GSIS-234567890',
        pagibig_number: 'PAGIBIG-234567890',
        philhealth_number: 'PHILHEALTH-234567890',
        sss_number: 'SSS-234567890',
        tin_number: 'TIN-234567890',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2010-09-20'),
        plantilla_item_number: 'DIR-001',
        agency_code: 'AGY001',
        office_code: 'HRMO001'
      },
      {
        user_id: financeDirectorUser.id,
        first_name: 'Jose',
        last_name: 'Garcia',
        middle_name: 'Reyes',
        date_of_birth: new Date('1972-12-10'),
        gender: 'Male',
        civil_status: 'Single',
        contact_number: '+63-917-345-6789',
        address: '789 Finance Street, Taguig City',
        department_id: financeDepartment.id,
        job_title_id: directorTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2019-06-15'),
        salary: 135000,
        gsis_number: 'GSIS-345678901',
        pagibig_number: 'PAGIBIG-345678901',
        philhealth_number: 'PHILHEALTH-345678901',
        sss_number: 'SSS-345678901',
        tin_number: 'TIN-345678901',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2012-03-10'),
        plantilla_item_number: 'DIR-002',
        agency_code: 'AGY001',
        office_code: 'FAD001'
      },
      {
        user_id: itChiefUser.id,
        first_name: 'Ana',
        last_name: 'Rodriguez',
        middle_name: 'Lopez',
        date_of_birth: new Date('1980-03-25'),
        gender: 'Female',
        civil_status: 'Married',
        contact_number: '+63-917-456-7890',
        address: '321 IT Avenue, Pasig City',
        department_id: itDepartment.id,
        job_title_id: chiefTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2021-01-10'),
        salary: 95000,
        gsis_number: 'GSIS-456789012',
        pagibig_number: 'PAGIBIG-456789012',
        philhealth_number: 'PHILHEALTH-456789012',
        sss_number: 'SSS-456789012',
        tin_number: 'TIN-456789012',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2018-11-25'),
        plantilla_item_number: 'CAO-001',
        agency_code: 'AGY001',
        office_code: 'ITD001'
      },
      {
        user_id: legalChiefUser.id,
        first_name: 'Pedro',
        last_name: 'Martinez',
        middle_name: 'Cruz',
        date_of_birth: new Date('1978-07-12'),
        gender: 'Male',
        civil_status: 'Married',
        contact_number: '+63-917-567-8901',
        address: '654 Legal Plaza, Mandaluyong City',
        department_id: legalDepartment.id,
        job_title_id: chiefTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2020-09-01'),
        salary: 90000,
        gsis_number: 'GSIS-567890123',
        pagibig_number: 'PAGIBIG-567890123',
        philhealth_number: 'PHILHEALTH-567890123',
        sss_number: 'SSS-567890123',
        tin_number: 'TIN-567890123',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2016-05-12'),
        plantilla_item_number: 'CAO-002',
        agency_code: 'AGY001',
        office_code: 'LD001'
      },
      {
        user_id: adminOfficerUser.id,
        first_name: 'Carmen',
        last_name: 'Lopez',
        middle_name: 'Diaz',
        date_of_birth: new Date('1985-11-30'),
        gender: 'Female',
        civil_status: 'Single',
        contact_number: '+63-917-678-9012',
        address: '987 Admin Road, Marikina City',
        department_id: hrDepartment.id,
        job_title_id: adminTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2022-02-15'),
        salary: 60000,
        gsis_number: 'GSIS-678901234',
        pagibig_number: 'PAGIBIG-678901234',
        philhealth_number: 'PHILHEALTH-678901234',
        sss_number: 'SSS-678901234',
        tin_number: 'TIN-678901234',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2020-08-30'),
        plantilla_item_number: 'AO5-001',
        agency_code: 'AGY001',
        office_code: 'HRMO001'
      },
      {
        user_id: programmerUser.id,
        first_name: 'Roberto',
        last_name: 'Cruz',
        middle_name: 'Mendoza',
        date_of_birth: new Date('1990-04-18'),
        gender: 'Male',
        civil_status: 'Single',
        contact_number: '+63-917-789-0123',
        address: '147 Programmer Lane, San Juan City',
        department_id: itDepartment.id,
        job_title_id: programmerTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2023-01-20'),
        salary: 55000,
        gsis_number: 'GSIS-789012345',
        pagibig_number: 'PAGIBIG-789012345',
        philhealth_number: 'PHILHEALTH-789012345',
        sss_number: 'SSS-789012345',
        tin_number: 'TIN-789012345',
        csc_eligibility: 'CSC-Professional',
        csc_eligibility_date: new Date('2022-10-18'),
        plantilla_item_number: 'CP3-001',
        agency_code: 'AGY001',
        office_code: 'ITD001'
      },
      {
        user_id: clerkUser.id,
        first_name: 'Elena',
        last_name: 'Reyes',
        middle_name: 'Torres',
        date_of_birth: new Date('1995-09-05'),
        gender: 'Female',
        civil_status: 'Single',
        contact_number: '+63-917-890-1234',
        address: '258 Clerk Street, Caloocan City',
        department_id: hrDepartment.id,
        job_title_id: aideTitle.id,
        employment_type: 'Plantilla',
        date_hired: new Date('2023-06-01'),
        salary: 22000,
        gsis_number: 'GSIS-890123456',
        pagibig_number: 'PAGIBIG-890123456',
        philhealth_number: 'PHILHEALTH-890123456',
        sss_number: 'SSS-890123456',
        tin_number: 'TIN-890123456',
        csc_eligibility: 'CSC-Sub-Professional',
        csc_eligibility_date: new Date('2023-03-05'),
        plantilla_item_number: 'AA6-001',
        agency_code: 'AGY001',
        office_code: 'HRMO001'
      }
    ]
  });

  // Create Leave Types
  console.log('🏖️ Creating leave types...');
  const leaveTypes = await prisma.leaveType.createMany({
    data: [
      {
        leave_type_name: 'Vacation Leave',
        description: 'Annual vacation leave',
        requires_document: false,
        max_days: 15,
        is_active: true
      },
      {
        leave_type_name: 'Sick Leave',
        description: 'Medical leave',
        requires_document: true,
        max_days: 15,
        is_active: true
      },
      {
        leave_type_name: 'Emergency Leave',
        description: 'Family emergency leave',
        requires_document: true,
        max_days: 5,
        is_active: true
      },
      {
        leave_type_name: 'Maternity Leave',
        description: 'Maternity leave for female employees',
        requires_document: true,
        max_days: 105,
        is_active: true
      },
      {
        leave_type_name: 'Paternity Leave',
        description: 'Paternity leave for male employees',
        requires_document: true,
        max_days: 7,
        is_active: true
      },
      {
        leave_type_name: 'Study Leave',
        description: 'Leave for educational purposes',
        requires_document: true,
        max_days: 30,
        is_active: true
      }
    ]
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log('- System Settings: 11');
  console.log('- System Modules: 12');
  console.log('- Departments: 5');
  console.log('- Job Titles: 6');
  console.log('- Users: 8');
  console.log('- Personnel Records: 8');
  console.log('- Leave Types: 6');
  console.log('\n🔑 Default login credentials:');
  console.log('Username: secretary | Password: password123 (Admin)');
  console.log('Username: hr_director | Password: password123 (HR)');
  console.log('Username: finance_director | Password: password123 (Manager)');
  console.log('Username: it_chief | Password: password123 (Manager)');
  console.log('Username: legal_chief | Password: password123 (Manager)');
  console.log('Username: admin_officer | Password: password123 (Employee)');
  console.log('Username: programmer | Password: password123 (Employee)');
  console.log('Username: clerk | Password: password123 (Employee)');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });