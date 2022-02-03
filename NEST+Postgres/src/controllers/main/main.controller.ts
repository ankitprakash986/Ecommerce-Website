import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MainService } from './main.service';
@Controller('/api')
export class MainController {
  constructor(
    
    private mainService:MainService

  ) {}

  @Get('/product/:id')
      async getProduct(@Req() req:Request,@Res() res:Response,@Next() next){
        this.mainService.getProduct(req,res,next);
      }
}


