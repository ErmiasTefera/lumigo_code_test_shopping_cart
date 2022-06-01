import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/product/product.component';
import {CommonModule, registerLocaleData} from "@angular/common";
import { CartComponent } from './components/cart/cart.component';
import {FormsModule} from "@angular/forms";
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from "@angular/material/radio";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzInputModule} from "ng-zorro-antd/input";

registerLocaleData(en);

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
        MatRadioModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
      NzFormModule,
      NzRateModule,
      NzInputModule
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
