import { Component, OnInit } from '@angular/core';

import { SocketioService } from 'src/app/services/socketio.service';
 import { io } from 'socket.io-client';
 import { environment } from '../environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit{
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;
  socket:any;
  constructor(private socketService:SocketioService,  private formBuilder:FormBuilder,private modalService: NgbModal){
    this.socket = io(`${environment.apiUrl}`);
  }

  ngOnInit() {


    this.socket.on('temp', (data: number) => {
      console.log('temp: '+data);
      this.realtimeTemp = data;
      console.log(this.realtimeHum);
      
    });

    this.socket.on('hum', (data: number) => {
      console.log('hum: '+data);
      this.realtimeHum = data;
    });

    this.socket.on('lum', (data: number) => {
      console.log('lum: '+data);
      this.realtimeLum = data;
    });

    this.socket.on('sol', (data: number) => {
      console.log('sol: '+data);
      this.realtimeSol = data;
    });
  }

}
