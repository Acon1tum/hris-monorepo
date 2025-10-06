"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const clients_1 = require("../../db/clients");
class AuthService {
    async findUserByEmail(email) {
        return await clients_1.accounts.user.findUnique({
            where: { email }
        });
    }
    async createUser(data) {
        return await clients_1.accounts.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: data.password,
                role: data.role || 'Employee',
                isActive: true
            }
        });
    }
    async findUserById(id) {
        return await clients_1.accounts.user.findUnique({
            where: { id }
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map