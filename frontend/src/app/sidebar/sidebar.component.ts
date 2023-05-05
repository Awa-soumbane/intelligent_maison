import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  isAdmin: boolean = false;
  userService: any;
  constructor(public authService: AuthService ){
    //recupération du profile de l'utilisateur
    // this.authService.getUserProfile().subscribe({
    //   next: (user: any) => {
    //     console.log(user);
    //     //Vérifier si l'utilisateur est un admin
    //     this.isAdmin = user.role === 'admin' ? true : false;

    //     this.userService.getUserProfile(user.email).subscribe({
    //       next: (getUserProfile: any) => {
    //         console.log(getUserProfile);

    //         localStorage.setItem('getUserProfile', JSON.stringify(getUserProfile));
    //       },
    //       error: (err: any)=> {
    //         console.log(err);
    //       },
    //       complete: () => {
    //         console.log("complete");
    //       }
    //     })
    //   },
    //   error: (err: any)=> {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("complete");
    //   }
    // })
  }
}
