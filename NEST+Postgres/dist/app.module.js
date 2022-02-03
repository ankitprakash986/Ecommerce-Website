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
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./controllers/auth/auth.controller");
const main_controller_1 = require("./controllers/main/main.controller");
const categories_entity_1 = require("./models/categories.entity");
const users_1 = require("./models/users");
const products_1 = require("./models/products");
const product_search_controller_1 = require("./controllers/product-search/product-search.controller");
const check_jwt_middleware_1 = require("./Middleware/check-jwt.middleware");
const account_controller_1 = require("./controllers/account/account.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(check_jwt_middleware_1.CheckJwtMiddleware).forRoutes(account_controller_1.AccountController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'ankitprakash',
                password: 'root',
                database: 'ankitprakash',
                entities: [categories_entity_1.categories, users_1.users, products_1.products],
            }),
            typeorm_1.TypeOrmModule.forFeature([categories_entity_1.categories]),
            typeorm_1.TypeOrmModule.forFeature([users_1.users]),
            typeorm_1.TypeOrmModule.forFeature([products_1.products]),
        ],
        controllers: [app_controller_1.AppController, main_controller_1.MainController, auth_controller_1.AuthController, product_search_controller_1.ProductSearchController, account_controller_1.AccountController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map