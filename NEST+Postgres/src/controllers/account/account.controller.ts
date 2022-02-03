import { Controller, Get, Post, Req, Res, Next, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { users } from 'src/models/users';


const jwt = require('jsonwebtoken');
const checkJWT = require('../../middleware/check-jwt.middleware');
const config = require('../../config');


@Controller('/api/accounts')
export class AccountController {
    constructor(@InjectRepository(users) private User){}
    @Get('/profile')
    async profileGet(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
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

  //     @Post('/profile')
  // async profilePost(@Req() req:Request,@Res() res:Response,@Next() next){

  //   const user = await this.User.findOne({_id: req.decoded.user._id});

  //   this.User.findOne({
  //     _id: req.decoded.user._id
  //     //req.decoded["user"]["_id"]
  //   }, (err, user) => {
  //     if (err) return next(err);

  //     if (req.body.name) user.name = req.body.name;
  //     if (req.body.email) user.email = req.body.email;
  //     if (req.body.password) user.password = req.body.password;

  //     user.isSeller = req.body.isSeller;

  //     user.save();
  //     res.json({
  //       status:200,
  //       success: true,
  //       message: "Profile successfully edited",
  //     });
  //   });

  //   if(err)
        

  // }
}

