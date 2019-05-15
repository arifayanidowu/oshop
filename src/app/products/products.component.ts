import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products$;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getAll().valueChanges();
  }
}
