import { CartItem } from "./../models/cartItems";
import { ShoppingCartService } from "./../services/shopping-cart.service";
import { Product } from "src/app/models/product";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product;
  @Input("show-actions") showActions: boolean = true;
  @Input("shopping-cart") shoppingCart: CartItem;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
