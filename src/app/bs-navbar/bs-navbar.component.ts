import { ShoppingCartService } from "./../services/shopping-cart.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/app-user";
import { CartItem } from "../models/cartItems";
import { Observable } from "rxjs";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<CartItem>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.cartService.getCart();
  }

  toggle(nav: HTMLElement) {
    nav.classList.toggle("is-active");
  }

  logout() {
    this.auth.logout();
  }
}
