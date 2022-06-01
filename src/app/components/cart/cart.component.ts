import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() cartItems: Product[] | undefined;
  @Output() onItemRemoved = new EventEmitter<Product>();

  constructor() {
  }

  ngOnInit(): void {
  }

  removeItem(product: Product) {
    const indexToRemove = this.cartItems.findIndex(f => f.id !== product.id);
    this.cartItems.splice(indexToRemove, 1) ;
    this.onItemRemoved.emit(product);
  }
}
