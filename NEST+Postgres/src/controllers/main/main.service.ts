import { Injectable, Get, Next, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { products } from 'src/models/products';
import { Request, Response } from 'express';

@Injectable()
export class MainService {
constructor(@InjectRepository(products) private Product){}

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
