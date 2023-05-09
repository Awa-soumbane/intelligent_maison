 
 
 import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';
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

  fan :any;

  lampe(){
    this.fan= false; 
   }
   oflampe(){
     this.fan= true; 
    }

  constructor(private authService: AuthService) {
    // this.authService.getConnexion(this.currentUser).subscribe((res: any) => {
    //   console.log(res);
   
       
    // })
    
     this.prenom = localStorage.getItem('prenom')?.replace(/"/g,  "")
    this.nom = localStorage.getItem('nom')?.replace(/"/g,  "")
    console.log(this.prenom);


     
      /* let id = localStorage.getItem('id');  
      this.authService.getConnexion(id).subscribe((res:any) => {
        this.currentUser = res.msg;
 
      }); */
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