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
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories().valueChanges();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?")) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
