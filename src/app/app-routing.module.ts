import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './store/cart/cart.component';
import { ProductsComponent } from './store/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/cart', component: CartComponent },
  { path: 'store/products/:name', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
