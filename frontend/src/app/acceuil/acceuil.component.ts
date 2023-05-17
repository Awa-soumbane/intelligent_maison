import { Component, OnInit } from '@angular/core';
/* import { Router } from '@angular/router'; */
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
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;realtimebuzzer=0; realtimeled1 =0;
  socket:any;
  acces: boolean= false;
  constructor(/*  private router: Router, */ private socketService:SocketioService){
    this.socket = io(`${environment.apiUrl}`);
  }

  ngOnInit() {

   /*  this.socketService.getInfo().subscribe({
      next:(data: any) => {
        console.log(data);
        this.realtimeTemp = data.temperature;
        this.realtimeHum = data.humidity;
        this.realtimeLum = data.lum;
        this.realtimebuzzer = data.buzzer;
        this.realtimeSol = data.humSol;
        if(this.realtimebuzzer == 1){
          this.acces = true;
          
        }
     else{
     this.realtimebuzzer == 0;
     this.acces = false;
     }

      }
      });
 */
   

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
  
   

 /*    this.socket.on('hum', (data: number) => {
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
 */
  /*   this.socket.on('buzzer', (data: number) => {
      console.log('buzzer: '+data);
      this.realtimebuzzer = data;
     
    });
  }
 */
}
  
