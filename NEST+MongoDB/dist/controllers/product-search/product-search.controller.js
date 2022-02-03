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
exports.ProductSearchController = void 0;
const common_1 = require("@nestjs/common");
const async = require('async');
const mongoose_1 = require("@nestjs/mongoose");
const Product = require('../../Models/product');
let ProductSearchController = class ProductSearchController {
    constructor(Category, User, Product) {
        this.Category = Category;
        this.User = User;
        this.Product = Product;
    }
    fun(req, res, next) {
        const perPage = 10;
        const page = req.query.page;
        console.log(req.query.query);
        var regex = new RegExp([req.query.query].join(''), 'i');
        console.log(regex);
        const root = this;
        async.parallel([
            function (callback) {
                root.Product.count({}, (err, count) => {
                    var totalProducts = count;
                    callback(err, totalProducts);
                });
            },
            function (callback) {
                root.Product.find({
                    isDeleted: false,
                    title: regex,
                }).exec((err, products) => {
                    if (err)
                        return next(err);
                    callback(err, products);
                });
            },
        ], function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            res.json({
                status: 200,
                success: true,
                message: 'Product',
                products: products,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage),
                currentProducts: products.length,
            });
        });
    }
    getCategories(req, res, next) {
        this.Category.find({}, (err, categories) => {
            console.log(categories);
            res.json({
                status: 200,
                success: true,
                message: 'Success',
                categories: categories,
            });
            if (err) {
                console.log(err);
            }
        });
    }
    async GetAll(req, res, next) {
        const perPage = 10;
        const page = req.query.page;
        const root = this;
        try {
            const [totalProducts, products] = await Promise.all([
                root.Product.count({}),
                root.Product.find({
                    isDeleted: false,
                }),
            ]);
            res.json({
                status: 200,
                success: true,
                message: 'Product',
                products: products,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage),
                currentProducts: products.length,
            });
        }
        catch (e) {
            throw e;
        }
    }
};
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductSearchController.prototype, "fun", null);
__decorate([
    (0, common_1.Get)('/categories'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductSearchController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductSearchController.prototype, "GetAll", null);
ProductSearchController = __decorate([
    (0, common_1.Controller)('/api/'),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __param(1, (0, mongoose_1.InjectModel)('users')),
    __param(2, (0, mongoose_1.InjectModel)('products')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProductSearchController);
exports.ProductSearchController = ProductSearchController;
//# sourceMappingURL=product-search.controller.js.map