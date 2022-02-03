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
const mongoose_1 = require("@nestjs/mongoose");
const async = require("async");
let MainController = class MainController {
    constructor(Category, User, Product) {
        this.Category = Category;
        this.User = User;
        this.Product = Product;
    }
    getByCategory(req, res, next) {
        const perPage = 10;
        const page = req.query.page;
        const root = this;
        async.parallel([
            function (callback) {
                root.Product.count({
                    category: req.params.id
                }, (err, count) => {
                    var totalProducts = count;
                    callback(err, totalProducts);
                });
            },
            function (callback) {
                root.Product.find({
                    category: req.params.id
                })
                    .exec((err, products) => {
                    if (err)
                        return next(err);
                    callback(err, products);
                });
            },
            function (callback) {
                root.Category.findOne({
                    _id: req.params.id
                }, (err, category) => {
                    callback(err, category);
                });
            },
        ], function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            var category = results[2];
            res.json({
                status: 200,
                success: true,
                message: "category",
                products: products,
                categoryName: category.name,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage),
            });
        });
    }
    getProduct(req, res, next) {
        const root = this;
        root.Product.findById({
            _id: req.params.id
        })
            .populate("category")
            .exec((err, product) => {
            if (err) {
                res.json({
                    status: 404,
                    success: false,
                    message: "Product is not found",
                });
            }
            else {
                if (product) {
                    res.json({
                        status: 200,
                        success: true,
                        product: product,
                    });
                    console.log(product);
                }
            }
        });
    }
    getProdQuantity(req, res, next) {
        console.log('2');
        this.Product.findByIdAndUpdate({
            _id: req.params.id
        }, {
            quantity: req.body.qty
        }, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        });
    }
};
__decorate([
    (0, common_1.Get)('/categories/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)('/product/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('/product/:id/qty'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "getProdQuantity", null);
MainController = __decorate([
    (0, common_1.Controller)('/api'),
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __param(1, (0, mongoose_1.InjectModel)('users')),
    __param(2, (0, mongoose_1.InjectModel)('products')),
    __metadata("design:paramtypes", [Object, Object, Object])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map