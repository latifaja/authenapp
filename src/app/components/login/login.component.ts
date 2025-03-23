import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',

  styleUrl: './login.component.css'
})
export class LoginComponent {
  login={
    email:"",
    password:"",
  };
private authService=inject(AuthService);
private router=inject(Router);
successMessage: string | null = null; 
errorMessage: string | null = null; 
  onLogin(){
    const {email,password}=this.login;
    this.successMessage = null;
    this.errorMessage = null;
    this.authService.getUserDetails(email,password).subscribe({
      next:(response)=>{
        if(response.length>=1){ 
          this.successMessage = "Login successful!";
          sessionStorage.setItem('email',email);
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1000);
      }else{
        this.errorMessage = "Invalid email or password.";
      }
      },
      error:(err) => {
        this.errorMessage = "Login failed. Please try again.";
        console.error("Login failed", err);
      }
    });
  }

}
