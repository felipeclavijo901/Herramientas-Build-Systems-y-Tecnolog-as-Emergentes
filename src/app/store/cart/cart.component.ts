import { Component, OnInit } from '@angular/core';
import { Cart } from 'app/interfaces/cart';
import { CartService } from 'app/services/cart.service';
import { Router } from '@angular/router';
import { Product } from 'app/interfaces/product';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart;
  products: Product[];

  constructor(private cartService: CartService, private router: Router, private productsService: ProductsService) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();

    await this.productsService.validateProducts();
    this.products = this.productsService.getProducts();

    if(this.cart.quantity == 0){
      this.router.navigate(['store']);
    }
  }

  async cancel(){
    await this.productsService.setProducts();
    this.cartService.clean();
    this.router.navigate(['store']);
  }

  async pay(){
    await this.productsService.buyProducts(this.products);
    this.cartService.clean();
    this.router.navigate(['store']);
  }
}
