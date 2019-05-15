import { CategoryService } from "src/app/services/category.service";
import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";
import { Product } from "src/app/models/product";

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"]
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input("category") category: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map(cat => cat.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      );
  }
}
