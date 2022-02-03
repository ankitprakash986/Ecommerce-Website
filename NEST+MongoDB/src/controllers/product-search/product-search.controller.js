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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductSearchController = void 0;
var common_1 = require("@nestjs/common");
var async = require("async");
var mongoose_1 = require("@nestjs/mongoose");
var Product = require('../../Models/product');
var ProductSearchController = /** @class */ (function () {
    function ProductSearchController(Category, User, Product) {
        this.Category = Category;
        this.User = User;
        this.Product = Product;
    }
    ProductSearchController.prototype.fun = function (req, res, next) {
        var perPage = 10;
        var page = req.query.page;
        console.log(req.query.query);
        var regex = new RegExp([req.query.query].join(""), "i");
        console.log(regex);
        var root = this;
        async.parallel([
            function (callback) {
                root.Product.count({}, function (err, count) {
                    var totalProducts = count;
                    callback(err, totalProducts);
                });
            },
            function (callback) {
                root.Product.find({
                    isDeleted: false,
                    title: regex
                })
                    // .skip(perPage * page)
                    // .limit(perPage)
                    // .populate("category")
                    // .populate("owner")
                    .exec(function (err, products) {
                    if (err)
                        return next(err);
                    callback(err, products);
                });
            },
        ], function (err, results) {
            var totalProducts = results[0];
            var products = results[1];
            res.json({
                success: true,
                message: "Product",
                products: products,
                totalProducts: totalProducts,
                pages: Math.ceil(totalProducts / perPage),
                currentProducts: products.length
            });
        });
    };
    ProductSearchController.prototype.getCategories = function (req, res, next) {
        // find(id: string) {
        // return this.Category.findById('5eae0460a0b6c82c10b7dbe7').exec();
        // }
        this.Category.find({}, function (err, categories) {
            console.log(categories);
            res.json({
                success: true,
                message: "Success",
                categories: categories
            });
            if (err) {
                console.log(err);
            }
        });
    };
    ProductSearchController.prototype.GetAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var perPage, page, root, _a, totalProducts, products, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        perPage = 10;
                        page = req.query.page;
                        root = this;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                root.Product.count({}),
                                root.Product.find({
                                    isDeleted: false
                                }) // .skip(perPage )
                                // .limit(perPage)
                                // .populate("category")
                                // .populate("owner")
                            ])];
                    case 2:
                        _a = _b.sent(), totalProducts = _a[0], products = _a[1];
                        res.json({
                            success: true,
                            message: "Product",
                            products: products,
                            totalProducts: totalProducts,
                            pages: Math.ceil(totalProducts / perPage),
                            currentProducts: products.length
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Get)('/search'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], ProductSearchController.prototype, "fun");
    __decorate([
        (0, common_1.Get)('/categories'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], ProductSearchController.prototype, "getCategories");
    __decorate([
        (0, common_1.Get)('/products'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Next)())
    ], ProductSearchController.prototype, "GetAll");
    ProductSearchController = __decorate([
        (0, common_1.Controller)('/api/'),
        __param(0, (0, mongoose_1.InjectModel)('Category')),
        __param(1, (0, mongoose_1.InjectModel)('users')),
        __param(2, (0, mongoose_1.InjectModel)('products'))
    ], ProductSearchController);
    return ProductSearchController;
}());
exports.ProductSearchController = ProductSearchController;
