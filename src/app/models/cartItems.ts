import { Cart } from "./cart";
export class CartItem {
  items: Cart[] = [];
  constructor(public itemsMap: { [productId: string]: Cart }) {
    for (let productId in this.itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new Cart(item.product, item.quantity));
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

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }
}
