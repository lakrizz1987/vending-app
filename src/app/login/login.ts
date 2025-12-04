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

  constructor(private router: Router) {

  }

  login() {
    if (!this.username) {
    
    }
    if (!this.password) {
      
    }

    if (!this.usernameError && !this.passwordError) {
      // Тук сложи логика за автентикация
      console.log('Logging in:', this.username, this.password);
    }
  }

  onBack() {
    this.router.navigate([Paths.Home]);
  }
}
