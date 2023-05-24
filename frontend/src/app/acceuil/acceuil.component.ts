import { Component, OnInit } from '@angular/core';

import { SocketioService } from 'src/app/services/socketio.service';
 import { io } from 'socket.io-client';
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
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0; realtimebuzzer=0;
  socket:any;
  temperature:any;
  humidity:any;
  humSol:any;
  lum:any;
  buzz: any;
  acces:boolean=false;
  constructor(private socketService:SocketioService){
    this.socket = io(`${environment.apiUrl}`);
  }

  ngOnInit() {
    this.socketService.info().subscribe((data:any)=>{
      this.realtimeTemp = data.temperature;
      this.realtimeHum = data.humidity;
      this.realtimeLum= data.humSol;
      this.realtimeSol = data.lum;
      this.realtimebuzzer = data.buzzer;

    })
if(this.realtimebuzzer == 1){
          this.buzz = true;
          
        }
     else{
     this.realtimebuzzer == 0;
     this.buzz = false;
     }
   
     

   /*  this.socket.on('temp', (data: any) => {
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
    }); */

    this.socketService.gethum().subscribe((data)=>{
      console.log(data);
      if(data == "fermer"){
        this.acces=false;
        console.log(data);
        
      } else{
         this.acces=true;
      } 
      
      
    })
  }

  
}