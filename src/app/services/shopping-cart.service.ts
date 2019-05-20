import { Observable } from "rxjs";
import { CartItem } from "./../models/cartItems";
import { Router } from "@angular/router";
import { Cart } from "./../models/cart";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { take, map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase, private router: Router) {}

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<CartItem>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(map((x: CartItem) => new CartItem(x.items)));
  }

  private getItem(cartId: string, productId: any) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = JSON.parse(localStorage.getItem("cartId"));
    if (cartId) return cartId;
    const results = await this.create();
    localStorage.setItem("cartId", JSON.stringify(results.key));
    return results.key;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = await this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: Cart) => {
        let quantity = (item.quantity || 0) + change;
        console.log(quantity);
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity
          });
        }
      });
  }
}
