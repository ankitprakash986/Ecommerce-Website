import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private http: HttpClient,
    private cart:CartService) { }

  address(){
    return this.rest.get(
      "http://localhost:3030/api/accounts/address"
    );
  }

  getCart(cartItem,quantity){
    return this.http
        .post(
          "http://localhost:3030/api/product/" + cartItem + "/qty",
          quantity
        )
  }
}
