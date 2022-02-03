"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckJwtMiddleware = void 0;
var common_1 = require("@nestjs/common");
var jsonwebtoken_1 = require("jsonwebtoken");
var config = require('../config');
var CheckJwtMiddleware = /** @class */ (function () {
    function CheckJwtMiddleware() {
    }
    CheckJwtMiddleware.prototype.use = function (req, res, next) {
        var token = req.headers["authorization"];
        if (token) {
            jsonwebtoken_1["default"].verify(token, config.secret, function (err, decoded) {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'Failed to authenticate token'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'No token provided'
            });
        }
    };
    CheckJwtMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], CheckJwtMiddleware);
    return CheckJwtMiddleware;
}());
exports.CheckJwtMiddleware = CheckJwtMiddleware;
