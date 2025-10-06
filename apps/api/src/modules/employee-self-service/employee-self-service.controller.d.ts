import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
export declare class EmployeeSelfServiceController {
    static getMyProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateMyProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getMyDocuments(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static uploadDocument(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteDocument(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=employee-self-service.controller.d.ts.map