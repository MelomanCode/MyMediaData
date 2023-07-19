import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn = false;

  constructor(private router: Router, private auth: AngularFireAuth) {
    this.auth
      .onAuthStateChanged((user) => {
        this.userLoggedIn = !!user;
      })
      .then();
  }

  loginGoogle(): Promise<any> {
    return this.auth
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => {
        console.log('Auth Service: Authentication success');
      })
      .catch((error) => {
        console.log(
          'Auth Service: Authentication error, ' + error.code + ' ' + error
        );
        return { isValid: false, message: error.message };
      });
  }
}
