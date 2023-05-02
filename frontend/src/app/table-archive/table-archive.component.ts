import { Component, OnInit, NgZone } from '@angular/core';
/* import { AuthService } from 'src/app/services/auth.service'; */
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
/* import Swal from 'sweetalert2'; */

@Component({
  selector: 'app-table-actifs',
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
            /* public authService: AuthService */){

            // Recuperer les informations de l'utilisateur
          /*   let id = localStorage.getItem('id'); 
            this.authService.getUserProfile(id).subscribe((res) => {
              this.currentUser = res.msg;
            }); */
                

             
}
public afficher():void{
  this.show = !this.show;
}

ngOnInit(): void {
}

onUpdate(){
  const id =  this.formGroup.value.id;
const user ={
prenom: this.formGroup.value.prenom,
nom : this.formGroup.value.nom,
email: this.formGroup.value.email
}
this.submitted = true;
if(this.formGroup.invalid){
 return;
}
  /* this.authService.updateUser(id, user).subscribe(
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
    }); */
}
}


