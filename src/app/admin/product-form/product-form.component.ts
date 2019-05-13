import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { Observable } from "rxjs";
import { AngularFireList } from "@angular/fire/database";
import { ProductService } from "src/app/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.productService
        .get(id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories().valueChanges();
  }
  save(product) {
    this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
}
