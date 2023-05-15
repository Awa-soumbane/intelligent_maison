import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { io } from 'socket.io-client';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  //endpoint: string = 'http://localhost:4002';
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  data:any;
  socket:any;
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

 
  gethum() {
    return new Observable(observer => {
      this.socket.on('donnee', (data: unknown) => {
        observer.next(data);
      });
    });
  }
  getLum(){
   // this.socket = io(`${environment.apiUrl}`);
    this.socket.on('lum', (data: string) => {
      console.log('lum: '+data);
      return data
    });
  } 

  

  
}
