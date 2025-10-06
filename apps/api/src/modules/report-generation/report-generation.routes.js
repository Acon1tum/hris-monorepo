"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Report Generation API - Under Development' });
});
exports.default = router;
//# sourceMappingURL=report-generation.routes.js.map