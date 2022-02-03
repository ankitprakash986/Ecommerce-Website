import { Request, Response } from 'express';
export declare class ProductSearchController {
    private categoryRepo;
    private Product;
    constructor(categoryRepo: any, Product: any);
    getCategories(req: Request, res: Response, next: any): Promise<void>;
    GetAll(req: Request, res: Response, next: any): Promise<void>;
    fun(req: Request, res: Response, next: any): Promise<void>;
}
