import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private rest: RestApiService
  ) {}


  getCategory(cat,page){
        return this.rest.get(
          `http://localhost:3030/api/categories/${cat}?page=${
            page - 1
          }`
        );
    }
}
