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
exports.MainController = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var async = require("async");
var MainController = /** @class */ (function () {
    function MainController(Category, User, Product, Review) {
        this.Category = Category;
        this.User = User;
        this.Product = Product;
        this.Review = Review;
    }
    MainController.prototype.getByCategory = function (req, res, next) {
        var perPage = 10;
        var page = req.query.page;
        var root = this;
        async.parallel([
            function (callback) {
                root.Product.count({
                    category: req.params.id
                }, function (err, count) {
                    var totalProducts = count;
                    callback(err, totalProducts);
                });
            },
            function (callback) {
                root.Product.find({
                    category: req.params.id
                })
                    // .skip(perPage * page)
                    // .limit(perPage)
                    // .populate("category")
                    // .populate("owner")
                    // .populate("reviews")
                    .exec(function (err, products) {
                    if (err)
                        return next(err);
                    callback(err, products);
                });
            },
            function (callback) {
                root.Category.findOne({
                    _id: req.params.id
                }, function (err, category) {
                    callback(err, category);
                });
            },
        ], function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            var category = results[2];
            res.json({
                success: true,
                message: "category",
                products: products,
                categoryName: category.name,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage)
            });
        });
    };
    MainController.prototype.getProduct = function (req, res, next) {
        var root = this;
        root.Product.findById({
            _id: req.params.id
        })
            .populate("category")
            //   .populate("owner")
            //   .deepPopulate("reviews.owner")
            .exec(function (err, product) {
            if (err) {
                res.json({
                    success: false,
                    message: "Product is not found"
                });
            }
            else {
                if (product) {
                    res.json({
                        success: true,
                        product: product
                    });
                    console.log(product);
                }
            }
        });
    };
    MainController.prototype.getProdQuantity = function (req, res, next) {
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
    };
    __decorate([
        (0, common_1.Get)('/categories/:id'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], MainController.prototype, "getByCategory");
    __decorate([
        (0, common_1.Get)('/product/:id'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], MainController.prototype, "getProduct");
    __decorate([
        (0, common_1.Post)('/product/:id/qty'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], MainController.prototype, "getProdQuantity");
    MainController = __decorate([
        (0, common_1.Controller)('/api'),
        __param(0, (0, mongoose_1.InjectModel)('Category')),
        __param(1, (0, mongoose_1.InjectModel)('users')),
        __param(2, (0, mongoose_1.InjectModel)('products')),
        __param(3, (0, mongoose_1.InjectModel)('reviews'))
    ], MainController);
    return MainController;
}());
exports.MainController = MainController;
