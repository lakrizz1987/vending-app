import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  title: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json');
  }
}
