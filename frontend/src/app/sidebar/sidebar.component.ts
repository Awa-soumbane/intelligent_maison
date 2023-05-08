 
 
 import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';
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
  prenom:string='';
  nom:string=''


  constructor(private authService: AuthService) {
    // this.authService.getConnexion(this.currentUser).subscribe((res: any) => {
    //   console.log(res);
   
       
    // })
    
     this.prenom = localStorage.getItem('prenom') as unknown as string;
    this.nom = localStorage.getItem('nom')as unknown as string;;
    console.log(this.prenom);



  
      
      
       
        

     
      /* let id = localStorage.getItem('id');  
      this.authService.getConnexion(id).subscribe((res:any) => {
        this.currentUser = res.msg;
 
      }); */
      }

    }