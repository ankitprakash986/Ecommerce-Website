import { Controller, Get, Post, Req, Res, Next, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { users } from 'src/models/users';
import { AccountService } from './account.service';


const jwt = require('jsonwebtoken');
const checkJWT = require('../../middleware/check-jwt.middleware');
const config = require('../../config');


@Controller('/api/accounts')
export class AccountController {
    constructor(private accountService:AccountService){}
    @Get('/profile')
    async profileGet(@Req() req:Request,@Res() res:Response,@Next() next){
        this.accountService.profileGet(req,res,next);
        console.log('service');
    }
    
    // async profileGet(@Req() req:Request,@Res() res:Response,@Next() next){
    //     console.log(req.decoded);
    // const user = await this.User.findOne({_id: req.decoded.user._id});

    
    //     if(user){
    //         res.json({
    //             status:200,
    //             success: true,
    //             user: user,
    //             message: "Successful",
    //           });
    //     }
    //   }

  


}

