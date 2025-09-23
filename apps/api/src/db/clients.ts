import { PrismaClient as AccountsClient } from '@prisma/client-accounts';
import { PrismaClient as PersonnelClient } from '@prisma/client-personnel';
import { PrismaClient as AttendanceClient } from '@prisma/client-attendance';
import { PrismaClient as LeaveClient } from '@prisma/client-leave';
import { PrismaClient as PayrollClient } from '@prisma/client-payroll';
import { PrismaClient as PerformanceClient } from '@prisma/client-performance';
import { PrismaClient as ReportsClient } from '@prisma/client-reports';
import { PrismaClient as SystemClient } from '@prisma/client-system';
import { PrismaClient as JobClient } from '@prisma/client-job';

// Initialize clients with proper error handling
export const accounts = new AccountsClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_ACCOUNTS
    }
  }
});

export const personnel = new PersonnelClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PERSONNEL
    }
  }
});

export const attendance = new AttendanceClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_ATTENDANCE
    }
  }
});

export const leaveDb = new LeaveClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_LEAVE
    }
  }
});

export const payroll = new PayrollClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PAYROLL
    }
  }
});

export const performance = new PerformanceClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PERFORMANCE
    }
  }
});

export const reports = new ReportsClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_REPORTS
    }
  }
});

export const system = new SystemClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_SYSTEM
    }
  }
});

export const job = new JobClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_JOB_PORTAL
    }
  }
});


