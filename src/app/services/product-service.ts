import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
}

export interface Product {
  title: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}
