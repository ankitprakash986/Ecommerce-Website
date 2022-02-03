import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private data: DataService, private rest: RestApiService) { }

  getCategories(){
    return this.rest.get("http://localhost:3030/api/categories");
  }
}
