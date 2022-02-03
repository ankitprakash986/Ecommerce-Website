import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
