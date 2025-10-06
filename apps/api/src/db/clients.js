"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.job = exports.system = exports.reports = exports.performance = exports.payroll = exports.leaveDb = exports.attendance = exports.personnel = exports.accounts = void 0;
const client_accounts_1 = require("@prisma/client-accounts");
const client_personnel_1 = require("@prisma/client-personnel");
const client_attendance_1 = require("@prisma/client-attendance");
const client_leave_1 = require("@prisma/client-leave");
const client_payroll_1 = require("@prisma/client-payroll");
const client_performance_1 = require("@prisma/client-performance");
const client_reports_1 = require("@prisma/client-reports");
const client_system_1 = require("@prisma/client-system");
const client_job_1 = require("@prisma/client-job");
// Initialize clients with proper error handling
exports.accounts = new client_accounts_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_ACCOUNTS
        }
    }
});
exports.personnel = new client_personnel_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_PERSONNEL
        }
    }
});
exports.attendance = new client_attendance_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_ATTENDANCE
        }
    }
});
exports.leaveDb = new client_leave_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_LEAVE
        }
    }
});
exports.payroll = new client_payroll_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_PAYROLL
        }
    }
});
exports.performance = new client_performance_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_PERFORMANCE
        }
    }
});
exports.reports = new client_reports_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_REPORTS
        }
    }
});
exports.system = new client_system_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_SYSTEM
        }
    }
});
exports.job = new client_job_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL_JOB_PORTAL
        }
    }
});
//# sourceMappingURL=clients.js.map