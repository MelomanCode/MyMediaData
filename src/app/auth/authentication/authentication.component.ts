import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  firebaseErrorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['/admin-panel-list']).then();
      }
    });
  }

  tryGoogleLogin(): void {
    this.authService.loginGoogle().then((result) => {
      if (result == null) {
        console.log('logging in...');
        this.router.navigate(['/admin-panel-list']).then();
      } else if (!result.isValid) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

  returnBtn() {
    this.router.navigate(['/home']).then();
  }
}
