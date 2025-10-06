import { Request, Response } from 'express';
export declare class JobPortalManagementController {
    static createJobPosting(req: Request, res: Response): Promise<void>;
    static getAllJobPostings(req: Request, res: Response): Promise<void>;
    static getJobPosting(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateJobPosting(req: Request, res: Response): Promise<void>;
    static updateJobPostingStatus(req: Request, res: Response): Promise<void>;
    static deleteJobPosting(req: Request, res: Response): Promise<void>;
    static getAllApplications(req: Request, res: Response): Promise<void>;
    static getApplication(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateApplicationStatus(req: Request, res: Response): Promise<void>;
    static getDashboard(req: Request, res: Response): Promise<void>;
    static getDepartments(req: Request, res: Response): Promise<void>;
    static getSalaryRanges(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=portal-management.controller.d.ts.map