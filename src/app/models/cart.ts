import { OnInit } from "@angular/core";
import { Product } from "./product";
export class Cart extends OnInit {
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(init?: Partial<Cart>) {
    super();
    Object.assign(this, init);
  }
  ngOnInit(): void {
    if (this.quantity === undefined) {
      this.quantity = 0;
    }
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
