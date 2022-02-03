import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { users } from 'src/models/users';
import { AuthService } from './auth.service';
const jwt = require('jsonwebtoken');
const config = require('../../config');
const md5=require('md5');
@Controller('/api/accounts')
export class AuthController {

    constructor(private authService:AuthService){}

  @Post('/login')
  async Login(@Req() req: Request, @Res() res: Response, @Next() next) {
    this.authService.Login(req,res,next);
  }


  @Post('/signup')
  async SignUp(@Req() req: Request, @Res() res: Response, @Next() next) 
  {
    this.authService.SignUp(req,res,next);
  }

}


