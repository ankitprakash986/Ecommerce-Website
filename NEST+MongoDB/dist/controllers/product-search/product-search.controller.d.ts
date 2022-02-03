import { Request, Response } from 'express';
export declare class ProductSearchController {
    private readonly Category;
    private User;
    private readonly Product;
    constructor(Category: any, User: any, Product: any);
    fun(req: Request, res: Response, next: any): void;
    getCategories(req: Request, res: Response, next: any): void;
    GetAll(req: Request, res: Response, next: any): Promise<void>;
}
