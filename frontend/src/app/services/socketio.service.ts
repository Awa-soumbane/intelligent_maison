import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
//import { io } from 'socket.io-client';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  //endpoint: string = 'http://localhost:4002';
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  data:any;
  constructor(private socket:Socket,private httpClient: HttpClient) { }

/*   setupSocketConnection() {
    this.socket = io(`${environment.apiUrl}`);  
  
    this.socket.on('my broadcast', (data: string) => {
      console.log(data );
      if (data !="refuse" && !this.localStatus) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('id', JSON.stringify("6426d7fa66dd3621431204dc"));
        
        window.location.pathname ='home'
        return;
      }
    });
  } */

   getTemp(){
   // this.socket = io(`${environment.apiUrl}`);
    this.socket.on('donnee', (data: string) => {
      console.log('temp: '+data);
      let temp = data;
      return temp
    });
  }
/* 
  getHum(){
    this.socket = io(`${environment.apiUrl}`);
    this.socket.on('hum', (data: string) => {
      console.log('hum: '+data);
      return data
    });
  } */

  info() {
    return new Observable(observer => {
      this.socket.on('data', (data: unknown) => {
        observer.next(data);
      });
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

    /*donnee() {
    return this.socket.fromEvent('donnee'); */
   /*  this.socket = io(`${environment.apiUrl}`);
    this.socket.on('donnee', (data: string) => {
      console.log('donnee: '+data);
      return data
    }); 
    
  }
  /* recup(){
    return this.sockett.fromEvent('donnee')
  }
  ledOn(){
    this.sockett.emit('ledOn', '1')
  } */

}
