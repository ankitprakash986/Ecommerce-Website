import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { MessageComponent } from '../message/message.component';
import { FormsModule } from '@angular/forms';
import { AddressRoutingModule } from './address-routing.module';


@NgModule({
  declarations: [AddressComponent,],
  imports: [
    CommonModule,
    FormsModule,
    AddressRoutingModule,
  ],
  exports:[AddressComponent,],
  
  
})
export class AddressModule { }
