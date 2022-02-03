import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService
  ) {}

  loginMethod(cred){
    return this.rest.post(
      "http://localhost:3030/api/accounts/login",
      {
        email: cred.email,
        password: cred.password,
      }
    );
  }
}
