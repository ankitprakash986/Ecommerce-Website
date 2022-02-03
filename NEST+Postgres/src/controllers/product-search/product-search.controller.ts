import { Controller, Get, Next, Req, Res } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { categories } from 'src/models/categories.entity';
import { products } from 'src/models/products';
import { Request, Response } from 'express';
import { ProductSearchService } from './product-search.service';

@Controller('/api')
export class ProductSearchController {

  constructor(private productSearchService:ProductSearchService ) {}

  @Get('/categories')
  async getCategories(@Req() req: Request, @Res() res: Response, @Next() next) {
    this.productSearchService.getCategories(req,res,next);
  }
  @Get('/products')
  async GetAll(@Req() req: Request, @Res() res: Response, @Next() next){
    this.productSearchService.GetAll(req,res,next);
  }

  @Get('/search')
  async fun(@Req() req: Request, @Res() res: Response, @Next() next)
  {
    this.productSearchService.fun(req,res,next);
  }
   
}

