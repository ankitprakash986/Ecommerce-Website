import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private data: DataService, private rest: RestApiService) { }


  enterAddress(){
    return this.rest.get(
      "http://localhost:3030/api/accounts/address"
    );
  }

  updateAddress(currentAddress){
    this.rest.post(
      "http://localhost:3030/api/accounts/address",
      currentAddress
    );
  }
}
