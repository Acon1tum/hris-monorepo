"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_hris_1 = require("@prisma/client-hris");
exports.prisma = globalThis.prisma || new client_hris_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = exports.prisma;
}
exports.default = exports.prisma;
//# sourceMappingURL=client.js.map