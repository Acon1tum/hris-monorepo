import { PrismaClient as AccountsClient } from '@prisma/client-accounts';
import { PrismaClient as PersonnelClient } from '@prisma/client-personnel';
import { PrismaClient as AttendanceClient } from '@prisma/client-attendance';
import { PrismaClient as LeaveClient } from '@prisma/client-leave';
import { PrismaClient as PayrollClient } from '@prisma/client-payroll';
import { PrismaClient as PerformanceClient } from '@prisma/client-performance';
import { PrismaClient as ReportsClient } from '@prisma/client-reports';
import { PrismaClient as SystemClient } from '@prisma/client-system';
import { PrismaClient as JobClient } from '@prisma/client-job';
export declare const accounts: AccountsClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-accounts/runtime/library").DefaultArgs>;
export declare const personnel: PersonnelClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-personnel/runtime/library").DefaultArgs>;
export declare const attendance: AttendanceClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-attendance/runtime/library").DefaultArgs>;
export declare const leaveDb: LeaveClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-leave/runtime/library").DefaultArgs>;
export declare const payroll: PayrollClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-payroll/runtime/library").DefaultArgs>;
export declare const performance: PerformanceClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-performance/runtime/library").DefaultArgs>;
export declare const reports: ReportsClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-reports/runtime/library").DefaultArgs>;
export declare const system: SystemClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-system/runtime/library").DefaultArgs>;
export declare const job: JobClient<{
    datasources: {
        db: {
            url: string | undefined;
        };
    };
}, never, import("@prisma/client-job/runtime/library").DefaultArgs>;
//# sourceMappingURL=clients.d.ts.map