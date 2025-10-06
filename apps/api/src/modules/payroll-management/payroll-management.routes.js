"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Payroll Management API - Under Development' });
});
exports.default = router;
//# sourceMappingURL=payroll-management.routes.js.map