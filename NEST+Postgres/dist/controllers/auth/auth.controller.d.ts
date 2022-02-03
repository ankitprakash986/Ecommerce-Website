import { Request, Response } from 'express';
export declare class AuthController {
    private User;
    constructor(User: any);
    Login(req: Request, res: Response, next: any): Promise<void>;
    SignUp(req: Request, res: Response, next: any): Promise<void>;
}
