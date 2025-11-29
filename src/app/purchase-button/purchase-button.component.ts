import { Component, Input } from '@angular/core';
import { Product } from '../services/product-service';

@Component({
  selector: 'app-purchase-button',
  imports: [],
  templateUrl: './purchase-button.component.html',
  styleUrl: './purchase-button.component.scss',
})

export class PurchaseButton {
  @Input() product!: Product;
}
