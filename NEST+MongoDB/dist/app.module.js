"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const account_controller_1 = require("./controllers/account/account.controller");
const product_search_controller_1 = require("./controllers/product-search/product-search.controller");
const order_1 = require("./Models/order");
const user_1 = require("./Models/user");
const category_1 = require("./Models/category");
const database_module_1 = require("./database/database.module");
const mongoose_1 = require("@nestjs/mongoose");
const product_1 = require("./Models/product");
const main_controller_1 = require("./controllers/main/main.controller");
const review_1 = require("./Models/review");
const check_jwt_middleware_1 = require("./middleware/check-jwt.middleware");
const auth_controller_1 = require("./controllers/auth/auth.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(check_jwt_middleware_1.CheckJwtMiddleware).forRoutes(account_controller_1.AccountController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'), database_module_1.DatabaseModule, mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: category_1.CategorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'users', schema: user_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'products', schema: product_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'reviews', schema: review_1.ReviewSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'orders', schema: order_1.OrderSchema }])],
        controllers: [app_controller_1.AppController, account_controller_1.AccountController, product_search_controller_1.ProductSearchController,
            main_controller_1.MainController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService,],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map