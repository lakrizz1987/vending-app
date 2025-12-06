import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Paths } from './enums/Paths.enum';
import { ProductService } from './services/product-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true
})

export class App {
  
  protected title = 'vending-app';
  showLoginButton: boolean = false;
  isUserLogged: boolean = false;

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getProducts();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.showLoginButton = event.urlAfterRedirects !== '/' + Paths.Login;
        this.isUserLogged = sessionStorage.getItem('user') !== null;
      });
  }

  onLogin() {
    this.router.navigate([Paths.Login]);
  }

  onLogout() {
    this.isUserLogged = false;
    sessionStorage.removeItem('user');
    this.router.navigate([Paths.Home]);
  }

  goToCreate() {
    this.router.navigate([Paths.AddProduct]);
  }

  goToSetting() {
    this.router.navigate([Paths.Settings]);
  }
}
