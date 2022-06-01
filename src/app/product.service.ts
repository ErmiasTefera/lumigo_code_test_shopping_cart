import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./models/Product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PRODUCT_LIST_URL = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductList() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_LIST_URL);
  }
}
