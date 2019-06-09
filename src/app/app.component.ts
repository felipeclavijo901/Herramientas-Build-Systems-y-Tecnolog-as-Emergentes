import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnInit{

  constructor(private productsService: ProductsService){
    super();
  }

  async ngOnInit() {
    const response = await this.productsService.setProducts();
  }
  
}
