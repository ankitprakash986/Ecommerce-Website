import { Controller, Get, Post, Req, Res, Next, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { users } from 'src/models/users';

@Injectable()
export class AccountService {

    constructor(@InjectRepository(users) private User){}

    async profileGet(@Req() req:Request,@Res() res:Response,@Next() next){
        console.log(req.decoded);
    const user = await this.User.findOne({_id: req.decoded.user._id});

    
        if(user){
            res.json({
                status:200,
                success: true,
                user: user,
                message: "Successful",
              });
        }
      }


}
