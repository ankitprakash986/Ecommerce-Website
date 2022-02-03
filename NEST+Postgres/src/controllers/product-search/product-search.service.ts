import { Controller, Get, Injectable, Next, Req, Res } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { categories } from 'src/models/categories.entity';
import { products } from 'src/models/products';
import { Request, Response } from 'express';

@Injectable()
export class ProductSearchService {
  constructor(
    @InjectRepository(categories) private categoryRepo,
    @InjectRepository(products) private Product,
  ) {}

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

  async GetAll(@Req() req: Request, @Res() res: Response, @Next() next) {
    const perPage = 10;
    const page = req.query.page;
    

    try {
      const [totalProducts, products] = await Promise.all([
        this.Product.count({}),
        this.Product.find({
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

  async fun(@Req() req: Request, @Res() res: Response, @Next() next) {
    const perPage = 10;
    const page: any = req.query.page;
    console.log(req.query.query);
    var regex = new RegExp([req.query.query].join(''), 'i');
    console.log(regex);
 

    const totalProducts = await this.Product.count();
    const products = await this.Product.find({ title: req.query.query });
    console.log(totalProducts, products);

    res.json({
      status: 200,
      success: true,
      message: 'Product',
      products: products,
      totalProducts: totalProducts,
      pages: Math.ceil(totalProducts / perPage),
      currentProducts: products.length,
    });
  }
}
