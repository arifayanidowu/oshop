import { Cart } from "./cart";
export class CartItem {
  items: Cart[] = [];
  constructor(public itemsMap: { [productId: string]: Cart }) {
    for (let productId in this.itemsMap) {
      this.items.push(itemsMap[productId]);
    }
  }

  get productIds() {
    return Object.keys(this.itemsMap);
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
