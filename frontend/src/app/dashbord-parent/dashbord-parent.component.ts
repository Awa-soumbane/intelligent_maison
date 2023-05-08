import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashbord-parent',
  templateUrl: './dashbord-parent.component.html',
  styleUrls: ['./dashbord-parent.component.css']
})
export class DashbordParentComponent {
  registerForm!: FormGroup
  toi :any;
  toil :any;
  toll :any;
  tol :any;
toi1= false;
  constructor(private modalService: NgbModal) {}
  onclick(){
    this.toi= true; 
   }
   on(){
     this.toi= false; 
    }
   
      
      close(){
        this.toil= true; 
       }
       opeu(){
         this.toil= false; 
        }
        clos(){
          this.toll= true; 
         }
         ope(){
           this.toll= false; 
          }
          closs(){
            this.tol= true; 
           }
           opes(){
             this.tol= false; 
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
}
