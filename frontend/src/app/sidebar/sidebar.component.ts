 
 
 import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/must-match.validator';
/* import { Observable } from 'rxjs/internal/Observable'; */

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentUser: any = {};
  getCurrentUser:any
  res: any;
  errMsg: any;
  route: any;
  spin= false;
  prenom!:any;
  nom!:any
  router: any;

registerForm: FormGroup
submitted = false;

userCollection: any;
pass!: string;


  fan :any;

  lampe(){
    this.fan= false; 
   }
   oflampe(){
     this.fan= true; 
    }

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {
    // this.authService.getConnexion(this.currentUser).subscribe((res: any) => {
    //   console.log(res);
   
       
    // })
    
     this.prenom = localStorage.getItem('prenom')?.replace(/"/g,  "")
    this.nom = localStorage.getItem('nom')?.replace(/"/g,  "")
    console.log(this.prenom);


     
        //controle de saisi modif mot de passe
        this.registerForm = this.formBuilder.group({
          actuelpassword:['', [Validators.required, Validators.minLength(6)],],
          newpassword:['', [Validators.required, Validators.minLength(6)],],
          confirmdp:['', [Validators.required],]
        }, { validator: MustMatch('newpassword', 'confirmdp') }
        );
      }

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
       // Obtenir l'ID de l'utilisateur à partir de localStorage
        const userId = localStorage.getItem('id')?.replace(/"/g,  "");
        
         // retourne a la page deconnection apres le popup modification reussi
    /*      return this.authService.update1User(localStorage.getItem('id'),userCollection).subscribe((data)=>{
          
           
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
  
  
  
           
   
  } */
  console.log(userId?.replace(/"/g,  ""));
  
   // Appeler la fonction de mise à jour de l'API
   this.authService.update1User(userId, userCollection).subscribe((data) => {
    this.ngOnInit()
    
      // Afficher une notification de succès
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Modification mot de passe réussie!',
        showConfirmButton: false,
        timer: 1500
      });
      // Déconnecter l'utilisateur après la modification de mot de passe réussie
      this.authService.doLogout();
    },
    err => {
      // Afficher un message d'erreur si le mot de passe actuel est incorrect
      this.pass = 'Mot de passe actuel incorrect.';
      this.spin = false;
      setTimeout(() => {
        this.errMsg = false;
      }, 3001);
    }
  );
  }

      /* doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
          localStorage.removeItem('prenom');
          localStorage.removeItem('nom');
          localStorage.removeItem('currentUser');
          localStorage.removeItem('id')
          this.router.navigate(['login']);
        }
      } */
      doLogout() {
        // this.userService.getLogOut();
        // this.router.navigateByUrl('login')
        Swal.fire({
          title: 'Voulez-vous vous vous deconnecter?',
          icon: 'warning',
          confirmButtonColor: "#B82010 ",
          cancelButtonColor: "green" ,
          showCancelButton: true,
          confirmButtonText: 'oui',
          cancelButtonText: 'Annuler',
          
      
        })
        .then((result) => {
          if(result.isConfirmed){
            this.router.navigateByUrl('login')
            localStorage.removeItem('currentUser');
            localStorage.removeItem('prenom');
            localStorage.removeItem('nom');
          localStorage.removeItem('email');
          }
        })
      }

    }