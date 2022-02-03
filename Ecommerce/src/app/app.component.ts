import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "./data.service";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { RestApiService } from './rest-api.service';
// import * as Parallax from "parallax-js";

// declare var Parallax: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

 

  searchTerm = "";
  isCollapsed = true;



  
  content: any;
  query: string;
  page = 1;
  constructor(private router: Router, private data: DataService,private activatedRoute: ActivatedRoute,

    private rest: RestApiService) {
    this.data.cartItems = this.data.getCart().length;
    this.data.getProfile();
  }

  get token() {
    return localStorage.getItem("token");
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    ;
  }

  logout() {
    this.data.user = {};
    this.data.cartItems = 0;
    localStorage.clear();
    this.router.navigate([""]);
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(["search", { query: this.searchTerm }]);
    }
  }

  ngAfterContentInit(): void {}

  async getProducts() {
    this.content = null;
    try {
      const data = await this.rest.get(
        `http://localhost:3030/api/search?query=${this.query}&page=${
          this.page - 1
        }`
      );

      data["success"]
        ? (this.content = data["products"])
        : this.data.error(data["message"]);
      console.log(this.content);
      this.content.forEach((element) => {
        console.log(element);
      });
    } catch (error) {
      this.data.error(error["message"]);
    }
  }
  
  myControl = new FormControl();
  options: string[] = ['WS9094-5 Analog-Digital Military Full White Sports Fully Waterproof','APPLE iPad Pro 2021 (5th Generation) 8 GB RAM 512 GB ROM 12.9 inches','TENDA 4G180 3G/4G LTE Advanced 150Mbps Universal Pocket Mobile Wi-Fi','Noise Air Buds Mini Truly Wireless Bluetooth Headset (Pearl White)','The Sleep Company SmartGRID Ortho Mattress','PEPS CASPIA 06 inch King Bonnell Spring Mattress','GREEN SOUL Jupiter High-Back Mesh Office Executive Ergonomic','boAt Rockerz 450 with Upto 15 Hours Playback Bluetooth'];
  filteredOptions: Observable<string[]>;
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  

  

}
