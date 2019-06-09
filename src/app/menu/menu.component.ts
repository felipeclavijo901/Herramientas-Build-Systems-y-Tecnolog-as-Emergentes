import { Component, OnInit } from '@angular/core';
import { Cart } from 'app/interfaces/cart';
import { CartService } from 'app/services/cart.service';
import { SessionService } from 'app/services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService, private sessionService: SessionService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  logOut(){
    this.sessionService.logOut();
    return false;
  }

}
