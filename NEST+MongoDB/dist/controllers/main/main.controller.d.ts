import { Request, Response } from 'express';
export declare class MainController {
    private readonly Category;
    private User;
    private readonly Product;
    constructor(Category: any, User: any, Product: any);
    getByCategory(req: Request, res: Response, next: any): void;
    getProduct(req: Request, res: Response, next: any): void;
    getProdQuantity(req: Request, res: Response, next: any): void;
}
