"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../middleware/auth");
const departments_controller_1 = require("./departments.controller");
const router = (0, express_1.Router)();
// Protect all department routes
router.use(auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']));
// Department CRUD operations
router.get('/', departments_controller_1.DepartmentsController.getAllDepartments);
router.get('/stats', departments_controller_1.DepartmentsController.getDepartmentStats);
router.get('/:id', departments_controller_1.DepartmentsController.getDepartmentById);
router.post('/', departments_controller_1.DepartmentsController.createDepartment);
router.put('/:id', departments_controller_1.DepartmentsController.updateDepartment);
router.delete('/:id', departments_controller_1.DepartmentsController.deleteDepartment);
exports.default = router;
//# sourceMappingURL=departments.routes.js.map