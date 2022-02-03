"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AccountController = void 0;
var common_1 = require("@nestjs/common");
var jwt = require('jsonwebtoken');
var mongoose_1 = require("@nestjs/mongoose");
var Order = require('../../Models/order');
var checkJWT = require('../../middleware/check-jwt.middleware');
var config = require('../../config');
var AccountController = /** @class */ (function () {
    function AccountController(User, Order) {
        this.User = User;
        this.Order = Order;
    }
    AccountController.prototype.SignUp = function (req, res, next) {
        var user = new this.User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        // user.picture = this.User.gravatar();
        user.isSeller = req.body.isSeller;
        console.log(user);
        this.User.findOne({
            email: req.body.email
        }, function (err, existingUser) {
            if (existingUser) {
                res.json({
                    success: false,
                    message: 'Account with that email is already exists'
                });
            }
            else {
                user.save();
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });
                res.json({
                    success: true,
                    message: 'Token Success',
                    token: token
                });
            }
        });
    };
    AccountController.prototype.Login = function (req, res, next) {
        this.User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: 'User account cannot be found'
                });
            }
            else if (user) {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: 'Incorrect password'
                    });
                }
                else {
                    var token = jwt.sign({
                        user: user
                    }, config.secret, {
                        expiresIn: '7d'
                    });
                    res.json({
                        success: true,
                        mesage: 'Enjoy your token',
                        token: token
                    });
                }
            }
        });
    };
    // @Get('/profile')
    // profileGet(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
    //     this.User.findOne({
    //       _id: req.decoded.user._id
    //     }, (err, user) => {
    //       res.json({
    //         success: true,
    //         user: user,
    //         message: "Successful",
    //       });
    //     });
    //   }
    // @Post('/profile')
    // profilePost(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
    //   this.User.findOne({
    //     _id: req.decoded.user._id
    //     //req.decoded["user"]["_id"]
    //   }, (err, user) => {
    //     if (err) return next(err);
    //     if (req.body.name) user.name = req.body.name;
    //     if (req.body.email) user.email = req.body.email;
    //     if (req.body.password) user.password = req.body.password;
    //     user.isSeller = req.body.isSeller;
    //     this.User.save();
    //     res.json({
    //       success: true,
    //       message: "Profile successfully edited",
    //     });
    //   });
    // }
    // @Post('/profile')
    // profilePost(checkJWT,@Req() req:Request,@Res() res:Response,@Next() next){
    //   this.User.findOne({
    //     _id: req.decoded.user._id
    //   }, (err, user) => {
    //     if (err) return next(err);
    //     if (req.body.name) user.name = req.body.name;
    //     if (req.body.email) user.email = req.body.email;
    //     if (req.body.password) user.password = req.body.password;
    //     user.isSeller = req.body.isSeller;
    //     this.User.save();
    //     res.json({
    //       success: true,
    //       message: "Profile successfully edited",
    //     });
    //   });
    // }
    AccountController.prototype.getOrders = function (checkJWT, req, res, next) {
        this.Order.find({
            owner: req.decoded.user._id
        }).exec(function (err, orders) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Order cannot be found'
                });
            }
            else {
                res.json({
                    success: true,
                    message: 'Order found',
                    orders: orders
                });
            }
        });
    };
    AccountController.prototype.deleteOrders = function (req, res, next) {
        this.Order.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(result);
                res.send(result);
            }
        });
    };
    AccountController.prototype.deleteSpecificOrder = function (checkJWT, req, res, next) {
        this.Order.findOne({
            _id: req.params.id
        }).exec(function (err, order) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Order cannot be found'
                });
            }
            else {
                res.json({
                    success: true,
                    message: 'Order found',
                    order: order
                });
            }
        });
    };
    __decorate([
        (0, common_1.Post)('/signup'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], AccountController.prototype, "SignUp");
    __decorate([
        (0, common_1.Post)('/login'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], AccountController.prototype, "Login");
    __decorate([
        (0, common_1.Get)('/orders'),
        __param(1, (0, common_1.Req)()),
        __param(2, (0, common_1.Res)()),
        __param(3, (0, common_1.Next)())
    ], AccountController.prototype, "getOrders");
    __decorate([
        (0, common_1.Get)('/orders/:id/delete'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], AccountController.prototype, "deleteOrders");
    __decorate([
        (0, common_1.Get)('/orders/:id'),
        __param(1, (0, common_1.Req)()),
        __param(2, (0, common_1.Res)()),
        __param(3, (0, common_1.Next)())
    ], AccountController.prototype, "deleteSpecificOrder");
    AccountController = __decorate([
        (0, common_1.Controller)('/api/accounts'),
        __param(0, (0, mongoose_1.InjectModel)('users')),
        __param(1, (0, mongoose_1.InjectModel)('orders'))
    ], AccountController);
    return AccountController;
}());
exports.AccountController = AccountController;
