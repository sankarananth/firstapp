import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  title = 'Product Management';
  productform: FormGroup;
  product: Product = new Product();
  isSubmitted=false;
  constructor(private formBuilder: FormBuilder, private service: ProductService, private toastr: ToastrService,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.productform = this.formBuilder.group({
      productname: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]+$')])],
      productdesc: ['', Validators.compose([Validators.required])],
      manudate: ['', Validators.compose([Validators.required])],
      productprice: ['', Validators.compose([Validators.required])]
    });
  }
  get formControls() {
    return this.productform.controls;
  }
  AddProduct() {
    this.isSubmitted=true;
    if(this.productform.invalid)
    {
      return;
    }
    this.product = this.productform.value;
    this.service.AddProducts(this.product).subscribe(x => { this.toastr.success('Product Added', 'Hooray!') });
    this.ngOnInit();
  }
  logOut()
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
  

}
