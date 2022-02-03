import { Injectable } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private rest:RestApiService) { }

  mtx(query,page){
    this.rest.get(
    `http://localhost:3030/api/search?query=${query}&page=${
      page - 1
    }`
  );}
}
