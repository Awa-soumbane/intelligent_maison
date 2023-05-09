import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-archive',
  templateUrl: './table-archive.component.html',
  styleUrls: ['./table-archive.component.css']
})
export class TableArchivesComponent implements OnInit {
currentUser: any = {};
filterTerm!: string;
Users: any = [];
user: any;
totalLenght: any;
page: number = 1;
formGroup!: FormGroup;
submitted = false;
errMsg:any = true;
show:boolean = false;

constructor(private activatedRoute: ActivatedRoute,
            private formBuilder: FormBuilder,
            public authService: AuthService){

            // Recuperer les informations de l'utilisateur
            let id = localStorage.getItem('id'); 
            this.authService.getUserProfile(id).subscribe((res) => {
              this.currentUser = res.msg;
            });
                

             
}
ngOnInit(): void {
  this.authService.GetUsers().subscribe(
    data =>{
      this.user = data;
      this.Users= this.user.filter((e:any)=> e.etat == false)
    }
  );
}

dearchiveUser=(id:any,etat:any)=> {

  etat == false ? etat = true : etat = false
   const user ={
   etat : etat
   }
   Swal.fire({
    title: 'Désarchivage',
    text: 'Êtes-vous sûre de vouloir désarchiver ?',
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
  });
}
}
