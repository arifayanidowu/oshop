import { Product } from "src/app/models/product";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService
      .getAll()
      .valueChanges()
      .pipe(
        switchMap((products: any) => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
}
