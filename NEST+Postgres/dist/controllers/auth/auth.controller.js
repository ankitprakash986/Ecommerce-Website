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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_1 = require("../../models/users");
const jwt = require('jsonwebtoken');
const config = require('../../config');
const md5 = require('md5');
let AuthController = class AuthController {
    constructor(User) {
        this.User = User;
    }
    async Login(req, res, next) {
        const user = await this.User.findOne({ email: req.body.email });
        if (!user) {
            res.json({
                status: 404,
                success: false,
                message: 'User account cannot be found',
            });
        }
        else if (user) {
            let validPassword;
            if (req.body.password === user.password) {
                validPassword = true;
            }
            else {
                validPassword = false;
            }
            if (!validPassword) {
                res.json({
                    status: 401,
                    success: false,
                    message: 'Incorrect password',
                });
            }
            else {
                const token = jwt.sign({
                    user: user,
                }, config.secret, {
                    expiresIn: '7d',
                });
                res.json({
                    status: 200,
                    success: true,
                    mesage: 'Enjoy your token',
                    token: token,
                });
                console.log(token);
            }
        }
    }
    async SignUp(req, res, next) {
        let user = this.User.create();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isSeller = req.body.isSeller;
        console.log(user);
        const existingUser = await this.User.findOne({ email: req.body.email });
        if (existingUser) {
            res.json({
                status: 409,
                success: false,
                message: 'Account with that email is already exists',
            });
        }
        else {
            this.User.save(user);
            var token = jwt.sign({
                user: user,
            }, config.secret, {
                expiresIn: '7d',
            });
            res.json({
                status: 201,
                success: true,
                message: 'Token Success',
                token: token,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "SignUp", null);
AuthController = __decorate([
    (0, common_1.Controller)('/api/accounts'),
    __param(0, (0, typeorm_1.InjectRepository)(users_1.users)),
    __metadata("design:paramtypes", [Object])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map