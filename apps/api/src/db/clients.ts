import { PrismaClient as AccountsClient } from '@prisma/client-accounts';
import { PrismaClient as PersonnelClient } from '@prisma/client-personnel';
import { PrismaClient as AttendanceClient } from '@prisma/client-attendance';
import { PrismaClient as LeaveClient } from '@prisma/client-leave';
import { PrismaClient as PayrollClient } from '@prisma/client-payroll';
import { PrismaClient as PerformanceClient } from '@prisma/client-performance';
import { PrismaClient as ReportsClient } from '@prisma/client-reports';
import { PrismaClient as SystemClient } from '@prisma/client-system';
import { PrismaClient as JobClient } from '@prisma/client-job-portal';

export const accounts = new AccountsClient();
export const personnel = new PersonnelClient();
export const attendance = new AttendanceClient();
export const leaveDb = new LeaveClient();
export const payroll = new PayrollClient();
export const performance = new PerformanceClient();
export const reports = new ReportsClient();
export const system = new SystemClient();
export const job = new JobClient();


