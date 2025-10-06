import { Request, Response } from 'express';
export declare class UsersController {
    static getUsers(req: Request, res: Response): Promise<void>;
    static getUserById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static toggleUserStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=users.controller.d.ts.map