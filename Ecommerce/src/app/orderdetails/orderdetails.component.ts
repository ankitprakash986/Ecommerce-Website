//Order Details component.ts - Type Script file that contains code to render details of the order to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { RestApiService } from "../rest-api.service";
import { DataService } from "../data.service";
import { OrderdetailsService } from "./orderdetails.service";

//component specific details
@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.component.html",
  styleUrls: ["./orderdetails.component.scss"],
})

//exporting OrderDetails component for reuse
export class OrderdetailsComponent implements OnInit {
  orderId: any;
  products: any;
  totalAmount: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private orderDetails:OrderdetailsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.orderId = res["id"];
      this.getProducts();
    });
  }

  async getProducts(event?: any) {
    if (event) {
      this.products = null;
    }
    try {
      const data = await this.orderDetails.getProducts(this.orderId)
      console.log(data);
      data["success"]
        ? (this.products = data["order"])
        : this.data.error(data["message"]);
      this.products = this.products.products;
      console.log(data["order"]["totalPrice"]);
      this.totalAmount = data["order"]["totalPrice"];
    } catch (error) {
      this.data.error(error["message"]);
    }
  }

  async deleteOrder() {
    const data = await this.orderDetails.deleteProduct(this.orderId);
    console.log(data);
    window.location.replace("http://localhost:4200/profile/orders");
  }
}
