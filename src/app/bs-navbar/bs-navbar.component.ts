import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/app-user";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.scss"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  toggle(nav: HTMLElement) {
    nav.classList.toggle("is-active");
  }

  logout() {
    this.auth.logout();
  }
}
