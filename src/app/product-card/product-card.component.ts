import { Product } from "src/app/models/product";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  constructor() {}

  ngOnInit() {}
}
