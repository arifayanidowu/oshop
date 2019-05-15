import { Product } from "src/app/models/product";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { CategoryService } from "../services/category.service";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
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

    this.categories$ = this.categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map(cat => cat.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      );
  }
}
