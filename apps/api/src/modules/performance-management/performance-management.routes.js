"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Performance Management API - Under Development' });
});
exports.default = router;
//# sourceMappingURL=performance-management.routes.js.map