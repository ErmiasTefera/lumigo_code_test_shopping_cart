import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product | undefined;
  @Output() onAddToCart = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    this.onAddToCart.emit(this.product);
  }
}
