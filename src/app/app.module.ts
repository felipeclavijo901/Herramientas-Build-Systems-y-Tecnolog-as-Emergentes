import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './store/cart/cart.component';
import { ProductsComponent } from './store/products/products.component';
import { HomeComponent } from './home/home.component';

import { HttpService } from './services/http.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    StoreComponent,
    CartComponent,
    ProductsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    ProductsService,
    CartService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
