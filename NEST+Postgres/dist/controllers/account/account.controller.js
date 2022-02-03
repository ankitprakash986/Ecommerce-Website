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
const typeorm_1 = require("@nestjs/typeorm");
const users_1 = require("../../models/users");
const jwt = require('jsonwebtoken');
const checkJWT = require('../../middleware/check-jwt.middleware');
const config = require('../../config');
let AccountController = class AccountController {
    constructor(User) {
        this.User = User;
    }
    async profileGet(checkJWT, req, res, next) {
        console.log(req.decoded);
        const user = await this.User.findOne({ _id: req.decoded.user._id });
        if (user) {
            res.json({
                status: 200,
                success: true,
                user: user,
                message: "Successful",
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "profileGet", null);
AccountController = __decorate([
    (0, common_1.Controller)('/api/accounts'),
    __param(0, (0, typeorm_1.InjectRepository)(users_1.users)),
    __metadata("design:paramtypes", [Object])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map