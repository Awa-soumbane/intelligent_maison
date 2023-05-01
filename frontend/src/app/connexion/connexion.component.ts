/* import { Component } from '@angular/core';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

} */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';

import { Temp_Humid } from '../services/interfaces/movie';
import { WebsocketService } from '../services/websocket.service';
import { Serre } from '../models/serre'; */
// import { data } from 'jquery';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent  implements OnInit {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  verifPass: any = true;
  invalid= false;
  errorMsg:any;
  
 
  email: any;
  


  constructor( private formBuilder: FormBuilder ,private route: Router) {
    
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      
      password:['',[Validators.required,Validators.minLength(8)]],
      
      })
    
  
  
       
  }

  
onSubmit(){
this.submitted = true
this.spin = true

//  if(this.registerForm.invalid){
//  /*  this.spin = false */
//  console.log("errr")
//   return ;
// } 

 /* /insertion sur la base de données/ */
  const user ={
 
   email : this.registerForm.value. email,
   password: this.registerForm.value. password,
  
  }
  
 

}
}



