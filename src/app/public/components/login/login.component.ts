import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loggedIn: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoggeIn() : boolean {
    let checkState = (localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)) ? true : false;
    console.log(`Checking if user is logged in... ${checkState}`);
    return checkState;
  }

  redirectToDashboard() {
    this.authService.login(this.loginForm.value).pipe(
      // route to protected/dashboard, if login was successfull
      tap(() => this.router.navigate(['../../protected/dashboard']))
    ).subscribe();
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }    
    this.authService.login(this.loginForm.value).pipe(
      // route to protected/dashboard, if login was successfull
      tap(() => this.router.navigate(['../../protected/dashboard']))
    ).subscribe();
  }

}
