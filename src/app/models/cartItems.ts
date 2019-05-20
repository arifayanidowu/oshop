import { Product } from "src/app/models/product";
import { Cart } from "./cart";
export class CartItem {
  items: Cart[] = [];
  constructor(public itemsMap: { [productId: string]: Cart }) {
    this.itemsMap = this.itemsMap || {};

    for (let productId in this.itemsMap) {
      let item = itemsMap[productId];
      let x = new Cart();
      Object.assign(x, item);
      x.key = productId;
      this.items.push(x);
    }
  }

  get productIds() {
    return Object.keys(this.itemsMap);
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
