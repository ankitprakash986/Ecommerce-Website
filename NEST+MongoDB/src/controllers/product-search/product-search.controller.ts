import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
const async = require('async');

import { algoliasearch } from 'mongoose-algolia';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
const Product = require('../../Models/product');

import { CategorySchema } from 'src/Models/category';
import { Model } from 'mongoose';
@Controller('/api/')
export class ProductSearchController {
  constructor(
    @InjectModel('Category') private readonly Category,
    @InjectModel('users') private User,
    @InjectModel('products') private readonly Product,
  ) {}
  @Get('/search')
  fun(@Req() req: Request, @Res() res: Response, @Next() next) {
    const perPage = 10;
    const page: any = req.query.page;
    console.log(req.query.query);
    var regex = new RegExp([req.query.query].join(''), 'i');
    console.log(regex);
    const root = this;
    async.parallel(
      [
        function (callback) {
          root.Product.count({}, (err, count) => {
            var totalProducts = count;
            callback(err, totalProducts);
          });
        },
        function (callback) {
          root.Product.find({
            isDeleted: false,
            title: regex,
          }).exec((err, products) => {
            if (err) return next(err);
            callback(err, products);
          });
        },
      ],
      function (err, results) {
        var totalProducts = results[0];
        var products = results[1];

        res.json({
          status:200,
          success: true,
          message: 'Product',
          products: products,
          totalProducts: totalProducts,
          pages: Math.ceil(totalProducts / perPage),
          currentProducts: products.length,
        });
      },
    );
  }

  @Get('/categories')
  getCategories(@Req() req: Request, @Res() res: Response, @Next() next) {
    this.Category.find({}, (err, categories) => {
      console.log(categories);
      res.json({
        status:200,
        success: true,
        message: 'Success',
        categories: categories,
      });
      if (err) {
        console.log(err);
      }
    });
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
        status:200,
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
}
























































// async.parallel(
//   [
//     function (callback) {
//       root.Product.count({}, (err, count) => {
//         var totalProducts = count;
//         callback(err, totalProducts);
//       });
//     },
//     function (callback) {
//       root.Product.find({
//           isDeleted: false
//         })
//         // .skip(perPage )
//         // .limit(perPage)
//         // .populate("category")
//         // .populate("owner")
//         .exec((err, products) => {
//           if (err) return next(err);
//           callback(err, products);
//         });
//     },
//   ],
//   function (err, results) {
//     var totalProducts = results[0];
//     var products = results[1];

//     res.json({
//       success: true,
//       message: "Product",
//       products: products,
//       totalProducts: totalProducts,
//       pages: Math.ceil(totalProducts / perPage),
//       currentProducts: products.length,
//     });
//   }
// );
