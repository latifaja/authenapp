import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  
import {passwordMismatchValidator} from '../../shared/password-mismatch.directive'
import { AuthService } from '../../services/auth.service';
import { SignupPostData } from '../../intrfaces/auth';
 
@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [
    RouterLink ,ReactiveFormsModule,  CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private signupService=inject(AuthService);
  private router=inject(Router);
  signupForm=new FormGroup({
    fullName:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required, Validators.email]),
    password:new FormControl("",[Validators.required]),
    confirmPassword:new FormControl("",[Validators.required]),


  },{validators:passwordMismatchValidator});
  onsignup(){
    const postData={...this.signupForm.value};
    delete postData.confirmPassword;
   this.signupService.signupUser(postData as SignupPostData).subscribe({
    next : (response)=>{
      console.log(response);
      this.router.navigate(['login']);
    },
    error:(err)=>{
      console.log(err);
    },
   });
  }
  get fullName(){
    return this.signupForm.controls['fullName'];
  }
  
  get email() {
    return this.signupForm.controls['email'];
  }
  
  get password() {
    return this.signupForm.controls['password'];
  }
  
  get confirmPassword() {
    return this.signupForm.controls['confirmPassword'];
  }
  
}
