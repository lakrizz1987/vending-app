import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../assets/product.service';

@Component({
  selector: 'app-vending-machine',
  imports: [],
  templateUrl: './vending-machine.component.html',
  styleUrl: './vending-machine.component.scss',
  standalone: true
})

export class VendingMachine implements OnInit {
  constructor(private productService: ProductService) {

  }

  ngOnInit(){
    setTimeout(()=>{

      this.productService.getProducts().subscribe(p => console.log(p))
    },2000)
  }
}
