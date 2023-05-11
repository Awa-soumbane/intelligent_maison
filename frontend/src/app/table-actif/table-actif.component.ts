import { Component, OnInit, NgZone } from '@angular/core';
 import { AuthService } from '../services/auth.service'; 
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-actifs',
  templateUrl: './table-actif.component.html',
  styleUrls: ['./table-actif.component.css']
})
export class TableActifsComponent implements OnInit {
currentUser: any = {};
filterTerm!: string;
user: any = [];
Users: any;
totalLenght: any;
page: number = 1;
formGroup!: FormGroup;
submitted = false;
errMsg:any = true;
id:any
prenom: any
nom: any
email: any
show:boolean = false;
  userId:any;

constructor(private activatedRoute: ActivatedRoute,
            private formBuilder: FormBuilder,
            public authService: AuthService ){

            // Recuperer les informations de l'utilisateur
           /*  let id = localStorage.getItem('id'); 
            this.authService.getUserProfile(id).subscribe((res) => {
              this.currentUser = res.msg;
            }); */
            
            this.formGroup = this.formBuilder.group({
              id:[''],
              prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
              nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
              email: ['', [Validators.required, Validators.email]]
            })
             
}
public afficher():void{
  this.show = !this.show;
}

ngOnInit(): void {
  this.listeUsers()
}
listeUsers=()=>{
  this.authService.GetUsers().subscribe( (data:any) =>{
    this.user = data;
    this.Users = this.user.filter((e:any)=> e.etat == true && e.email!=localStorage.getItem('email')?.replace(/"/g,  ""));
      console.log(this.Users)
    }
);
}

//achiver un user
 archiver=(id:any,etat:any)=> {
  etat == true ? etat =false: etat = true
  console.log(etat);
  
  const user ={
   etat : etat
  }
  Swal.fire({
    title: 'Archivage',
    text: 'Êtes-vous sûre de vouloir archiver ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
  this.authService.updateUser(id,user).subscribe(
    data=>{
      this.ngOnInit();
    });
  }else if (result.dismiss === Swal.DismissReason.cancel) {
  }
  })
 
} 
getUserData(id:any){
  this.authService.getUserProfile(id).subscribe( (data:any) =>{
  
      /* console.log(data._id) */
      this.formGroup = this.formBuilder.group({
        id:[data._id],
        prenom: [data.prenom, [Validators.required, UsernameValidator.cannotContainSpace]],
        nom: [data.nom, [Validators.required, UsernameValidator.cannotContainSpace]],
        email: [data.email, [Validators.required, Validators.email]],
      });
    })

/* this.nom = nom
  this.formGroup = this.formBuilder.group({
    
    prenom: [prenom, [Validators.required, UsernameValidator.cannotContainSpace]],
    nom: [nom, [Validators.required, UsernameValidator.cannotContainSpace]],
    email: [email, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      
    }); 
     */
}//modifier user

/* onUpdate(){
  const id =  this.formGroup.value.id;
 console.log(id);

console.log(this.formGroup.value.prenom);

this.submitted = true;
if(this.formGroup.invalid){
 return;
}
const user ={
  prenom: this.formGroup.value.prenom,
  nom : this.formGroup.value.nom,
  email: this.formGroup.value.email
  
  }

this.authService.updateUser(id, user).subscribe(data=>{
  console.log(data); 
})
  
this.authService.updateUser(id, user).subscribe(
  data=>{
    this.ngOnInit();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Modification réussi !',
      showConfirmButton: false,
      timer: 1500
    });window.setTimeout(function(){location.reload()},1000)
  },
  error => {
    this.errMsg = false
    setTimeout(()=>{ this.errMsg = true}, 2000);
  });
} */
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
      this.ngOnInit();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification réussi !',
        showConfirmButton: false,
        timer: 1500
      });window.setTimeout(function(){location.reload()},1000)
    },
    error => {
      this.errMsg = false
      setTimeout(()=>{ this.errMsg = true}, 2000);
    });
}
}




