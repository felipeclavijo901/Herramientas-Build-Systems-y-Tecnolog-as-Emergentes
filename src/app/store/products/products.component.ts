import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/interfaces/product';
import { SessionService } from 'app/services/session.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	product: Product[];

	constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private sessionService: SessionService) {
	}

	async ngOnInit() {
		//Validate session
		this.sessionService.validateSession()
		
		let productName = this.activatedRoute.snapshot.params["name"];
		await this.productsService.validateProducts();

		this.productsService.searchObject(productName, (product) => {
			this.product = [product];
		}, "equal");
	}
}
