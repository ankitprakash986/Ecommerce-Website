import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from '../auth-guard.service';
import { AddressComponent } from './address.component';
// profile/address
const routes: Routes = [{
  path: "",
  component: AddressComponent,
  canActivate: [AuthGuardService],
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  ],
  exports:[RouterModule,]
})
export class AddressRoutingModule { }
