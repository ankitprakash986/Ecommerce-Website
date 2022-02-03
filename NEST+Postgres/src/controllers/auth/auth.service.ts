import { Controller, Get, Injectable, Next, Post, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { users } from 'src/models/users';
const jwt = require('jsonwebtoken');
const config = require('../../config');

@Injectable()
export class AuthService {
    
    constructor(@InjectRepository(users) private User){}
    async Login(@Req() req: Request, @Res() res: Response, @Next() next) {
    
        const user = await this.User.findOne({email:req.body.email});
        // console.log(req.body.password,user.password);
  
        
            if (!user) {
              res.json({
                status: 404,
                success: false,
                message: 'User account cannot be found',
              });
            } else if (user) {
              let validPassword;
              if(req.body.password===user.password)
                {validPassword=true
                }
                else
                {validPassword=false}
              if (!validPassword) {
                res.json({
                  status: 401,
                  success: false,
                  message: 'Incorrect password',
                });
              } else {
                const token = jwt.sign(
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
                console.log(token)
              }
            }
          }

    async SignUp(@Req() req: Request, @Res() res: Response, @Next() next) {
            let user = this.User.create();
            
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.isSeller = false;
            console.log(user);
            const existingUser = await this.User.findOne({email:req.body.email}); 
                if (existingUser) {
                  res.json({
                    status: 409,
                    success: false,
                    message: 'Account with that email is already exists',
                  });
                } else {
                  this.User.save(user);
        
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
              
          }
}
