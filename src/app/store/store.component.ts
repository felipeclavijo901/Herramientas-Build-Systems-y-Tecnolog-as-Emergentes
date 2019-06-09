import { Component, OnInit } from '@angular/core';
import { HttpService } from 'app/services/http.service';
import { Product } from 'app/interfaces/product';
import { ProductsService } from 'app/services/products.service';
import { CartService } from 'app/services/cart.service';
import { elementAt } from 'rxjs/operator/elementAt';
import { Cart } from 'app/interfaces/cart';
import { SessionService } from 'app/services/session.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: Product[];
  filteredProducts: Product[] = [];
  cart: Cart;

  constructor(private http: HttpService, private productsService: ProductsService, private cartService: CartService, private sessionService: SessionService) { }

  async ngOnInit()
  {
    //Validate session
    this.sessionService.validateSession()

    await this.productsService.validateProducts();
    this.products = this.productsService.getProducts();
    this.filteredProducts = this.productsService.getFilteredProducts();
    this.cart = this.cartService.getCart();
  }

  addCart(event, product)
  {
    //Get necessary data
    let quantity = parseInt(event.target.nextSibling.nextSibling.value);
    let productName = product.name;
    let validateProduct = false;
    let productClone = Object.assign({}, product);
    
    //Clean product clone
    productClone.quantity = quantity;

    //Validate product
    this.productsService.searchObject(productName, (productCart: Product) => 
    {
      validateProduct = true;
      productCart.quantity += quantity;
    }, "equal", "name", this.cart.products);

    //Create new cart product
    if(!validateProduct)
    {
      this.cart.quantity++;
      this.cart.products.push(productClone);
    }

    //Total incremente
    this.cart.total += productClone.price * quantity;

    //Subtract product quantity
    product.quantity -= quantity;
    this.productsService.searchObject(productName, (product: Product) => 
    {
      product.quantity -= quantity;
    }, "equal", "name", this.products);

    //Clean input
    event.target.nextSibling.nextSibling.value = 0;
  }

  filterProducts(event)
  {
    let value = event.target.value;
    let filter: Product[] = [];
    this.productsService.searchObject(value, (product) => {
      filter.push(product);
    }, "like", "name", this.products);

    this.filteredProducts = filter;
  }

  validateQuantity(event, product)
  {
    let quantity = parseInt(event.target.value);

    if(quantity > product.quantity){
      event.target.value = product.quantity;
    }else if(quantity < 0){
      event.target.value = 0;
    }
  }

}
