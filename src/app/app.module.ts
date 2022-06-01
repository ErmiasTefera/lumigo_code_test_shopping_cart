import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/product/product.component';
import {CommonModule} from "@angular/common";
import { CartComponent } from './components/cart/cart.component';
import {FormsModule} from "@angular/forms";
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    LoadingCardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        MatRadioModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
