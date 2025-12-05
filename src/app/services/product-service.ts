import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[] = [];
  productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

    if (isReload) {
      sessionStorage.removeItem('products');
    }

    const cached = sessionStorage.getItem('products');
    if (cached) {
      this.products = JSON.parse(cached);
      this.productsSubject.next(this.products);
      return;
    }

    this.http.get<Product[]>('assets/products.json').subscribe(products => {
      this.products = products;
      this.productsSubject.next(products);
      sessionStorage.setItem('products', JSON.stringify(products));
    });
  }

  purchaseProduct(product: Product) {
    const updatedProduct = { ...product, quantity: product.quantity - 1 };
    this.products = this.products.map(p => p.id === product.id ? updatedProduct : p);
    this.productsSubject.next(this.products);
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }

  addProduct(name: string, quantity: number, price: number) {
    if (this.products.length === 15) {
      alert('No empty slots available!');
      return;
    }
    
    const id = uuidv4();
    const newProduct: Product = { id, name, price, quantity, maxQuantity: 15, isEditing: false };
    this.products.push(newProduct);
    this.productsSubject.next(this.products);
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }

  deleteProduct(id: Product["id"]) {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next(this.products);
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }

  editProduct(id: Product["id"], name: string, quantity: number, price: number) {
    const index = this.products.findIndex(p => p.id === id);

    const updatedProduct: Product = {
      ...this.products[index],
      name,
      quantity,
      price,
      isEditing: false
    };

    this.products[index] = updatedProduct;
    this.productsSubject.next(this.products);
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }

}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  isEditing: boolean;
}
