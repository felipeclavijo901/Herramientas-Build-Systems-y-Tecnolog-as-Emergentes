import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  async getProducts(){
    const response = await this.http.get("https://la-bodega-55cba.firebaseio.com/products.json").toPromise();
    return response;
  }

  setProducts(products){
    let data = JSON.stringify(products);
    return this.http.put("https://la-bodega-55cba.firebaseio.com/products.json", products);
  }

  async validateUser(){

    const response = this.http.get("https://la-bodega-55cba.firebaseio.com/users.json").toPromise();
    return response;
  }
}
