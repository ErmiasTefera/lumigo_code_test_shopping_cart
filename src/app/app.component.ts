import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./models/Product";
import {CartComponent} from "./components/cart/cart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = true;
  productList: Product[] = [];
  productList$: Product[] = []; // used for filter
  cartItems: Product [] = [];

  @ViewChild(CartComponent) cartComponent: CartComponent;
  searchText: any;
  filter = {
    price: {
      min: null,
      max: null
    },
    rating: null,
  };
  private CART_KEY = 'cartItems';

  constructor(private service: ProductService) {
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.cartItems = JSON.parse(localStorage.getItem(this.CART_KEY)) || [];
    this.service.getProductList().subscribe(products => {
      this.productList = products;
      if (this.cartItems.length > 0) {
        this.cartItems.forEach((cartItem: Product) => {
          const index = this.productList.findIndex(f => cartItem.id === f.id);
          this.productList[index].quantityInCart = cartItem.quantityInCart;
        });
      }
      this.productList$ = [...this.productList];
      this.isLoading = false;
    }, (() => {
      this.isLoading = false;
    }));
  }

  addProductToCart(product: Product) {
    // if product is already in cart, increment the quantity, otherwise add to cart list
    const indexOfProduct = this.cartItems.findIndex(f => f.id === product.id);
    if (indexOfProduct !== -1) {
      this.cartItems[indexOfProduct].quantityInCart = product.quantityInCart;
    } else {
      this.cartItems.push(product);
    }
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  onProductRemovedFromCart(product: Product) {
    const productIndex = this.productList.findIndex(f => f.id === product.id);
    this.productList[productIndex].quantityInCart = 0;
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  onSearch(searchStr: any) {
    this.productList = this.productList$.filter(f => f.title.toLowerCase().includes(searchStr.toLocaleString()));
  }

  resetFilter() {
    this.filter.rating = 0;
    this.filter.price.min = null;
    this.filter.price.max = null;
    this.productList = [...this.productList$];
  }

  applyFilter() {
    let filteredProducts = [...this.productList$];
    // filter by rating
    if (this.filter.rating) {
      filteredProducts = this.productList$.filter(f => Number.parseInt(f.rating.rate.toString()) === this.filter.rating);
    }

    // filter by price
    filteredProducts = filteredProducts.filter(f => {
      const isMinValid = (this.filter.price.min ? (f.price > this.filter.price.min) : true);
      const isMaxValid = this.filter.price.max ? (f.price < this.filter.price.max) : true;
      console.log(f.price, isMinValid, isMaxValid, isMinValid && isMaxValid);
      return isMinValid && isMaxValid;
    });
    this.productList = [...filteredProducts];
  }
}
