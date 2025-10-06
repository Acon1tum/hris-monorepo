"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portal_controller_1 = require("./portal.controller");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// Public
router.get('/test-database', portal_controller_1.JobPortalController.testDatabase);
router.post('/register', portal_controller_1.JobPortalController.register);
router.post('/login', portal_controller_1.JobPortalController.login);
router.get('/jobs', portal_controller_1.JobPortalController.listJobs);
router.get('/jobs/:id', portal_controller_1.JobPortalController.getJob);
router.post('/jobs', portal_controller_1.JobPortalController.createJobPosting);
router.get('/salary-ranges', portal_controller_1.JobPortalController.getSalaryRanges);
router.get('/departments', portal_controller_1.JobPortalController.getDepartments);
// Authenticated
router.get('/profile', auth_1.authenticateToken, portal_controller_1.JobPortalController.getProfile);
router.get('/current-profile', auth_1.authenticateToken, portal_controller_1.JobPortalController.getCurrentApplicantProfile);
router.put('/profile', auth_1.authenticateToken, portal_controller_1.JobPortalController.updateProfile);
router.get('/profile/completion-status', auth_1.authenticateToken, portal_controller_1.JobPortalController.checkProfileCompletion);
router.post('/applications', auth_1.authenticateToken, portal_controller_1.JobPortalController.startApplication);
router.post('/applications/:id/upload', auth_1.authenticateToken, portal_controller_1.JobPortalController.uploadDocuments);
router.put('/applications/:id/answers', auth_1.authenticateToken, portal_controller_1.JobPortalController.answerQuestions);
router.post('/applications/:id/submit', auth_1.authenticateToken, portal_controller_1.JobPortalController.submitApplication);
router.get('/applications', auth_1.authenticateToken, portal_controller_1.JobPortalController.listApplications);
router.get('/applications/:id', auth_1.authenticateToken, portal_controller_1.JobPortalController.getApplication);
router.put('/applications/:id', auth_1.authenticateToken, portal_controller_1.JobPortalController.editApplication);
router.delete('/applications/:id', auth_1.authenticateToken, portal_controller_1.JobPortalController.cancelApplication);
router.post('/notifications', portal_controller_1.JobPortalController.notifyApplicant);
exports.default = router;
//# sourceMappingURL=online-job-application-portal.routes.js.map