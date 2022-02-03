import { Request, Response } from 'express';
export declare class AuthController {
    private User;
    constructor(User: any);
    SignUp(req: Request, res: Response, next: any): void;
    Login(req: Request, res: Response, next: any): void;
}
