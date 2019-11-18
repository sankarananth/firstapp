import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import {  } from "module";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit {
  title = 'Product Management';
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete this product?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  username:string;

  constructor(private service:ProductService,private toastr:ToastrService,private router:Router,private authservice:AuthService) { }
  products:Observable<Product[]>
  
  ngOnInit() {
    this.products=this.service.GetProductList();
    this.username=localStorage.getItem('userID')
  }
  DeleteProduct(id:number)
  {
    
      this.service.DeleteProduct(id).subscribe(x=>{
        this.toastr.error('Product Deleted','Awww :(');
      });
    
  this.ngOnInit();
     
  }
  logOut()
 {
   this.authservice.logout();
   this.router.navigate(['login']);
 }
 search(productname:string)
 {
   console.log(productname)
   this.products=this.service.searchProduct(productname);
   if(productname=="")
   {
     this.products=this.service.GetProductList();
   }
 }


}
