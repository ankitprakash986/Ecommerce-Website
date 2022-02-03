import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class MyProductsService {

  constructor(private data: DataService, private rest: RestApiService) { }

  getProducts()
  {
    return this.rest.get(
      "http://localhost:3030/api/seller/products"
    );
  }

  deleteProduct(id){
    return   this.rest.post(
      "http://localhost:3030/api/seller/products/" + id,
         {}
      );
  }
}
  
