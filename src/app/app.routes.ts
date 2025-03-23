import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { UploadComponent } from './components/upload/upload.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},

    {path:"home",component:HomeComponent,canActivate:[authGuard],
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "products", component: ProductsComponent },
            { path: "upload", component: UploadComponent }
           
          ]

    },
   
    { path: '**', redirectTo: 'login' } 
];

