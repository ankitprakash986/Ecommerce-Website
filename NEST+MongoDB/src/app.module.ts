import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './controllers/account/account.controller';
import { ProductSearchController } from './controllers/product-search/product-search.controller';

import { OrderSchema } from './Models/order';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './Models/user';
import { CategorySchema } from './Models/category';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './Models/product';

import { MainController } from './controllers/main/main.controller';
import { ReviewSchema } from './Models/review';
import { CheckJwtMiddleware } from './middleware/check-jwt.middleware';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),DatabaseModule,MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'products', schema: ProductSchema}]),
  MongooseModule.forFeature([{ name: 'reviews', schema:ReviewSchema }]),
  MongooseModule.forFeature([{ name: 'orders', schema:OrderSchema }])],
  controllers: [AppController, AccountController,ProductSearchController,
  MainController,AuthController ],
  providers: [AppService,],
})
export class AppModule {


  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckJwtMiddleware).forRoutes(AccountController)
  }
}
