import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';

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
  route: any;
  spin= false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      mot_pass:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }
  
// Connexion
getConnexion(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const user:User ={
      email: this.registerForm.value.email,
      mot_pass: this.registerForm.value.mot_pass,
      msg: undefined
    }
    console.log(user);
    
    this.authService.getConnexion(user).subscribe((res: any) => {
      console.log(res);
      let prenom = localStorage.getItem('prenom');
      console.log(prenom);
      
      let infoConnexion = res;
          if(infoConnexion.data){
            // setTimeout(()=> this.router.navigateByUrl('home'), 1000);

            this.router.navigateByUrl('index');

          }/* else{
            this.errMsg= "email ou mot de passe incorrect"
          } */
  
    
      
      // localStorage.setItem('access_token', res.token);
      // localStorage.setItem('id', res._id);
      // this.router.navigate(['parent']);
     /*  this.authService.getUserProfile(res._id).subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['inscription']);
      }); */
     
    }, // Intercepter les messages d'erreurs du serveur
    error => {
      if(error == 'Unauthorized'){
        this.errMsg ='Cette utilisateur est archivé'
         this.spin = false
         setTimeout(()=>{ this.errMsg = false}, 3001); 
       }else {
  
       this.errMsg ='Vous  etes pas dans la base de données'
       this.spin = false
       setTimeout(()=>{ this.errMsg= false}, 3001); 
     }
    });
  }

}

