import { Injectable } from '@angular/core';
import { Product } from 'app/interfaces/product';
import { HttpService } from './http.service';

@Injectable()
export class ProductsService {

  products: Product[];
  filteredProducts: Product[];

  constructor(private http: HttpService) { }

  async setProducts()
  {
    let response = await this.http.getProducts();
    this.products = response.json();
    this.filteredProducts = response.json();
  }

  async validateProducts(){
    if(this.products == undefined)
      await this.setProducts();
  }
  
  getProducts()
  {
    return this.products;
  }
  
  getFilteredProducts()
  {
    return this.filteredProducts;
  }

  searchObject(needle: string, callback: Function = () => {}, type: string = "like", field: string = "name", haystack = this.products){

    haystack.forEach((element) => {
      let specificHaystack = this.cleanText(element[field]);
      let specificNeedle = this.cleanText(needle);
      
      if(type == "equal" && element[field] == needle){
        callback(element);
      }else if (type == "like" && specificHaystack.indexOf(specificNeedle) != -1){
        callback(element);
      }
    });
    
  }

  cleanText(text):string {

      var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {}

      for (var i = 0; i < from.length; i++){
          mapping[from.charAt(i)] = to.charAt(i);
      }
          
      var ret = [];
      for (var i = 0; i < text.length; i++) {
          var c = text.charAt(i);
          if (mapping.hasOwnProperty(text.charAt(i))){
              ret.push(mapping[c]);
          }
          else{
              ret.push(c);
          }
      }
      return ret.join('').toLowerCase();
  }

  async buyProducts(products: Product[]){
    await this.http.setProducts(products).subscribe((data) => console.log(data));
  }
}
