import { Controller, Get, Post, Req, Res, Next, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import User from 'src/Models/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

const jwt = require('jsonwebtoken');
const checkJWT = require('../../middleware/check-jwt.middleware');
const config = require('../../config');

@Controller('/api/accounts')
export class AccountController {
  constructor(
    @InjectModel('users') private User,
    @InjectModel('orders') private Order,
  ) {}


  @Get('/profile')
  profileGet(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
      console.log(req.decoded);
      this.User.findOne({
        _id: req.decoded.user._id
      }, (err, user) => {
        res.json({
          status:200,
          success: true,
          user: user,
          message: "Successful",
        });
      });
    }

  @Post('/profile')
  profilePost(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){

    this.User.findOne({
      _id: req.decoded.user._id
      //req.decoded["user"]["_id"]
    }, (err, user) => {
      if (err) return next(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;

      user.isSeller = req.body.isSeller;

      user.save();
      res.json({
        status:200,
        success: true,
        message: "Profile successfully edited",
      });
    });

  }



  @Get('/orders')
  getOrders(checkJWT, @Req() req: Request, @Res() res: Response, @Next() next) {
    
    this.Order.find({
      owner: req.decoded.user._id,
    }).exec((err, orders) => {
      if (err) {
        res.json({
          status:404,
          success: false,
          message: 'Order cannot be found',
        });
      } else {
        res.json({
          status:200,
          success: true,
          message: 'Order found',
          orders: orders,
        });
      }
    });
  }

  @Get('/orders/:id/delete')
  deleteOrders(@Req() req: Request, @Res() res: Response, @Next() next) {
    this.Order.remove(
      {
        _id: req.params.id,
      },
      function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      },
    );
  }

  @Get('/orders/:id')
  deleteSpecificOrder(
    checkJWT,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next,
  ) {
    this.Order.findOne({
      _id: req.params.id,
    }).exec((err, order) => {
      if (err) {
        res.json({
          status:404,
          success: false,
          message: 'Order cannot be found',
        });
      } else {
        res.json({
          status:200,
          success: true,
          message: 'Order found',
          order: order,
        });
      }
    });
  }

  @Get("/address")
  addressGet(@Req() req: Request, @Res() res: Response, @Next() next){
    this.User.findOne({
      _id: req.decoded.user._id
    }, (err, user) => {
      res.json({
        success: true,
        address: user.address,
        message: "Successful",
      });
    });
  }

  @Post("/address")
  addressPost(@Req() req: Request, @Res() res: Response, @Next() next){
    User.findOne({
      _id: req.decoded.user._id
    }, (err, user) => {
      if (err) return next(err);

      if (req.body.addr1) user.address.addr1 = req.body.addr1;
      if (req.body.addr2) user.address.addr2 = req.body.addr2;
      if (req.body.city) user.address.city = req.body.city;
      if (req.body.state) user.address.state = req.body.state;
      if (req.body.country) user.address.country = req.body.country;
      if (req.body.postalCode) user.address.postalCode = req.body.postalCode;

      user.save();
      res.json({
        status:200,
        success: true,
        message: "Address successfully edited",
      });
    });
  }
}
