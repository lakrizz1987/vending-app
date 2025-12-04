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

  onEdit(product: Product) {
    const searchedProductIndex = this.products.findIndex((p: Product) => p.id === product.id);
    this.products[searchedProductIndex].isEditing = true;
  }

  onSave(product: Product, name: string, quantity: string, price: string) {
    const qty = Number(quantity);
    const prc = Number(price);

    if (!this.isValidVendingPrice(prc)) {
      alert('Price must be a multiple of 0.05!');
      return;
    }

    if (qty > 15 || qty < 1) {
      alert('Quantity must be at least 1 and at most 15');
      return;
    }

    product.isEditing = false;
    this.productService.editProduct(product.id, name, qty, prc);
  }

  isValidVendingPrice(price: number): boolean {
    const cents = Math.round(price * 100);
    return cents % 5 === 0;
  }
}
