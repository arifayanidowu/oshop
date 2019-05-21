import { Product } from "./product";
export class Cart {
  key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  constructor(init?: Partial<Cart>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
