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

submitted = false;
errMsg:any = false;
userCollection: any;
pass!: string;
spin= false;
formGroup!: FormGroup;
message:any



  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {

      // Recuperer les informations de l'utilisateur
         let id = localStorage.getItem('id');  
     this.authService.getUserProfile(id).subscribe((res) => {
       this.currentUser = res.msg;

     });

     this.formGroup = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email]],
    }
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
  
  this.formGroup = this.formBuilder.group({
    id: [localStorage.getItem("id")?.replace(/"/g,  "")],
    prenom: [localStorage.getItem("prenom")?.replace(/"/g,  ""), [Validators.required, UsernameValidator.cannotContainSpace]],
    nom: [localStorage.getItem('nom')?.replace(/"/g,  ""), [Validators.required, UsernameValidator.cannotContainSpace]],
    email: [localStorage.getItem('email')?.replace(/"/g,  ""), [Validators.required, Validators.email]],
  });
}

onUpdate(){
  this.submitted = true;
if(this.formGroup.invalid){
 return;
}


      const id =  this.formGroup.value.id;
      console.log(id);
    const user ={
    prenom: this.formGroup.value.prenom,
    nom : this.formGroup.value.nom,
    email: this.formGroup.value.email
    }
        
       this.authService.updateUser(id, user).subscribe(
         data=>{
           if (data.statut == "email") {
             this.message ='Email existe déjà'
             this.errMsg = true;
           setTimeout(()=>{ this.errMsg = false}, 2000); 
            }
            
            else{
           this.ngOnInit();
           Swal.fire({
             position: 'center',
             icon: 'success',
             title: 'Modification réussi !',
             showConfirmButton: false,
             timer: 1500
           });window.setTimeout(function(){location.reload()},1000)}
           
         }
         );


}}