import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
    price: ['<100', '>200'],
    rating: ['', '', '']
  };
  selected: any;
  private CART_KEY = 'cartItems';

  constructor(private service: ProductService) {
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    console.log(JSON.parse(localStorage.getItem(this.CART_KEY)));
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
    }, (error => {
      this.isLoading = false;
    }));
  }

  addProductToCart(product: Product) {
    // if product is already in cart, increment the quantity, otherwise add to cart list
    const indexOfProduct = this.cartItems.findIndex(f => f.id === product.id);
    if(indexOfProduct !== -1) {
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

  onPriceFilter(filter: number) {
    console.log(filter)
    console.log(this.filter.price[filter]);
    if (filter === 0) {
      console.log('p1')
      console.log(this.productList)
      this.productList = this.productList$.filter(f => f.price < 100);
    }
    if (filter === 1) {
      console.log('p2')
      this.productList = this.productList$.filter(f => f.price > 200);
    }

    else {
      this.productList = this.productList$;
    }
  }
}
