import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import {Request,Response } from 'express';

import { InjectModel } from '@nestjs/mongoose';

const async = require("async");

@Controller('/api')
export class MainController {
    constructor(
        @InjectModel('Category') private readonly Category,
        @InjectModel('users') private User,
        @InjectModel('products') private readonly Product,){}

    @Get('/categories/:id')
    getByCategory(@Req() req:Request,@Res() res:Response,@Next() next){
        const perPage = 10;
        const page = req.query.page;
        const root=this;
        async.parallel(
          [
            function (callback) {
              root.Product.count({
                category: req.params.id
              }, (err, count) => {
                var totalProducts = count;
                callback(err, totalProducts);
              });
            },
            function (callback) {
              root.Product.find({
                  category: req.params.id
                })
                .exec((err, products) => {
                  if (err) return next(err);
                  callback(err, products);
                });
            },
            function (callback) {
              root.Category.findOne({
                _id: req.params.id
              }, (err, category) => {
                callback(err, category);
              });
            },
          ],
          function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            var category = results[2];
            res.json({
              status:200,
              success: true,
              message: "category",
              products: products,
              categoryName: category.name,
              totalProducts: totalProducts,
              pages: Math.ceil(totalProducts / perPage),
            });
          }
        );
      }

      @Get('/product/:id')
      getProduct(@Req() req:Request,@Res() res:Response,@Next() next){
        const root=this;

        root.Product.findById({
            _id: req.params.id
          })
          .populate("category")
          .exec((err, product) => {
            if (err) {
              res.json({
                status:404,
                success: false,
                message: "Product is not found",
              });
            } else {
              if (product) {
                res.json({
                  status:200,
                  success: true,
                  product: product,
                });
                console.log(product);
              }
            }
          });
      }

      @Post('/product/:id/qty')
      getProdQuantity(@Req() req:Request,@Res() res:Response,@Next() next){
        console.log('2');
        this.Product.findByIdAndUpdate({
            _id: req.params.id
          }, {
            quantity: req.body.qty
          },
          function (err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          }
        );
      }
}
