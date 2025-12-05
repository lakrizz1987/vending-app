import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurchaseButton } from "../purchase-button/purchase-button.component";
import { Product, ProductService } from '../services/product-service';

@Component({
  selector: 'app-vending-machine',
  imports: [FormsModule, PurchaseButton, CommonModule],
  templateUrl: './vending-machine.component.html',
  styleUrl: './vending-machine.component.scss',
  standalone: true
})

export class VendingMachine implements OnInit {
  acceptedCoins: CoinsMap = {
    BGN: [0.05, 0.1, 0.2, 0.5, 1, 2]
  };

  amount: number | null = null;
  currency: string = 'BGN';
  balance: number = 0;
  displayMessage: string = VendingMessages.INSERT_COIN;
  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.productsSubject.subscribe(p => {
      this.products = p
    });
  }

  insertMoney() {
    if (!this.amount) {
      return;
    }

    if (this.isValidCoin(this.amount, this.currency)) {
      this.balance = Number((this.balance + this.amount).toFixed(2));
      this.amount = null;
    } else {
      this.changeDisplayMessage(VendingMessages.INVALID_COIN);
      this.amount = null;
    }
  }

  isValidCoin(amount: number, currency: string): boolean {
    return this.acceptedCoins[currency]?.includes(amount) ?? false;
  }

  onCancel() {
    this.amount = null;
    this.balance = 0;
    this.changeDisplayMessage(VendingMessages.ORDER_CANCELED);
  }

  changeDisplayMessage(message: VendingMessages | string) {
    this.displayMessage = message;
    setTimeout(() => {
      this.displayMessage = VendingMessages.INSERT_COIN;
    }, 5000);
  }

  onPurchase(message: string) {
    this.balance = 0;
    this.changeDisplayMessage(message);
  }
}


type CoinsMap = {
  [key: string]: number[];
};

export enum VendingMessages {
  INSERT_COIN = 'Please insert coin !',
  INVALID_COIN = 'Invalid coin !!!',
  TAKE_PURCHASE = 'Please take your order!',
  TAKE_PURCHASE_AND_CHANGE = 'Please take your order and your change!',
  ORDER_CANCELED = 'Order canceled, please take your coins!'
};

