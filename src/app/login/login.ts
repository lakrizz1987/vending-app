import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Paths } from '../enums/Paths.enum';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  usernameError: string | null = null;
  passwordError: string | null = null;

  constructor(private router: Router) {

  }

  login() {
    if (!this.username) {
      this.usernameError = 'Username is required';
    }
    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    if (!this.usernameError && !this.passwordError) {
      console.log('Logging in:', this.username, this.password);
    }
  }

  onBack() {
    this.router.navigate([Paths.Home]);
  }
}
