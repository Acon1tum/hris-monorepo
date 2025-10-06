import { Request, Response } from 'express';
export declare class PersonnelController {
    static getAllPersonnel(req: Request, res: Response): Promise<void>;
    static getPersonnelStats(req: Request, res: Response): Promise<void>;
    static getDashboardStats(req: Request, res: Response): Promise<void>;
    static getPersonnelById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static createPersonnel(req: Request, res: Response): Promise<void>;
    static updatePersonnel(req: Request, res: Response): Promise<void>;
    static deletePersonnel(req: Request, res: Response): Promise<void>;
    static getEmploymentHistory(req: Request, res: Response): Promise<void>;
    static addEmploymentHistory(req: Request, res: Response): Promise<void>;
    static getMembershipData(req: Request, res: Response): Promise<void>;
    static updateMembershipData(req: Request, res: Response): Promise<void>;
    static getMeritsViolations(req: Request, res: Response): Promise<void>;
    static addMeritViolation(req: Request, res: Response): Promise<void>;
    static getAdministrativeCases(req: Request, res: Response): Promise<void>;
    static addAdministrativeCase(req: Request, res: Response): Promise<void>;
    static getPersonnelMovements(req: Request, res: Response): Promise<void>;
    static addPersonnelMovement(req: Request, res: Response): Promise<void>;
    static getDashboardEmployees(req: Request, res: Response): Promise<void>;
    static uploadDocuments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getDocuments(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=personnel.controller.d.ts.map