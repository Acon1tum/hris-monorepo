import { Request, Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
export declare class LeaveController {
    static getLeaveApplications(req: Request, res: Response): Promise<void>;
    static getMyLeaveApplications(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getPendingApplications(req: Request, res: Response): Promise<void>;
    static createLeaveApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateLeaveApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static cancelLeaveApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static approveLeaveApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static rejectLeaveApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getLeaveTypes(req: Request, res: Response): Promise<void>;
    static createLeaveType(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateLeaveType(req: Request, res: Response): Promise<void>;
    static deleteLeaveType(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getMyLeaveBalance(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getPersonnelLeaveBalance(req: Request, res: Response): Promise<void>;
    static initializeLeaveBalance(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static bulkInitializeLeaveBalances(req: Request, res: Response): Promise<void>;
    static previewBulkInitializeLeaveBalances(req: Request, res: Response): Promise<void>;
    static getLeaveMonetization(req: Request, res: Response): Promise<void>;
    static createLeaveMonetization(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static approveLeaveMonetization(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getLeaveSummaryReport(req: Request, res: Response): Promise<void>;
    static getLeaveBalanceReport(req: Request, res: Response): Promise<void>;
    static createLeaveAdjustment(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getLeaveAdjustments(req: Request, res: Response): Promise<void>;
    static getPersonnelAdjustments(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=leave.controller.d.ts.map