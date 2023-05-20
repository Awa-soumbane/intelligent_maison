import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-dashboard-locataire',
  templateUrl: './dashboard-locataire.component.html',
  styleUrls: ['./dashboard-locataire.component.css']
})
export class DashboardLocataireComponent {

  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;

toi2= true;
toi3= true;
/* role = localStorage.getItem('role') */
enfant=false;
onSubmit() {
throw new Error('Method not implemented.');
}
content: any;
  constructor(private modalService: NgbModal, private socketService:SocketioService) {}
   //fonction pour allumer et éteindre la lampe 1 de page locataire(chambre)
      clicke(){
        this.toi2= true; 
        this.socketService.oFFF();
       
       }
       noclicke(){
         this.toi2= false; 
         this.socketService.oNNN();
         
        }
    

    //fonction pour allumer et éteindre la lampe 2 de page locataire(chambre)
    onlampe(){
      this.toi3= false; 
      this.socketService.allum();
      
    }
    
    offlampe(){
      this.toi3= true; 
      this.socketService.eteint();
      
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
  /* enfa = localStorage.getItem('benfant'); */
  ngOnInit(): void {
  /* console.log(this.enfa); */

  this.socketService.info().subscribe((data:any)=>{
    this.realtimeTemp = data.temperature;
    this.realtimeHum = data.humidity;
    this.realtimeLum= data.humSol;
    this.realtimeSol = data.lum;
  })
  
  }

}
  
