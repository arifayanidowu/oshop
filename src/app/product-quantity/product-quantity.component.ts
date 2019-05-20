import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../services/shopping-cart.service";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.scss"]
})
export class ProductQuantityComponent implements OnInit {
  @Input("product") product: Product;
  @Input("shopping-cart") shoppingCart: any;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
