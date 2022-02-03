import { Request, Response } from 'express';
export declare class AccountController {
    private User;
    private Order;
    constructor(User: any, Order: any);
    profileGet(checkJWT: any, req: Request, res: Response, next: any): void;
    profilePost(checkJWT: any, req: Request, res: Response, next: any): void;
    getOrders(checkJWT: any, req: Request, res: Response, next: any): void;
    deleteOrders(req: Request, res: Response, next: any): void;
    deleteSpecificOrder(checkJWT: any, req: Request, res: Response, next: any): void;
    addressGet(req: Request, res: Response, next: any): void;
    addressPost(req: Request, res: Response, next: any): void;
}
