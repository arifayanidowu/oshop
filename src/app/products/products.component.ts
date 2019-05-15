import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$;
  categories$;
  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.products$ = this.productService.getAll().valueChanges();
    this.categories$ = this.categoryService.getCategories().valueChanges();
  }

}
