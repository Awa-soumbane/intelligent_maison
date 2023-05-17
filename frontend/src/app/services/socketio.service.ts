import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:any;
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  constructor() { }

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
    getbuzzer(){
      this.socket = io(`${environment.apiUrl}`);
      this.socket.on('buzzer', (data: string) => {
        console.log('buzzer: '+data);
        return data
      });
  }

  
}


