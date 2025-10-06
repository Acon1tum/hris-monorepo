import { Request, Response } from 'express';
export declare class JobPortalController {
    static testDatabase(req: Request, res: Response): Promise<void>;
    static register(req: Request, res: Response): Promise<void>;
    static login(req: Request, res: Response): Promise<void>;
    static getProfile(req: Request, res: Response): Promise<void>;
    static getCurrentApplicantProfile(req: Request, res: Response): Promise<void>;
    static updateProfile(req: Request, res: Response): Promise<void>;
    static checkProfileCompletion(req: Request, res: Response): Promise<void>;
    static listJobs(req: Request, res: Response): Promise<void>;
    static getJob(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static createJobPosting(req: Request, res: Response): Promise<void>;
    static getSalaryRanges(req: Request, res: Response): Promise<void>;
    static getDepartments(req: Request, res: Response): Promise<void>;
    static startApplication(req: Request, res: Response): Promise<void>;
    static uploadDocuments(req: Request, res: Response): Promise<void>;
    static answerQuestions(req: Request, res: Response): Promise<void>;
    static submitApplication(req: Request, res: Response): Promise<void>;
    static listApplications(req: Request, res: Response): Promise<void>;
    static getApplication(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static editApplication(req: Request, res: Response): Promise<void>;
    static cancelApplication(req: Request, res: Response): Promise<void>;
    static notifyApplicant(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=portal.controller.d.ts.map