import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paths } from '../enums/Paths.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  usernameError: string | null = null;
  passwordError: string | null = null;

  credentials: Credentials = {
    username: "admin",
    password: "admin",
  };

  constructor(
    private router: Router,
    private location: Location
  ) { }

  login() {
    if (this.username !== this.credentials.username) {
      this.usernameError = 'Invalid username!';
    }

    if (this.password !== this.credentials.password) {
      this.passwordError = 'Invalid password!';
    }

    if (this.usernameError || this.passwordError) {
      return;
    }

    sessionStorage.setItem('user', 'adrmin');
    this.location.back();
  }

  onBack() {
    this.router.navigate([Paths.Home]);
  }
}

interface Credentials {
  username: string;
  password: string;
}
