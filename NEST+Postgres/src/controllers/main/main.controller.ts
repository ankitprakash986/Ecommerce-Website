import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { categories } from 'src/models/categories.entity';
import { products } from 'src/models/products';
@Controller('/api')
export class MainController {
  constructor(
    @InjectRepository(categories) private categoryRepo,
    @InjectRepository(products) private Product,

  ) {}

  // @Get('/categories')
  // async getCategories(@Req() req: Request, @Res() res: Response, @Next() next) {
  //   const categories = await this.categoryRepo.find();

  //   try {
  //     console.log(categories);
  //     res.json({
  //       status: 200,
  //       success: true,
  //       message: 'Success',
  //       categories: categories,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }
  // @Get('/products')
  // async GetAll(@Req() req: Request, @Res() res: Response, @Next() next) {
  //   const perPage = 10;
  //   const page = req.query.page;
  //   const root = this;

  //   try {
  //     const [totalProducts, products] = await Promise.all([
  //       root.Product.count({}),
  //       root.Product.find({
  //         isDeleted: false,
  //       }),
  //     ]);
  //     res.json({
  //       status: 200,
  //       success: true,
  //       message: 'Product',
  //       products: products,
  //       totalProducts: totalProducts,
  //       pages: Math.ceil(totalProducts / perPage),
  //       currentProducts: products.length,
  //     });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  @Get('/product/:id')
      async getProduct(@Req() req:Request,@Res() res:Response,@Next() next){
        const root=this;

        const product=await root.Product.find({
            _id: req.params.id
          });
        console.log(product)
          
          
            if (!product) {
              res.json({
                status:404,
                success: false,
                message: "Product is not found",
              });
              console.log('5fh674');
            } else {
              if (product) {
                res.json({
                  status:200,
                  success: true,
                  product: product,
                });
                
              }
              console.log('xxxx');
            }
          }
      }


