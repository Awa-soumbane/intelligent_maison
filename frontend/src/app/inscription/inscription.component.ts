import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router' ;
  import { AuthService } from 'src/app/services/auth.service';  
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { UsernameValidator } from 'src/app/username.validator';
import { MustMatch } from 'src/app/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  formGroup: FormGroup;
  submitted = false;
  percentDone?: any = 0;
  errMsg: any;
  prenom:any

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) {

    this.formGroup = this.formBuilder.group({
      prenom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      nom: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      role: ['', Validators.required],
      mot_pass: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
      rfid: ['', [Validators.required, UsernameValidator.cannotContainSpace]],
      etat: [1, Validators.required],
     
    }, { validator: MustMatch('mot_pass', 'passwordConfirm') }
    )
  }

  listDeroulant = [ 'Parent', 'Enfant', 'Locataire'];

  addUsers() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted=false
  
    this.authService.addUser(this.formGroup.value.prenom, this.formGroup.value.nom,
      this.formGroup.value.email, this.formGroup.value.role, this.formGroup.value.mot_pass,this.formGroup.value.rfid,
      this.formGroup.value.etat).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            
            break;
          case HttpEventType.ResponseHeader:
            
            break;
          case HttpEventType.Response:
           
        this.percentDone = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Inscription réussi !',
          showConfirmButton: false,
          timer: 1500
        }); window.setTimeout(function () { location.reload() }, 1000)
          break;
      }
      }, // Intercepter les messages d'erreurs du serveur
        error => {
          this.errMsg = error.error.error
        })
  }
}
