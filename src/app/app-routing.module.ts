import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'product',component:ProductGetComponent,canActivate:[AuthGuard]},
  {path:'addproduct',component:ProductAddComponent,canActivate:[AuthGuard]},
  {path:'updateproduct/:id',component:ProductEditComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
