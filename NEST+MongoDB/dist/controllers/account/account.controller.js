"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../Models/user");
const mongoose_1 = require("@nestjs/mongoose");
const jwt = require('jsonwebtoken');
const checkJWT = require('../../middleware/check-jwt.middleware');
const config = require('../../config');
let AccountController = class AccountController {
    constructor(User, Order) {
        this.User = User;
        this.Order = Order;
    }
    profileGet(checkJWT, req, res, next) {
        console.log(req.decoded);
        this.User.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            res.json({
                status: 200,
                success: true,
                user: user,
                message: "Successful",
            });
        });
    }
    profilePost(checkJWT, req, res, next) {
        this.User.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            if (err)
                return next(err);
            if (req.body.name)
                user.name = req.body.name;
            if (req.body.email)
                user.email = req.body.email;
            if (req.body.password)
                user.password = req.body.password;
            user.isSeller = req.body.isSeller;
            user.save();
            res.json({
                status: 200,
                success: true,
                message: "Profile successfully edited",
            });
        });
    }
    getOrders(checkJWT, req, res, next) {
        this.Order.find({
            owner: req.decoded.user._id,
        }).exec((err, orders) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: 'Order cannot be found',
                });
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: 'Order found',
                    orders: orders,
                });
            }
        });
    }
    deleteOrders(req, res, next) {
        this.Order.remove({
            _id: req.params.id,
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
    }
    deleteSpecificOrder(checkJWT, req, res, next) {
        this.Order.findOne({
            _id: req.params.id,
        }).exec((err, order) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: 'Order cannot be found',
                });
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: 'Order found',
                    order: order,
                });
            }
        });
    }
    addressGet(req, res, next) {
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
    addressPost(req, res, next) {
        user_1.default.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            if (err)
                return next(err);
            if (req.body.addr1)
                user.address.addr1 = req.body.addr1;
            if (req.body.addr2)
                user.address.addr2 = req.body.addr2;
            if (req.body.city)
                user.address.city = req.body.city;
            if (req.body.state)
                user.address.state = req.body.state;
            if (req.body.country)
                user.address.country = req.body.country;
            if (req.body.postalCode)
                user.address.postalCode = req.body.postalCode;
            user.save();
            res.json({
                status: 200,
                success: true,
                message: "Address successfully edited",
            });
        });
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "profileGet", null);
__decorate([
    (0, common_1.Post)('/profile'),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "profilePost", null);
__decorate([
    (0, common_1.Get)('/orders'),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('/orders/:id/delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "deleteOrders", null);
__decorate([
    (0, common_1.Get)('/orders/:id'),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "deleteSpecificOrder", null);
__decorate([
    (0, common_1.Get)("/address"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "addressGet", null);
__decorate([
    (0, common_1.Post)("/address"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "addressPost", null);
AccountController = __decorate([
    (0, common_1.Controller)('/api/accounts'),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __param(1, (0, mongoose_1.InjectModel)('orders')),
    __metadata("design:paramtypes", [Object, Object])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map