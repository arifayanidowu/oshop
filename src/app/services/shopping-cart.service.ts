import { Cart } from "./../models/cart";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object(`/shopping-carts/${cartId}`).valueChanges();
  }

  private async getOrCreateCartId() {
    const cartId = JSON.parse(localStorage.getItem("cartId"));
    if (cartId) return cartId;
    const results = await this.create();
    localStorage.setItem("cartId", JSON.stringify(await results.key));
    return results.key;
  }

  async addToCart(product: Product, key: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object(`/shopping-carts/${cartId}/items/${key}`);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: Cart) =>
        item
          ? item$.update({ quantity: item.quantity + 1 })
          : item$.set({ product, quantity: 1 })
      );
  }
}
