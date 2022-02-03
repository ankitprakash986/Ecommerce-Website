import { BrowserModule } from '@angular/platform-browser';	
import { NgModule } from '@angular/core';	
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';	
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';	
import { MaterialModule } from './material/material.module';	
import { AppRoutingModule } from "./app-routing.module";	
import { AppComponent } from "./app.component";	
import { FormsModule, ReactiveFormsModule } from "@angular/forms";	
import { HttpClientModule } from "@angular/common/http";	
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";	
import { RestApiService } from "./rest-api.service";	
import { DataService } from "./data.service";	
import { AuthGuardService } from "./auth-guard.service";	
import { HomeComponent } from "./home/home.component";	
// import { MessageComponent } from "./message/message.component";	
import { RegistrationComponent } from "./registration/registration.component";	
import { LoginComponent } from "./login/login.component";	
import { ProfileComponent } from "./profile/profile.component";	
import { SettingsComponent } from "./settings/settings.component";	
// import { AddressComponent } from "./address/address.component";	
import { CategoriesComponent } from "./categories/categories.component";	
import { PostProductComponent } from "./post-product/post-product.component";	
import { MyProductsComponent } from "./my-products/my-products.component";	
import { CategoryComponent } from "./category/category.component";	
import { ProductComponent } from "./product/product.component";	
import { SearchComponent } from "./search/search.component";	
import { CartComponent } from "./cart/cart.component";	
import { MyordersComponent } from "./myorders/myorders.component";	
import { OrderdetailsComponent } from "./orderdetails/orderdetails.component";	
import { EditProductComponent } from "./edit-product/edit-product.component";	
import { AddressModule } from './address/address.module';
import { AddressRoutingModule } from './address/address-routing.module';
import { MessageComponent } from './message/message.component';
@NgModule({	
  declarations: [	
    AppComponent,	
    HomeComponent,	
    MessageComponent,	
    RegistrationComponent,	
    LoginComponent,	
    ProfileComponent,	
    SettingsComponent,	
    
    CategoriesComponent,	
    PostProductComponent,	
    MyProductsComponent,	
    CategoryComponent,	
    ProductComponent,	
    SearchComponent,	
    CartComponent,	
    MyordersComponent,	
    OrderdetailsComponent,	
    EditProductComponent,	
    
 ],	
  imports: [	
    
  
    BrowserModule,	
    AppRoutingModule,
    FormsModule,	
    ReactiveFormsModule,	
    HttpClientModule,	
    MaterialModule
  ],	
  providers: [RestApiService, DataService, AuthGuardService],	
  bootstrap: [AppComponent],	
  schemas:[CUSTOM_ELEMENTS_SCHEMA]	
})	
export class AppModule { }