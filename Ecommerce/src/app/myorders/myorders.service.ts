import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  constructor(private data: DataService, private rest: RestApiService) {}


  getOrders(){
    return this.rest.get(
      "http://localhost:3030/api/accounts/orders"
    );
  }
}
