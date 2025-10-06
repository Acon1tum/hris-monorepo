"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lmsPrisma = void 0;
const client_1 = require("@prisma/client");
exports.lmsPrisma = globalThis.lmsPrisma || new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production') {
    globalThis.lmsPrisma = exports.lmsPrisma;
}
exports.default = exports.lmsPrisma;
//# sourceMappingURL=client.js.map