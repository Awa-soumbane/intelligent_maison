

import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-dashbord-parent',
  templateUrl: './dashbord-parent.component.html',
  styleUrls: ['./dashbord-parent.component.css']
})
export class DashbordParent{
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0; 
  registerForm!: FormGroup
top =true;
topp=true;
tops =true;
toll=true;
buzz: any;
  parent: boolean = true;
  realtimebuzzer: any;
  socket: any;

  /* socketService: any; */
onSubmit() {
throw new Error('Method not implemented.');
}
content: any;
  constructor(private modalService: NgbModal, private socketService:SocketioService) {}
    // allumer éteindre lampe enfant
      lampe(){
        this.toll= false; 
        this.socketService.tal()
       }
       oflampe(){
         this.toll= true; 
         this.socketService.fey()
        }
    
//allumer et éteindre lampe parent
        oN(){
          this.top= true; 
          this.socketService.enfoff()
         }
         oF(){
           this.top= false; 
           this.socketService.enfon()

          }
//allumer et éteindre lampe salon
          offf(){
            this.topp= true; 
            this.socketService.saloff()
           }
           closes(){
             this.topp= false; 
             this.socketService.salon() 
            }
//allumer et éteindre lampe couloir
            ofss(){
              this.tops= true; 
              this.socketService.couloff()
             }
             clss(){
               this.tops= false; 
               this.socketService.coulon()
              }
          

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
  ngOnInit(): void {
  
    this.socketService.info().subscribe((data:any)=>{
      console.log(data?.buzzer);
      
      this.realtimeTemp = data?.temperature;
      this.realtimeHum = data?.humidity;
      this.realtimeLum= data?.humSol;
      this.realtimeSol = data?.lum;
      this.realtimebuzzer = data?.buzzer;
    
      /*   if(this.realtimebuzzer == 1){
          this.buzz = true;

        }
     else{
     this.realtimebuzzer == 0;
     this.buzz = false;
     } */
     this.socket.on('buzzer', (data: number) => {
      console.log('buzzer: '+data);
      this.realtimebuzzer = data;
      if(this.realtimebuzzer == 1){
        this.buzz = true;

      }
   else{
   this.realtimebuzzer == 0;
   this.buzz = false;
   }
    });
      });
    

  /*   this.socketService.gethum().subscribe((data)=>{
      console.log(data);
      if(data == "7777"){
        this.parent=true;
        console.log(data);
        
      } else{
         this.parent =false;
      } 
      
      
    }) */


    }

    buzOn(){
      this.socketService.buzzerOn()
    }

    buzOf(){
      this.socketService.buzzerOff()
    }
}


