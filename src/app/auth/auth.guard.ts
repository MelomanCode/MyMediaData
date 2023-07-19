import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      this.auth
        .onAuthStateChanged((user) => {
          if (user?.email !== 'kezik.96@gmail.com') {
            console.log('Auth Guard: user is not admin!');
            this.router.navigate(['/home']).then();
            resolve(false);
          }
          if (user) {
            resolve(true);
          } else {
            console.log('Auth Guard: user is not logged in');
            this.router.navigate(['/authentication']).then();
            resolve(false);
          }
        })
        .then();
    });
  }
}
