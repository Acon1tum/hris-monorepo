"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ success: true, message: 'Audit logs routes - TODO: implement' });
});
exports.default = router;
//# sourceMappingURL=audit-logs.routes.js.map