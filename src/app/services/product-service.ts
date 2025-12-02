import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  products: Product[] = [];
  productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getProducts() {
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
  }

  addProduct(name: string, quantity: number, price: number) {
    const id = uuidv4();
    const newProduct: Product = {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
      maxQuantity: 15
    };
    this.products.push(newProduct);
    this.productsSubject.next(this.products);
  }
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}
