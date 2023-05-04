import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
/* 
  registerForm!: FormGroup;
  title = 'login';
  submitted = false;
  spin = false;
  errorSms = false;
  message: string = '';

  constructor(private formBuilder: FormBuilder) { }
    ngOnInit(){

      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    onSubmit(){

      this.submitted = true
      this.spin = true

      if (this.registerForm.invalid) {
        this.spin = false
        return;
      }

    } */
    registerForm!: FormGroup;
  submitted = false;
  errMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }
// Connexion
  loginUser(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.login(this.registerForm.value).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('id', res._id);

      this.authService.getUserProfile(res._id).subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['inscription']);
      });
    }, // Intercepter les messages d'erreurs du serveur
    error => {
      this.errMsg = error.error.message
     
    });
  }

}

