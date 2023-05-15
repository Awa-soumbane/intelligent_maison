import { Component, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';
  import { io } from 'socket.io-client'; 
 import { Socket } from 'ngx-socket-io';
 import { environment } from '../environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tem_Hum } from '../models/temp_hum';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit{
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;
  socket:any;
  ouverture: any;
  acces: boolean=false;
  constructor(private socketService:SocketioService){
    this.socket = io(`${environment.apiUrl}`);
  }
 
  

  ngOnInit():void {
this.socketService.gethum().subscribe((res:any)=>{
  this.ouverture=res;
  if(this.ouverture== '@d319121e'){
    this.acces= true; 
  }
  if(this.ouverture== 'fermer!'){
    this.acces= false; 
  }
  console.log(res);
  
})

/* this.socketService.recup().subscribe((data)=>{
console.log(data)
}) */


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
  }
  
 
}
