import { BaseEntity, Gender, CivilStatus, EmploymentType, SalaryGrade, PositionClassification } from './common';

export interface Personnel extends BaseEntity {
  userId?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  jobTitleId?: string;
  employmentType: EmploymentType;
  dateHired?: Date;
  salary: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  cscEligibility?: string;
  cscEligibilityDate?: Date;
  plantillaItemNumber?: string;
  agencyCode?: string;
  officeCode?: string;
}

export interface Department extends BaseEntity {
  departmentName: string;
  departmentHead?: string;
  parentDepartmentId?: string;
  description?: string;
  agencyCode?: string;
  officeCode?: string;
  isPlantillaUnit: boolean;
}

export interface JobTitle extends BaseEntity {
  title: string;
  description?: string;
  employmentType: EmploymentType;
  salaryGrade?: SalaryGrade;
  positionClassification?: PositionClassification;
  plantillaItemNumber?: string;
  cscEligibilityRequired: boolean;
  salaryMin?: number;
  salaryMax?: number;
  isActive: boolean;
}

export interface EmploymentHistory extends BaseEntity {
  personnelId: string;
  organization: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  employmentType: EmploymentType;
}

export interface CreatePersonnelRequest {
  userId?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  jobTitleId?: string;
  employmentType: EmploymentType;
  dateHired?: Date;
  salary: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  cscEligibility?: string;
  cscEligibilityDate?: Date;
  plantillaItemNumber?: string;
  agencyCode?: string;
  officeCode?: string;
}

export interface UpdatePersonnelRequest {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  civilStatus?: CivilStatus;
  contactNumber?: string;
  address?: string;
  departmentId?: string;
  jobTitleId?: string;
  employmentType?: EmploymentType;
  dateHired?: Date;
  salary?: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  cscEligibility?: string;
  cscEligibilityDate?: Date;
  plantillaItemNumber?: string;
  agencyCode?: string;
  officeCode?: string;
}
