import { Injectable } from '@angular/core';
import { Cart } from 'app/interfaces/cart';
import { ProductsService } from './products.service';

@Injectable()
export class CartService {

  cart: Cart = {
    quantity: 0,
    products: [],
    total: 0
  };

  constructor(private products: ProductsService) { }

  getCart(){
    return this.cart;
  }

  clean(){
    this.cart = {
      quantity: 0,
      products: [],
      total: 0
    };
  }
}
