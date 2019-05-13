import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
}
