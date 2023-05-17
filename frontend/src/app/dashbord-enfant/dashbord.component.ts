import { Component, OnInit } from '@angular/core';

import { SocketioService } from 'src/app/services/socketio.service';
 import { io } from 'socket.io-client';
 import { environment } from '../environment/environment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;realtimebuzzer=0;
  socket:any;
  acces: boolean= false;
toi :any;
toi1= false;

onSubmit() {
throw new Error('Method not implemented.');
}
content: any;
  constructor(private modalService: NgbModal, private socketService:SocketioService) 
  {
    this.socket = io(`${environment.apiUrl}`);

  }
    onclick(){
      this.toi= true; 
     }
     on(){
       this.toi= false; 
      }
      onlampe(){
        this.toi= true; 
       }
       offlampe(){
         this.toi= false; 
        }
    

  registerForm!: FormGroup
  onCode(){
    console.log(this.registerForm.value.codeAccess);

    /*  if(this.registerForm.value.codeAccess == 7890){
    this.socket.emit("openDoor", 1);
    localStorage.setItem('door', '1')
    this.toastr.info('Porte ouverte')
   }else if(this.registerForm.value.codeAccess == 9078){
    this.socket.emit("closeDoor", 0);
    localStorage.setItem('door', '0')
    this.toastr.info('Porte fermée')
   }else{
    this.toastr.error('Code d\'accès incorrect')
   }		
   */
  /*  setTimeout(() => {
    this.ngOnInit()
   }, 2000); */
  }

  ngOnInit() {


    this.socket.on('temp', (data: any) => {
      console.log(data);
      this.realtimeTemp = data;
   
    });


    this.socket.on('hum', (data: number) => {
      console.log('hum: '+data);
      this.realtimeHum = data;
    });

    this.socket.on('lum', (data: number) => {
      console.log('lum: '+data);
      this.realtimeLum = data;
    });

    this.socket.on('humSol', (data: number) => {
      console.log('humSol: '+data);
      this.realtimeSol = data;
    });

    this.socket.on('buzzer', (data: number) => {
      console.log('buzzer: '+data);
      this.realtimebuzzer = data;
      if(this.realtimebuzzer == 1){
        this.acces = true;
        
      }
   else{
   this.realtimebuzzer == 0;
   this.acces = false;
   }
    });
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}