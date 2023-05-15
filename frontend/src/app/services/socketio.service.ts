import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:any;
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  constructor(private sockett:Socket) { }

 setupSocketConnection() {
    this.socket = io(`${environment.apiUrl}`);  
  
  } 

  getTemp(){
    this.socket = io(`${environment.apiUrl}`);
    this.socket.on('data', (data: string) => {
      console.log('temp: '+data);
      let temp = data;
      return temp
    });
  }
  gethum(){
    /* this.socket = io(`${environment.apiUrl}`);
    this.socket.on('donnee', (data: string) => {
      console.log('donnee: '+data);
      let donnee = data;
      return donnee
    }); */

    return this.sockett.fromEvent('donnee')
  }

  getHum(){
    this.socket = io(`${environment.apiUrl}`);
    this.socket.on('hum', (data: string) => {
      console.log('hum: '+data);
      return data
    });
  }

  getLum(){
    this.socket = io(`${environment.apiUrl}`);
    this.socket.on('lum', (data: string) => {
      console.log('lum: '+data);
      return data
    });
  }

  
}