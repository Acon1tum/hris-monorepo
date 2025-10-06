"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseLevel = exports.CourseStatus = exports.RequestType = exports.EvaluationStatus = exports.FeedbackStatus = exports.FeedbackType = exports.ParticipantStatus = exports.TrainingStatus = exports.ReviewStatus = exports.RequestStatus = exports.CertificateType = exports.Recommendation = exports.ExamResult = exports.ExamStatus = exports.InterviewStatus = exports.InterviewType = exports.ApplicationStatus = exports.PostingStatus = exports.LoanStatus = exports.LoanType = exports.PaymentStatus = exports.CaseStatus = exports.RecordType = exports.MovementType = exports.ApprovalStatus = exports.AttendanceStatus = exports.PositionClassification = exports.SalaryGrade = exports.EmploymentType = exports.CivilStatus = exports.Gender = exports.Status = exports.RoleType = void 0;
// Enums from Prisma schema
var RoleType;
(function (RoleType) {
    RoleType["Admin"] = "Admin";
    RoleType["HR"] = "HR";
    RoleType["Employee"] = "Employee";
    RoleType["Manager"] = "Manager";
    RoleType["Applicant"] = "Applicant";
})(RoleType || (exports.RoleType = RoleType = {}));
var Status;
(function (Status) {
    Status["Active"] = "Active";
    Status["Inactive"] = "Inactive";
})(Status || (exports.Status = Status = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
var CivilStatus;
(function (CivilStatus) {
    CivilStatus["Single"] = "Single";
    CivilStatus["Married"] = "Married";
    CivilStatus["Divorced"] = "Divorced";
    CivilStatus["Widowed"] = "Widowed";
})(CivilStatus || (exports.CivilStatus = CivilStatus = {}));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["Casual"] = "Casual";
    EmploymentType["Contractual"] = "Contractual";
    EmploymentType["Contract_Of_Service"] = "Contract_Of_Service";
    EmploymentType["Plantilla"] = "Plantilla";
})(EmploymentType || (exports.EmploymentType = EmploymentType = {}));
var SalaryGrade;
(function (SalaryGrade) {
    SalaryGrade["SG_1"] = "SG_1";
    SalaryGrade["SG_2"] = "SG_2";
    SalaryGrade["SG_3"] = "SG_3";
    SalaryGrade["SG_4"] = "SG_4";
    SalaryGrade["SG_5"] = "SG_5";
    SalaryGrade["SG_6"] = "SG_6";
    SalaryGrade["SG_7"] = "SG_7";
    SalaryGrade["SG_8"] = "SG_8";
    SalaryGrade["SG_9"] = "SG_9";
    SalaryGrade["SG_10"] = "SG_10";
    SalaryGrade["SG_11"] = "SG_11";
    SalaryGrade["SG_12"] = "SG_12";
    SalaryGrade["SG_13"] = "SG_13";
    SalaryGrade["SG_14"] = "SG_14";
    SalaryGrade["SG_15"] = "SG_15";
    SalaryGrade["SG_16"] = "SG_16";
    SalaryGrade["SG_17"] = "SG_17";
    SalaryGrade["SG_18"] = "SG_18";
    SalaryGrade["SG_19"] = "SG_19";
    SalaryGrade["SG_20"] = "SG_20";
    SalaryGrade["SG_21"] = "SG_21";
    SalaryGrade["SG_22"] = "SG_22";
    SalaryGrade["SG_23"] = "SG_23";
    SalaryGrade["SG_24"] = "SG_24";
    SalaryGrade["SG_25"] = "SG_25";
    SalaryGrade["SG_26"] = "SG_26";
    SalaryGrade["SG_27"] = "SG_27";
    SalaryGrade["SG_28"] = "SG_28";
    SalaryGrade["SG_29"] = "SG_29";
    SalaryGrade["SG_30"] = "SG_30";
    SalaryGrade["SG_31"] = "SG_31";
    SalaryGrade["SG_32"] = "SG_32";
    SalaryGrade["SG_33"] = "SG_33";
})(SalaryGrade || (exports.SalaryGrade = SalaryGrade = {}));
var PositionClassification;
(function (PositionClassification) {
    PositionClassification["Professional_Supervisory"] = "Professional_Supervisory";
    PositionClassification["Professional_Non_Supervisory"] = "Professional_Non_Supervisory";
    PositionClassification["Sub_Professional_Supervisory"] = "Sub_Professional_Supervisory";
    PositionClassification["Sub_Professional_Non_Supervisory"] = "Sub_Professional_Non_Supervisory";
    PositionClassification["Executive_Managerial"] = "Executive_Managerial";
    PositionClassification["Clerical"] = "Clerical";
    PositionClassification["Trades_Crafts_Labor"] = "Trades_Crafts_Labor";
})(PositionClassification || (exports.PositionClassification = PositionClassification = {}));
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["Present"] = "Present";
    AttendanceStatus["Absent"] = "Absent";
    AttendanceStatus["Late"] = "Late";
    AttendanceStatus["On_Leave"] = "On_Leave";
    AttendanceStatus["Work_From_Home"] = "Work_From_Home";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["Pending"] = "Pending";
    ApprovalStatus["Approved"] = "Approved";
    ApprovalStatus["Rejected"] = "Rejected";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var MovementType;
(function (MovementType) {
    MovementType["Promotion"] = "Promotion";
    MovementType["Transfer"] = "Transfer";
    MovementType["Re_employment"] = "Re_employment";
    MovementType["Reinstatement"] = "Reinstatement";
    MovementType["Voluntary_Demotion"] = "Voluntary_Demotion";
    MovementType["Disciplinary_Demotion"] = "Disciplinary_Demotion";
    MovementType["Reclassification"] = "Reclassification";
    MovementType["Reassignment"] = "Reassignment";
    MovementType["Detail"] = "Detail";
    MovementType["Designation"] = "Designation";
    MovementType["Probationary_Period"] = "Probationary_Period";
    MovementType["Item_Number_Change"] = "Item_Number_Change";
    MovementType["Step_Increment"] = "Step_Increment";
    MovementType["Salary_Adjustment"] = "Salary_Adjustment";
    MovementType["Reinstatement_Same_Position"] = "Reinstatement_Same_Position";
})(MovementType || (exports.MovementType = MovementType = {}));
var RecordType;
(function (RecordType) {
    RecordType["Merit"] = "Merit";
    RecordType["Violation"] = "Violation";
})(RecordType || (exports.RecordType = RecordType = {}));
var CaseStatus;
(function (CaseStatus) {
    CaseStatus["Filed"] = "Filed";
    CaseStatus["Under_Investigation"] = "Under_Investigation";
    CaseStatus["Resolved"] = "Resolved";
    CaseStatus["Dismissed"] = "Dismissed";
    CaseStatus["Appealed"] = "Appealed";
})(CaseStatus || (exports.CaseStatus = CaseStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "Pending";
    PaymentStatus["Processed"] = "Processed";
    PaymentStatus["Disbursed"] = "Disbursed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var LoanType;
(function (LoanType) {
    LoanType["Consolidated"] = "Consolidated";
    LoanType["Policy"] = "Policy";
    LoanType["Multi_Purpose"] = "Multi_Purpose";
    LoanType["Other"] = "Other";
})(LoanType || (exports.LoanType = LoanType = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["Active"] = "Active";
    LoanStatus["Fully_Paid"] = "Fully_Paid";
    LoanStatus["Delinquent"] = "Delinquent";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var PostingStatus;
(function (PostingStatus) {
    PostingStatus["Draft"] = "Draft";
    PostingStatus["Published"] = "Published";
    PostingStatus["Closed"] = "Closed";
    PostingStatus["Filled"] = "Filled";
})(PostingStatus || (exports.PostingStatus = PostingStatus = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["Pending"] = "Pending";
    ApplicationStatus["Pre_Screening"] = "Pre_Screening";
    ApplicationStatus["For_Interview"] = "For_Interview";
    ApplicationStatus["For_Examination"] = "For_Examination";
    ApplicationStatus["Shortlisted"] = "Shortlisted";
    ApplicationStatus["Selected"] = "Selected";
    ApplicationStatus["Rejected"] = "Rejected";
    ApplicationStatus["Withdrawn"] = "Withdrawn";
    ApplicationStatus["Hired"] = "Hired";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var InterviewType;
(function (InterviewType) {
    InterviewType["Phone"] = "Phone";
    InterviewType["Video"] = "Video";
    InterviewType["On_Site"] = "On_Site";
})(InterviewType || (exports.InterviewType = InterviewType = {}));
var InterviewStatus;
(function (InterviewStatus) {
    InterviewStatus["Scheduled"] = "Scheduled";
    InterviewStatus["Completed"] = "Completed";
    InterviewStatus["Cancelled"] = "Cancelled";
})(InterviewStatus || (exports.InterviewStatus = InterviewStatus = {}));
var ExamStatus;
(function (ExamStatus) {
    ExamStatus["Scheduled"] = "Scheduled";
    ExamStatus["Completed"] = "Completed";
    ExamStatus["Cancelled"] = "Cancelled";
})(ExamStatus || (exports.ExamStatus = ExamStatus = {}));
var ExamResult;
(function (ExamResult) {
    ExamResult["Passed"] = "Passed";
    ExamResult["Failed"] = "Failed";
    ExamResult["Pending"] = "Pending";
})(ExamResult || (exports.ExamResult = ExamResult = {}));
var Recommendation;
(function (Recommendation) {
    Recommendation["Hire"] = "Hire";
    Recommendation["Consider"] = "Consider";
    Recommendation["Reject"] = "Reject";
})(Recommendation || (exports.Recommendation = Recommendation = {}));
var CertificateType;
(function (CertificateType) {
    CertificateType["Employment"] = "Employment";
    CertificateType["Contribution"] = "Contribution";
    CertificateType["Service_Record"] = "Service_Record";
    CertificateType["Other"] = "Other";
})(CertificateType || (exports.CertificateType = CertificateType = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Pending"] = "Pending";
    RequestStatus["Processing"] = "Processing";
    RequestStatus["Completed"] = "Completed";
    RequestStatus["Rejected"] = "Rejected";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["Draft"] = "Draft";
    ReviewStatus["Submitted"] = "Submitted";
    ReviewStatus["Reviewed"] = "Reviewed";
    ReviewStatus["Acknowledged"] = "Acknowledged";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
var TrainingStatus;
(function (TrainingStatus) {
    TrainingStatus["Planned"] = "Planned";
    TrainingStatus["Ongoing"] = "Ongoing";
    TrainingStatus["Completed"] = "Completed";
    TrainingStatus["Cancelled"] = "Cancelled";
})(TrainingStatus || (exports.TrainingStatus = TrainingStatus = {}));
var ParticipantStatus;
(function (ParticipantStatus) {
    ParticipantStatus["Enrolled"] = "Enrolled";
    ParticipantStatus["Completed"] = "Completed";
    ParticipantStatus["Failed"] = "Failed";
    ParticipantStatus["Dropped"] = "Dropped";
})(ParticipantStatus || (exports.ParticipantStatus = ParticipantStatus = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType["System"] = "System";
    FeedbackType["HR_Service"] = "HR_Service";
    FeedbackType["Management"] = "Management";
    FeedbackType["Work_Environment"] = "Work_Environment";
    FeedbackType["Other"] = "Other";
})(FeedbackType || (exports.FeedbackType = FeedbackType = {}));
var FeedbackStatus;
(function (FeedbackStatus) {
    FeedbackStatus["New"] = "New";
    FeedbackStatus["Under_Review"] = "Under_Review";
    FeedbackStatus["Addressed"] = "Addressed";
    FeedbackStatus["Closed"] = "Closed";
})(FeedbackStatus || (exports.FeedbackStatus = FeedbackStatus = {}));
var EvaluationStatus;
(function (EvaluationStatus) {
    EvaluationStatus["Draft"] = "Draft";
    EvaluationStatus["Submitted"] = "Submitted";
    EvaluationStatus["Reviewed"] = "Reviewed";
    EvaluationStatus["Finalized"] = "Finalized";
})(EvaluationStatus || (exports.EvaluationStatus = EvaluationStatus = {}));
var RequestType;
(function (RequestType) {
    RequestType["Leave"] = "Leave";
    RequestType["Payroll"] = "Payroll";
    RequestType["Recruitment"] = "Recruitment";
})(RequestType || (exports.RequestType = RequestType = {}));
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["Draft"] = "Draft";
    CourseStatus["Published"] = "Published";
    CourseStatus["Archived"] = "Archived";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["Beginner"] = "Beginner";
    CourseLevel["Intermediate"] = "Intermediate";
    CourseLevel["Advanced"] = "Advanced";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
//# sourceMappingURL=common.js.map