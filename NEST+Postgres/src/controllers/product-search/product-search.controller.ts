import { Controller, Get, Next, Req, Res } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { categories } from 'src/models/categories.entity';
import { products } from 'src/models/products';
const async = require('async');
import { Request, Response } from 'express';

@Controller('/api')
export class ProductSearchController {

    constructor(
        @InjectRepository(categories) private categoryRepo,
        @InjectRepository(products) private Product,
    
      ) {}

      @Get('/categories')
  async getCategories(@Req() req: Request, @Res() res: Response, @Next() next) {
    const categories = await this.categoryRepo.find();

    try {
      console.log(categories);
      res.json({
        status: 200,
        success: true,
        message: 'Success',
        categories: categories,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  @Get('/products')
  async GetAll(@Req() req: Request, @Res() res: Response, @Next() next) {
    const perPage = 10;
    const page = req.query.page;
    const root = this;

    try {
      const [totalProducts, products] = await Promise.all([
        root.Product.count({}),
        root.Product.find({
          isDeleted: false,
        }),
      ]);
      res.json({
        status: 200,
        success: true,
        message: 'Product',
        products: products,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage),
        currentProducts: products.length,
      });
    } catch (e) {
      throw e;
    }
  }

  @Get('/search')
  async fun(@Req() req: Request, @Res() res: Response, @Next() next)
  {
    const perPage = 10;
    const page: any = req.query.page;
    console.log(req.query.query);
    var regex = new RegExp([req.query.query].join(''), 'i');
    console.log(regex);
    const root = this;
    
    const totalProducts= await this.Product.count();
    const products = await this.Product.find({title:req.query.query});
    console.log(totalProducts,products)

        res.json({
          status:200,
          success: true,
          message: 'Product',
          products: products,
          totalProducts: totalProducts,
          pages: Math.ceil(totalProducts / perPage),
          currentProducts: products.length,
        });
      }
   
}

