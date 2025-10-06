import { Request, Response } from 'express';
export declare class DepartmentsController {
    static getAllDepartments(req: Request, res: Response): Promise<void>;
    static getDepartmentById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static createDepartment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateDepartment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteDepartment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getDepartmentStats(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=departments.controller.d.ts.map