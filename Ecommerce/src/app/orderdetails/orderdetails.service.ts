import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  getProducts(orderId){
    return this.rest.get(
        `http://localhost:3030/api/accounts/orders/${orderId}`
      );
  }

  deleteProduct(orderId){
    return this.rest.get(
      `http://localhost:3030/api/accounts/orders/${orderId}/delete`
    );
  }
}
