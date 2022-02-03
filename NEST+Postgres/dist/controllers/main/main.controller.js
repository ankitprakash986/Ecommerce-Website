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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../../models/categories.entity");
const products_1 = require("../../models/products");
let MainController = class MainController {
    constructor(categoryRepo, Product) {
        this.categoryRepo = categoryRepo;
        this.Product = Product;
    }
    async getProduct(req, res, next) {
        const root = this;
        const product = await root.Product.find({
            _id: req.params.id
        });
        console.log(product);
        if (!product) {
            res.json({
                status: 404,
                success: false,
                message: "Product is not found",
            });
            console.log('5fh674');
        }
        else {
            if (product) {
                res.json({
                    status: 200,
                    success: true,
                    product: product,
                });
            }
            console.log('xxxx');
        }
    }
};
__decorate([
    (0, common_1.Get)('/product/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getProduct", null);
MainController = __decorate([
    (0, common_1.Controller)('/api'),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.categories)),
    __param(1, (0, typeorm_1.InjectRepository)(products_1.products)),
    __metadata("design:paramtypes", [Object, Object])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map