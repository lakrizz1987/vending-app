import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product-service';

@Component({
  selector: 'app-settings-component',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true
})
export class SettingsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.productsSubject.subscribe(p => {
      this.products = p
    });
  }

  onDelete(id: Product["id"]) {
    this.productService.deleteProduct(id);
  }
}
