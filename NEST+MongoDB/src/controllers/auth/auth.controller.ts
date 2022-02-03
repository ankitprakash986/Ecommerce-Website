import { InjectModel } from '@nestjs/mongoose';
import { Controller, Get, Post, Req, Res, Next, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const config = require('../../config');
@Controller('/api/accounts')
export class AuthController {
  constructor(
    @InjectModel('users') private User) 
  {}
  @Post('/signup')
  SignUp(@Req() req: Request, @Res() res: Response, @Next() next) {
    let user = new this.User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = this.User.gravatar();
    user.isSeller = req.body.isSeller;
    console.log(user);
    this.User.findOne(
      {
        email: req.body.email,
      },
      (err, existingUser) => {
        if (existingUser) {
          res.json({
            status: 409,
            success: false,
            message: 'Account with that email is already exists',
          });
        } else {
          user.save();

          var token = jwt.sign(
            {
              user: user,
            },
            config.secret,
            {
              expiresIn: '7d',
            },
          );

          res.json({
            status: 201,
            success: true,
            message: 'Token Success',
            token: token,
          });
        }
      },
    );
  }

  @Post('/login')
  Login(@Req() req: Request, @Res() res: Response, @Next() next) {
    this.User.findOne(
      {
        email: req.body.email,
      },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          res.json({
            status: 404,
            success: false,
            message: 'User account cannot be found',
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({
              status: 401,
              success: false,
              message: 'Incorrect password',
            });
          } else {
            var token = jwt.sign(
              {
                user: user,
              },
              config.secret,
              {
                expiresIn: '7d',
              },
            );

            res.json({
              status: 200,
              success: true,
              mesage: 'Enjoy your token',
              token: token,
            });
          }
        }
      },
    );
  }
}
