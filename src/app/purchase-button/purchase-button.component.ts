import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, ProductService } from '../services/product-service';
import { VendingMessages } from '../vending-machine/vending-machine.component';

@Component({
  selector: 'app-purchase-button',
  imports: [],
  templateUrl: './purchase-button.component.html',
  styleUrl: './purchase-button.component.scss',
})

export class PurchaseButton {


  @Input() product!: Product;
  @Input() currentBalance: number = 0;
  @Output() purchaseDone: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) { }

  buyProduct() {
    if (this.currentBalance >= this.product.price) {
      this.productService.purchaseProduct(this.product);
      this.emitPurchaseDone();
    }
  }

  emitPurchaseDone() {
    const message = this.currentBalance > this.product.price ?
      VendingMessages.TAKE_PURCHASE_AND_CHANGE : VendingMessages.TAKE_PURCHASE;

    this.purchaseDone.emit(message);
  }
}
