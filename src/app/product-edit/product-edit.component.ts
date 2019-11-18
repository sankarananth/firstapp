import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
isSubmitted=false;
  title = 'Product Management';
  product:Product=  new Product;
  productform: FormGroup;
  constructor(private service:ProductService,private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private toastr:ToastrService,private authservice:AuthService) { }
id:number;
  ngOnInit() {
    this.id=this.route.snapshot.params["id"];
    console.log(this.id);
    this.service.GetProduct(this.id).subscribe(x=>{
     x.forEach(element=>{
      this.product.productid=element["productid"];
      this.product.productname=element["productname"];
      this.product.productdesc=element["productdesc"];
      this.product.manudate=element["manudate"];
      this.product.manudatestr=element["productDate"]
      this.product.productprice=element["productprice"];
     });
      console.log(this.product);
    });
    
    this.productform=this.formBuilder.group({
      productid: [Validators.compose([Validators.required])],
      productname :[Validators.compose([Validators.required])],
      productdesc :[Validators.compose([Validators.required])],
      manudate:[Validators.compose([Validators.required])],
      productprice:[Validators.compose([Validators.required])]
    });
  }
  get formControls()
 {
   return this.productform.controls;
 }
 UpdateProduct()
 {
   this.isSubmitted=true;
   if(this.productform.invalid)
    {
      return;
    }
   this.product.productid=this.productform.controls.productid.value;
   this.product.productname=this.productform.controls.productname.value;
   this.product.productdesc=this.productform.controls.productdesc.value;
   this.product.manudate=this.productform.controls.manudate.value;
   this.product.productprice=this.productform.controls.productprice.value;
   this.service.UpdateProduct(this.id,this.product).subscribe(res=>{
     this.toastr.success('Update Successfull','Yipeee!')
   })
 }
 logOut()
 {
   this.authservice.logout();
   this.router.navigate(['login']);
 }

}
