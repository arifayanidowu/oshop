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
  @Input("shopping-cart") shoppingCart: any;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product, this.product.key);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product, this.product.key);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
