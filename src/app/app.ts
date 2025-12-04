import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product-service';
import { Paths } from './enums/Paths.enum';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


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

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getProducts();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showLoginButton = event.urlAfterRedirects !== '/' + Paths.Login;
      });
  }

  onLogin() {
    this.router.navigate([Paths.Login]);
  }

}
