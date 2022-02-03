import { Request, Response } from 'express';
export declare class AccountController {
    private User;
    constructor(User: any);
    profileGet(checkJWT: any, req: Request, res: Response, next: any): Promise<void>;
}
