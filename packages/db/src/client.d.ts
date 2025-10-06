import { PrismaClient } from '@prisma/client-hris';
import type { Prisma, User as PrismaUser } from '@prisma/client-hris';
export type { Prisma };
export type User = PrismaUser;
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client-hris/runtime/library").DefaultArgs>;
export default prisma;
//# sourceMappingURL=client.d.ts.map