import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { MainController } from './controllers/main/main.controller';
import { categories } from './models/categories.entity';
import { users } from './models/users';
import {products} from './models/products';
import { ProductSearchController } from './controllers/product-search/product-search.controller';
import { CheckJwtMiddleware } from './Middleware/check-jwt.middleware';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './controllers/account/account.service';
import { AuthService } from './controllers/auth/auth.service';
import { MainService } from './controllers/main/main.service';
import { ProductSearchService } from './controllers/product-search/product-search.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ankitprakash',
      password: 'root',
      database: 'ankitprakash',
      entities: [categories, users,products],
    }),
    TypeOrmModule.forFeature([categories]),
    TypeOrmModule.forFeature([users]),
    TypeOrmModule.forFeature([products]),
  ],
  controllers: [AppController, MainController,AuthController,ProductSearchController,AccountController],
  providers: [AppService,AccountService,AuthService,MainService,ProductSearchService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckJwtMiddleware).forRoutes(AccountController)
  }
}
