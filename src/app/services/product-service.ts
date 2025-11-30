import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  products: Product[] = [];
  productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor(private http: HttpClient) { }

  getProducts(): void {
    this.http.get<Product[]>('assets/products.json').subscribe(products => {
      this.products = products;
      this.productsSubject.next(products);
    });
  }

  purchaseProduct(product: Product) {
    const updatedProduct: Product = { ...product, quantity: product.quantity - 1 };
    this.products = this.products.map(p =>
      p.id === product.id ? updatedProduct : p
    );

    this.productsSubject.next(this.products);
    console.log(this.products)
  }
}

export interface Product {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}
