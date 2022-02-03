//Address component.ts - Type Script file that contains code to render adddress feature to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { RestApiService } from "../rest-api.service";
import { AddressService } from "./address.service";

//componnet files specifications
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})

//exporting the addtess component
export class AddressComponent implements OnInit {
  btnDisabled = false;

  currentAddress: any;

  constructor(private data: DataService, private rest: RestApiService,private address:AddressService) {}

  async ngOnInit() {
    try {
      const data = await this.address.enterAddress()
      //
      if (
        JSON.stringify(data["address"]) === "{}" &&
        this.data.message === ""
      ) {
        this.data.warning(
          "You have not entered your shipping address. Please enter your shipping address."
        );
      }
      this.currentAddress = data["address"];
    } catch (error) {
      this.data.error(error["message"]);
    }
  }

  async updateAddress() {
    this.btnDisabled = true;
    try {
      const res = await this.address.updateAddress(this.currentAddress);
      //
      res["success"]
        ? (this.data.success(res["message"]), await this.data.getProfile())
        : this.data.error(res["message"]);
    } catch (error) {
      this.data.error(error["message"]);
    }
    this.btnDisabled = false;
  }
  
}

