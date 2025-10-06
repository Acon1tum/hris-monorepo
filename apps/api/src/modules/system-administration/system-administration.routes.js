"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const users_routes_1 = __importDefault(require("./users/users.routes"));
const roles_routes_1 = __importDefault(require("./roles/roles.routes"));
const departments_routes_1 = __importDefault(require("./departments/departments.routes"));
const audit_logs_routes_1 = __importDefault(require("./audit-logs/audit-logs.routes"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ success: true, message: 'System Administration module - API root' });
});
// Protect all admin routes
router.use(auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']));
router.use('/users', users_routes_1.default);
router.use('/roles', roles_routes_1.default);
router.use('/departments', departments_routes_1.default);
router.use('/audit-logs', audit_logs_routes_1.default);
exports.default = router;
//# sourceMappingURL=system-administration.routes.js.map