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
  endpoint: string = 'http://localhost:3000';
  socket:any;
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  constructor() { }

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
    this.socket = io(`${environment.apiUrl}`);
    this.socket.on('temp', (data: string) => {
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

  public donnee(): Observable<any> {
    return this.socket.fromEvent('donnees');
  }
  
}
