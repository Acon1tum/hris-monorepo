# HRIS System - Functional Requirements User Stories

## User Roles
- **Admin**: System administrator with full access to all modules and configurations
- **HR Manager**: Human Resources manager with access to employee data, policies, and HR processes
- **Manager**: Department/team manager with access to team member data and approval workflows
- **Employee**: Individual employee with access to personal data and self-service features
- **Applicant**: External job applicant with access to job portal and application features

---

## A. Personnel Information Management Module

### Admin User Stories
- **As an Admin**, I want to configure organizational structure (Functional Group, Office, Division, Unit) so that employee hierarchy is properly defined.
- **As an Admin**, I want to set up pay grade and salary tranche tables so that compensation structures are standardized.
- **As an Admin**, I want to configure position classifications and eligibility requirements so that job requirements are clearly defined.
- **As an Admin**, I want to manage budget codes and plantilla positions so that financial planning is accurate.
- **As an Admin**, I want to customize the Personal Data Sheet (PDS) form so that it complies with CSC requirements.
- **As an Admin**, I want to configure HR action workflows (promotion, transfer, reemployment, etc.) so that personnel actions are properly processed.
- **As an Admin**, I want to set up system-wide reporting templates so that standardized reports can be generated.

### HR Manager User Stories
- **As an HR Manager**, I want to maintain complete 201 files for all employees so that personnel records are comprehensive and up-to-date.
- **As an HR Manager**, I want to store and update employee personal details (name, address, contact information) so that records remain current.
- **As an HR Manager**, I want to manage employment and work experience details so that career history is accurately tracked.
- **As an HR Manager**, I want to record family background and educational details so that employee profiles are complete.
- **As an HR Manager**, I want to track eligibility and training records so that qualifications are properly documented.
- **As an HR Manager**, I want to maintain job-related information history (position, salary, allowances) so that career progression is tracked.
- **As an HR Manager**, I want to record administrative cases and disciplinary history so that employee conduct is properly documented.
- **As an HR Manager**, I want to process personnel actions (promotion, transfer, reemployment, etc.) so that HR transactions are completed efficiently.
- **As an HR Manager**, I want to generate service records and certificates so that employee documentation is readily available.
- **As an HR Manager**, I want to create personnel statistics and demographic reports so that workforce data is analyzed effectively.
- **As an HR Manager**, I want to manage plantilla and non-plantilla positions so that organizational structure is properly maintained.

### Manager User Stories
- **As a Manager**, I want to view my team members' personnel information so that I can understand their backgrounds and qualifications.
- **As a Manager**, I want to access team organizational structure (division, unit assignments) so that reporting relationships are clear.
- **As a Manager**, I want to view team position classifications and salary grades so that I understand compensation structures.
- **As a Manager**, I want to track team employment status and job levels so that I can manage workforce planning.
- **As a Manager**, I want to access team performance and disciplinary records so that I can provide appropriate guidance.

### Employee User Stories
- **As an Employee**, I want to view my Personal Data Sheet (PDS) so that I can verify my information is accurate.
- **As an Employee**, I want to update my personal details (address, contact information) so that my records remain current.
- **As an Employee**, I want to view my employment history and position details so that I can track my career progression.
- **As an Employee**, I want to access my educational and training records so that I can maintain my qualifications.
- **As an Employee**, I want to view my salary information and allowances so that I understand my compensation.
- **As an Employee**, I want to request certificates of employment and service records so that I can obtain official documentation.

---

## B. Attendance and Leave Credits Module

### Admin User Stories
- **As an Admin**, I want to configure biometric device integration so that attendance data is automatically captured.
- **As an Admin**, I want to set up work schedules and shift patterns so that different work arrangements are supported.
- **As an Admin**, I want to configure leave policies and credit calculations so that leave management is standardized.
- **As an Admin**, I want to set up holiday calendars and grace periods so that attendance rules are properly applied.
- **As an Admin**, I want to configure overtime and compensatory time policies so that additional work is properly compensated.
- **As an Admin**, I want to set up approval workflows for leave applications so that proper authorization is required.

### HR Manager User Stories
- **As an HR Manager**, I want to monitor daily attendance of all employees so that attendance compliance is tracked.
- **As an HR Manager**, I want to track tardiness and undertime so that attendance issues are identified and addressed.
- **As an HR Manager**, I want to manage leave credit balances so that employees' leave entitlements are accurate.
- **As an HR Manager**, I want to process leave applications and approvals so that leave requests are handled efficiently.
- **As an HR Manager**, I want to manage overtime authorization and recording so that additional work is properly documented.
- **As an HR Manager**, I want to process official business and personal passes so that employee movements are tracked.
- **As an HR Manager**, I want to handle compensatory day-off applications so that overtime compensation is properly managed.
- **As an HR Manager**, I want to generate attendance and leave reports so that workforce patterns are analyzed.
- **As an HR Manager**, I want to manage various leave types (sick, vacation, maternity, etc.) so that different leave needs are accommodated.
- **As an HR Manager**, I want to process leave monetization requests so that employees can convert leave credits to cash.

### Manager User Stories
- **As a Manager**, I want to view my team's daily attendance so that I can monitor punctuality and attendance.
- **As a Manager**, I want to approve or reject leave applications from my team so that I can manage workload and coverage.
- **As a Manager**, I want to view my team's leave balances so that I can encourage appropriate time off usage.
- **As a Manager**, I want to approve overtime requests from my team so that additional work is properly authorized.
- **As a Manager**, I want to view my team's attendance summaries so that I can address any attendance issues.
- **As a Manager**, I want to approve official business passes for my team so that work-related travel is authorized.

### Employee User Stories
- **As an Employee**, I want to clock in and out daily so that my working hours are accurately recorded.
- **As an Employee**, I want to view my daily time record so that I can verify my attendance.
- **As an Employee**, I want to apply for leave online so that I can request time off conveniently.
- **As an Employee**, I want to view my leave credit balance so that I can plan my time off.
- **As an Employee**, I want to track my leave application status so that I know when my time off is approved.
- **As an Employee**, I want to apply for overtime so that I can request compensation for additional work.
- **As an Employee**, I want to apply for official business passes so that I can conduct work-related travel.
- **As an Employee**, I want to apply for compensatory day-off so that I can use my overtime credits.
- **As an Employee**, I want to view my attendance history so that I can track my punctuality and attendance.

---

## C. Payroll Management Module

### Admin User Stories
- **As an Admin**, I want to configure payroll types (General, First, Last Pay, Allowances) so that different payment scenarios are supported.
- **As an Admin**, I want to set up salary grade and step tables so that compensation structures are standardized.
- **As an Admin**, I want to configure mandatory deductions (GSIS, PhilHealth, Pag-IBIG) so that government contributions are properly calculated.
- **As an Admin**, I want to set up allowance and benefit tables so that employee compensation is comprehensive.
- **As an Admin**, I want to configure tax tables and exemptions so that income tax calculations are accurate.
- **As an Admin**, I want to set up loan types and deduction schedules so that employee loans are properly managed.

### HR Manager User Stories
- **As an HR Manager**, I want to process monthly payroll so that employees are paid accurately and on time.
- **As an HR Manager**, I want to compute salaries with all deductions and benefits so that compensation is comprehensive.
- **As an HR Manager**, I want to process overtime claims so that additional work is properly compensated.
- **As an HR Manager**, I want to handle leave credit monetization so that employees can convert leave to cash.
- **As an HR Manager**, I want to prepare remittance reports for GSIS, PhilHealth, and Pag-IBIG so that government contributions are properly submitted.
- **As an HR Manager**, I want to process personnel vouchers for special payments so that various salary types are handled.
- **As an HR Manager**, I want to manage employee loans and deductions so that loan payments are properly processed.
- **As an HR Manager**, I want to generate payroll reports and certificates so that financial documentation is available.
- **As an HR Manager**, I want to handle salary adjustments and step increments so that compensation changes are properly processed.

### Manager User Stories
- **As a Manager**, I want to view my team's payroll summaries so that I can understand compensation within my department.
- **As a Manager**, I want to approve overtime payments for my team so that additional work is properly compensated.
- **As a Manager**, I want to access payroll reports for my team so that I can verify compensation accuracy.

### Employee User Stories
- **As an Employee**, I want to view my payslip online so that I can access my payment information anytime.
- **As an Employee**, I want to see my salary breakdown and deductions so that I understand my compensation.
- **As an Employee**, I want to view my loan balances and payment history so that I can track my financial obligations.
- **As an Employee**, I want to access my overtime payments so that I can verify additional compensation.
- **As an Employee**, I want to view my leave monetization payments so that I can track converted leave credits.

---

## D. Employee Self Service Module

### Admin User Stories
- **As an Admin**, I want to configure self-service portal settings so that employees have appropriate access.
- **As an Admin**, I want to set up dashboard content and announcements so that employees receive important information.
- **As an Admin**, I want to configure available self-service features so that employee capabilities are properly defined.

### HR Manager User Stories
- **As an HR Manager**, I want to manage employee self-service requests so that employee needs are addressed efficiently.
- **As an HR Manager**, I want to approve employee self-service applications so that requests are properly authorized.
- **As an HR Manager**, I want to monitor self-service usage so that I can identify areas for improvement.

### Manager User Stories
- **As a Manager**, I want to access my team's self-service information so that I can support their needs.
- **As a Manager**, I want to approve team member requests through self-service so that I can manage approvals efficiently.

### Employee User Stories
- **As an Employee**, I want to access a personalized dashboard so that I can see all my information in one place.
- **As an Employee**, I want to view news and announcements so that I stay informed about organizational updates.
- **As an Employee**, I want to see job openings so that I can explore career opportunities.
- **As an Employee**, I want to view training events so that I can participate in professional development.
- **As an Employee**, I want to apply for jobs online so that I can pursue career advancement.
- **As an Employee**, I want to join training events so that I can develop my skills.
- **As an Employee**, I want to submit leave applications online so that I can request time off conveniently.
- **As an Employee**, I want to apply for overtime online so that I can request additional work compensation.
- **As an Employee**, I want to request attendance corrections so that my time records are accurate.
- **As an Employee**, I want to view my payslips online so that I can access payment information.
- **As an Employee**, I want to check my loan balances so that I can track my financial obligations.
- **As an Employee**, I want to request certificates and documents so that I can obtain official records.
- **As an Employee**, I want to update my Personal Data Sheet so that my information remains current.
- **As an Employee**, I want to perform self-assessment reviews so that I can evaluate my performance.
- **As an Employee**, I want to submit incident reports so that I can report workplace issues.
- **As an Employee**, I want to provide feedback on HR services so that I can help improve processes.
- **As an Employee**, I want to access system help and documentation so that I can use the system effectively.

---

## E. Online Job Application Portal

### Admin User Stories
- **As an Admin**, I want to configure job application portal settings so that external and internal applicants can apply.
- **As an Admin**, I want to set up applicant registration and authentication so that access is properly controlled.
- **As an Admin**, I want to configure application workflow processes so that recruitment is standardized.

### HR Manager User Stories
- **As an HR Manager**, I want to publish job openings so that qualified candidates can apply.
- **As an HR Manager**, I want to manage applicant profiles and applications so that recruitment is organized.
- **As an HR Manager**, I want to track application status and progress so that recruitment is monitored.
- **As an HR Manager**, I want to process applications through workflow so that selection is systematic.
- **As an HR Manager**, I want to schedule interviews and examinations so that assessment is coordinated.
- **As an HR Manager**, I want to assess applicants and capture ratings so that selection is objective.
- **As an HR Manager**, I want to send notifications to applicants so that communication is maintained.
- **As an HR Manager**, I want to process appointments of selected candidates so that hiring is completed.
- **As an HR Manager**, I want to generate recruitment reports so that hiring activities are documented.

### Manager User Stories
- **As a Manager**, I want to view job openings in my department so that I can identify staffing needs.
- **As a Manager**, I want to participate in interview processes so that I can select suitable candidates.
- **As a Manager**, I want to provide input on candidate selection so that hiring decisions are informed.

### Employee User Stories
- **As an Employee**, I want to view internal job openings so that I can explore career opportunities.
- **As an Employee**, I want to apply for internal positions so that I can advance my career.
- **As an Employee**, I want to track my application status so that I know where I stand in the process.

### Applicant User Stories
- **As an Applicant**, I want to register for an account so that I can access the job portal.
- **As an Applicant**, I want to view published job openings so that I can find suitable positions.
- **As an Applicant**, I want to see job descriptions, qualifications, and salary information so that I can make informed decisions.
- **As an Applicant**, I want to create and manage my profile so that I can maintain my application information.
- **As an Applicant**, I want to search and filter job openings so that I can find relevant positions.
- **As an Applicant**, I want to apply for job positions online so that I can submit my application conveniently.
- **As an Applicant**, I want to upload required documents (resume, certificates, etc.) so that my application is complete.
- **As an Applicant**, I want to fill out the CSC Personal Data Sheet form so that my application meets government requirements.
- **As an Applicant**, I want to track my application status so that I know where I stand in the recruitment process.
- **As an Applicant**, I want to check my application status online so that I can monitor progress.
- **As an Applicant**, I want to cancel my application if needed so that I can withdraw from consideration.
- **As an Applicant**, I want to receive email notifications about my application so that I stay informed.
- **As an Applicant**, I want to update my application information so that my details remain current.
- **As an Applicant**, I want to view application deadlines so that I can submit on time.
- **As an Applicant**, I want to access help and FAQ sections so that I can use the portal effectively.

---

## F. Recruitment, Selection and Placement Module

### Admin User Stories
- **As an Admin**, I want to configure recruitment workflows so that hiring processes are standardized.
- **As an Admin**, I want to set up position classifications and requirements so that job postings are consistent.

### HR Manager User Stories
- **As an HR Manager**, I want to create job postings for plantilla and non-plantilla positions so that vacancies are advertised.
- **As an HR Manager**, I want to define job requirements and qualifications so that candidates know what's expected.
- **As an HR Manager**, I want to manage application deadlines and tracking so that recruitment is organized.
- **As an HR Manager**, I want to process applications through online workflow so that selection is systematic.
- **As an HR Manager**, I want to capture recruitment status and track progress so that hiring is monitored.
- **As an HR Manager**, I want to schedule interviews and examinations so that assessment is coordinated.
- **As an HR Manager**, I want to assess applicants and capture ratings so that selection is objective.
- **As an HR Manager**, I want to send notifications and regret letters so that communication is maintained.
- **As an HR Manager**, I want to process appointments of selected candidates so that hiring is completed.
- **As an HR Manager**, I want to integrate hired applicants into employee records so that onboarding is seamless.
- **As an HR Manager**, I want to assign work schedules and benefits to new hires so that they are properly set up.

### Manager User Stories
- **As a Manager**, I want to create job requisitions for my department so that staffing needs are addressed.
- **As a Manager**, I want to participate in candidate interviews so that I can select suitable team members.
- **As a Manager**, I want to provide feedback on candidates so that hiring decisions are informed.

### Employee User Stories
- **As an Employee**, I want to view job openings so that I can explore career opportunities.
- **As an Employee**, I want to apply for positions so that I can pursue career advancement.
- **As an Employee**, I want to track my application status so that I know where I stand in the process.

### Applicant User Stories
- **As an Applicant**, I want to view detailed job postings with requirements and qualifications so that I can assess my fit.
- **As an Applicant**, I want to see salary ranges and benefits information so that I can evaluate compensation.
- **As an Applicant**, I want to understand the application process and timeline so that I can plan accordingly.
- **As an Applicant**, I want to submit my application with all required documents so that I can be considered for the position.
- **As an Applicant**, I want to receive confirmation of my application submission so that I know it was received.
- **As an Applicant**, I want to be notified of interview schedules so that I can prepare and attend.
- **As an Applicant**, I want to receive feedback on my application status so that I can understand the outcome.
- **As an Applicant**, I want to withdraw my application if I change my mind so that I can remove myself from consideration.

---

## G. Learning and Development (L&D) Module

### Admin User Stories
- **As an Admin**, I want to configure L&D module settings so that learning programs are properly managed.
- **As an Admin**, I want to set up competency frameworks so that development targets are standardized.

### HR Manager User Stories
- **As an HR Manager**, I want to create Individual Development Plans so that employee growth is planned.
- **As an HR Manager**, I want to set up competency targets and learning objectives so that development is focused.
- **As an HR Manager**, I want to manage training opportunities and events so that learning is organized.
- **As an HR Manager**, I want to record training schedules and participants so that attendance is tracked.
- **As an HR Manager**, I want to capture training evaluations and results so that effectiveness is measured.
- **As an HR Manager**, I want to manage scholarship programs so that educational opportunities are available.
- **As an HR Manager**, I want to handle foreign travel opportunities so that international learning is supported.
- **As an HR Manager**, I want to generate L&D reports so that learning activities are documented.

### Manager User Stories
- **As a Manager**, I want to create development plans for my team so that their growth is supported.
- **As a Manager**, I want to nominate team members for training so that their skills are developed.
- **As a Manager**, I want to track team training progress so that development is monitored.

### Employee User Stories
- **As an Employee**, I want to view available training opportunities so that I can develop my skills.
- **As an Employee**, I want to enroll in training events so that I can participate in learning.
- **As an Employee**, I want to track my training history so that I can maintain my development records.
- **As an Employee**, I want to apply for scholarships so that I can pursue advanced education.
- **As an Employee**, I want to apply for foreign travel opportunities so that I can gain international experience.

---

## H. Rewards and Recognition Module

### Admin User Stories
- **As an Admin**, I want to configure awards and recognition programs so that employee achievements are celebrated.
- **As an Admin**, I want to set up recognition criteria and processes so that awards are fair and consistent.

### HR Manager User Stories
- **As an HR Manager**, I want to record awards and recognition given so that achievements are documented.
- **As an HR Manager**, I want to manage award nominations so that deserving employees are recognized.
- **As an HR Manager**, I want to capture nominee details and accomplishments so that recognition is based on merit.
- **As an HR Manager**, I want to process award selections so that recognition is properly awarded.
- **As an HR Manager**, I want to generate recognition reports so that awards are documented.

### Manager User Stories
- **As a Manager**, I want to nominate team members for awards so that their achievements are recognized.
- **As a Manager**, I want to view team recognition history so that I can celebrate accomplishments.

### Employee User Stories
- **As an Employee**, I want to view available awards and recognition so that I can understand opportunities.
- **As an Employee**, I want to view my recognition history so that I can track my achievements.

---

## I. Performance Management Module

### Admin User Stories
- **As an Admin**, I want to configure performance management settings so that evaluations are standardized.
- **As an Admin**, I want to set up performance rating scales so that assessments are consistent.

### HR Manager User Stories
- **As an HR Manager**, I want to manage Individual Performance Commitment and Review (IPCR) so that individual goals are set.
- **As an HR Manager**, I want to handle Division Performance Commitment and Review (DPCR) so that team goals are established.
- **As an HR Manager**, I want to process Office Performance Commitment and Review (OPCR) so that organizational goals are aligned.
- **As an HR Manager**, I want to manage performance accomplishment reviews so that achievements are documented.
- **As an HR Manager**, I want to track competency self-assessments so that skills are evaluated.
- **As an HR Manager**, I want to monitor attendance and behavioral assessments so that conduct is evaluated.
- **As an HR Manager**, I want to record monitoring and coaching sessions so that development is supported.
- **As an HR Manager**, I want to review and approve Individual Development Plans so that growth is planned.
- **As an HR Manager**, I want to generate performance reports so that evaluations are documented.

### Manager User Stories
- **As a Manager**, I want to conduct performance reviews for my team so that I can assess their work.
- **As a Manager**, I want to set performance goals and commitments so that expectations are clear.
- **As a Manager**, I want to provide coaching and feedback so that my team can improve.
- **As a Manager**, I want to track team performance progress so that development is monitored.

### Employee User Stories
- **As an Employee**, I want to view my performance commitments so that I understand what's expected.
- **As an Employee**, I want to complete self-assessments so that I can evaluate my own performance.
- **As an Employee**, I want to view my performance ratings so that I can track my progress.
- **As an Employee**, I want to participate in performance reviews so that I can discuss my development.

---

## J. Health and Wellness Module

### Admin User Stories
- **As an Admin**, I want to configure health and wellness programs so that employee well-being is supported.
- **As an Admin**, I want to set up medical services and supplies tracking so that health resources are managed.

### HR Manager User Stories
- **As an HR Manager**, I want to record health and wellness activities so that programs are documented.
- **As an HR Manager**, I want to track participant lists so that engagement is monitored.
- **As an HR Manager**, I want to record medical services and supplies so that health resources are tracked.
- **As an HR Manager**, I want to maintain sick leave history so that health patterns are monitored.
- **As an HR Manager**, I want to generate health and wellness reports so that programs are evaluated.

### Manager User Stories
- **As a Manager**, I want to view my team's health and wellness participation so that I can encourage engagement.
- **As a Manager**, I want to track team sick leave patterns so that I can address health concerns.

### Employee User Stories
- **As an Employee**, I want to view available health and wellness activities so that I can participate.
- **As an Employee**, I want to register for wellness programs so that I can improve my health.
- **As an Employee**, I want to view my medical services history so that I can track my health records.

---

## K. Forms and Workflow Module

### Admin User Stories
- **As an Admin**, I want to design custom forms so that HR processes are automated.
- **As an Admin**, I want to configure workflow processes so that approvals are streamlined.
- **As an Admin**, I want to set up approver escalation so that processes don't get stuck.
- **As an Admin**, I want to configure digital signature capabilities so that approvals are secure.

### HR Manager User Stories
- **As an HR Manager**, I want to create workflow forms so that HR processes are standardized.
- **As an HR Manager**, I want to assign approvers and reviewers so that processes are properly authorized.
- **As an HR Manager**, I want to monitor workflow progress so that processes are tracked.
- **As an HR Manager**, I want to handle workflow escalations so that delays are prevented.

### Manager User Stories
- **As a Manager**, I want to approve workflow requests so that my team's needs are addressed.
- **As a Manager**, I want to view workflow status so that I can track progress.

### Employee User Stories
- **As an Employee**, I want to submit workflow requests so that I can access HR services.
- **As an Employee**, I want to track my request status so that I know where things stand.

---

## L. Data Visualization Module

### Admin User Stories
- **As an Admin**, I want to configure dashboard settings so that data visualization is customized.
- **As an Admin**, I want to set up real-time data feeds so that information is current.

### HR Manager User Stories
- **As an HR Manager**, I want to view real-time dashboards so that I can monitor HR metrics.
- **As an HR Manager**, I want to generate data analytics reports so that trends are identified.
- **As an HR Manager**, I want to visualize workforce demographics so that composition is understood.
- **As an HR Manager**, I want to analyze performance data so that patterns are identified.
- **As an HR Manager**, I want to view payroll analytics so that compensation trends are tracked.

### Manager User Stories
- **As a Manager**, I want to view team performance dashboards so that I can monitor my department.
- **As a Manager**, I want to access team analytics so that I can make data-driven decisions.

### Employee User Stories
- **As an Employee**, I want to view my personal dashboard so that I can see my information at a glance.
- **As an Employee**, I want to access my performance metrics so that I can track my progress.

---

This comprehensive set of user stories covers all the specific functional requirements outlined in the HRIS system specification, organized by module and user role. Each user story is designed to address the specific capabilities and features required for each module while ensuring that all user types (Admin, HR Manager, Manager, Employee, and Applicant) have appropriate access and functionality.
