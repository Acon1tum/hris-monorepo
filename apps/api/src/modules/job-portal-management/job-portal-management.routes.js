"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const portal_management_controller_1 = require("./portal-management.controller");
const router = (0, express_1.Router)();
// Secure all management routes
router.use(auth_1.authenticateToken, (0, auth_1.requireRole)(['Admin', 'HR']));
// Job posting management
router.post('/jobs', portal_management_controller_1.JobPortalManagementController.createJobPosting);
router.get('/jobs', portal_management_controller_1.JobPortalManagementController.getAllJobPostings);
router.get('/jobs/:id', portal_management_controller_1.JobPortalManagementController.getJobPosting);
router.put('/jobs/:id', portal_management_controller_1.JobPortalManagementController.updateJobPosting);
router.patch('/jobs/:id/status', portal_management_controller_1.JobPortalManagementController.updateJobPostingStatus);
router.delete('/jobs/:id', (0, auth_1.requireRole)(['Admin']), portal_management_controller_1.JobPortalManagementController.deleteJobPosting);
// Application management
router.get('/applications', portal_management_controller_1.JobPortalManagementController.getAllApplications);
router.get('/applications/:id', portal_management_controller_1.JobPortalManagementController.getApplication);
router.patch('/applications/:id/status', portal_management_controller_1.JobPortalManagementController.updateApplicationStatus);
// Dashboard & analytics
router.get('/dashboard', portal_management_controller_1.JobPortalManagementController.getDashboard);
// Utility endpoints
router.get('/departments', portal_management_controller_1.JobPortalManagementController.getDepartments);
router.get('/salary-ranges', portal_management_controller_1.JobPortalManagementController.getSalaryRanges);
exports.default = router;
//# sourceMappingURL=job-portal-management.routes.js.map