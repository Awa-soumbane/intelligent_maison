import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/must-match.validator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit{

currentUser: any = {};
filterTerm!: string;
Users: any = [];
user: any;
totalLenght: any;
registerForm: FormGroup
submitted = false;
errMsg:any = true;
userCollection: any;
pass!: string;
spin= false;



  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {

      // Recuperer les informations de l'utilisateur
      /*    let id = localStorage.getItem('id');  
     this.authService.getUserProfile(id).subscribe((res) => {
       this.currentUser = res.msg;

     });

     this.formGroup = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email]],
    }
    ); */

          //controle de saisi modif mot de passe
          this.registerForm = this.formBuilder.group({
            actuelpassword:['', [Validators.required, Validators.minLength(6)],],
            newpassword:['', [Validators.required, Validators.minLength(6)],],
            confirmdp:['', [Validators.required],]
          }, { validator: MustMatch('newpassword', 'confirmdp') }
          );
  }
 


 /*  ngOnInit(): void {
    this.authService.GetUsers().subscribe(
      data => {
        this.user = data;
        this.Users = this.user.filter((e: any) => e.etat == true)
       
      }
    );
  } */
ngOnInit(): void {
  
}


     //modification password
     update1User(){
      const id =  this.registerForm.value.id;    
      const userCollection={
        actuelpassword: this.registerForm.value.actuelpassword,
        newpassword: this.registerForm.value. newpassword,
       confirmdp: this.registerForm.value.confirmdp 
     }
     
     this.submitted = true;
     if(this.registerForm.invalid){
       
      return ;
     }
       // retourne a la page deconnection apres le popup modification reussi
       return this.authService.update1User(localStorage.getItem('id'),userCollection).subscribe((data)=>{
        
         
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Modification  mot de passe réussi !',
          showConfirmButton: false,
          timer: 1500
        });
       this.authService.doLogout()
       },
       (err)=>{
           this.pass="mot de passe actuel est incorrect ";
           this.spin = false
           setTimeout(()=>{ this.errMsg= false}, 3001); 
       })

     
         } 



         
 
}