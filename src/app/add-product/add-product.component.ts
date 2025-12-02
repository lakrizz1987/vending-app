import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProduct {
  name: string = '';
  quantity: number | null = null;
  price: number | null = null;
  isNameExist: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  onBack() {
    this.router.navigate(['/']);
  }

  addProduct() {
    this.isNameExist = this.productService.products.some(p => p.name.toLocaleLowerCase() === this.name.toLocaleLowerCase());
    if (this.isNameExist) {
      return;
    }

    if (this.name && this.quantity && this.price) {
      this.productService.addProduct(this.name, this.quantity, this.price);
      this.resetInputs();
    }
  }

  resetInputs() {
    this.name = '';
    this.quantity = null;
    this.price = null;
  }
}
