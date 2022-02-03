import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private data: DataService,
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute) { }

    getProduct(page){
      return this.rest.get(
        `http://localhost:3030/api/products?page=${page - 1}`
      );
    }
}
