import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Observable, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./user.service";
import { AppUser } from "../models/app-user";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "";
    localStorage.setItem("returnUrl", JSON.stringify(returnUrl));
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        this.falsify(user);
        this.userService.save(user.user);
        let redirectUrl = JSON.parse(localStorage.getItem("returnUrl"));
        this.falsify(redirectUrl);
        localStorage.removeItem("returnUrl");
        this.router.navigateByUrl(redirectUrl);
      });
    // this.afAuth.auth.signInWithRedirect(new auth.GithubAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    );
  }

  falsify(data) {
    if (!data) return;
  }
}
