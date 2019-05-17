import { Cart } from "./cart";
export class CartItem {
  constructor(public items: Cart[]) {}

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
