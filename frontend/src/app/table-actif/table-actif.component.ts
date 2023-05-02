import { Component, OnInit, NgZone } from '@angular/core';
/* import { AuthService } from 'src/app/services/auth.service'; */
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from 'src/app/username.validator';
/* import Swal from 'sweetalert2'; */

@Component({
  selector: 'app-table-actifs',
  templateUrl: './table-actif.component.html',
  styleUrls: ['./table-actif.component.css']
})
export class TableActifsComponent implements OnInit {
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
  
}
}


