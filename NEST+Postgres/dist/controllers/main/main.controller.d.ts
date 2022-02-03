import { Request, Response } from 'express';
export declare class MainController {
    private categoryRepo;
    private Product;
    constructor(categoryRepo: any, Product: any);
    getProduct(req: Request, res: Response, next: any): Promise<void>;
}
