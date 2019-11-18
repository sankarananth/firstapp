import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private rootUrl="https://localhost:44338/api" ;
  constructor(private http:HttpClient) { }

  GetProductList():Observable<any>
  {
      return this.http.get(this.rootUrl+'/Products');
  }
  AddProducts(product:Product)
  {
    return this.http.post(this.rootUrl+'/Products',product)
  }
  GetProduct(id:number):Observable<any>
  { 
    return this.http.get(this.rootUrl+'/Products/'+id)

  }
  UpdateProduct(id:number,product:Product)
  {
    return this.http.put(this.rootUrl+'/Products/'+id,product)
  }
  DeleteProduct(id:number)
  {
    return this.http.delete(this.rootUrl+'/Products/'+id)
  }
  searchProduct(name:string):Observable<any>
  {
    return this.http.get(this.rootUrl+'/Products?name='+name)
  }
}
