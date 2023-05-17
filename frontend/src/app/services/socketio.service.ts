import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

 
  localStatus = localStorage.getItem('currentUser');
  msg:any;
  /* temp: any;
  lum: any;
  hum : any; */

  constructor(private socket:Socket) { }
 
 setupSocketConnection() {
  
  
  }
 /*  info(){
    return new Observable( observer => {
      this.socket.on('realtime',(data:any) => {
       observer.next(data);
          })
     })

  } */
  

  getTemp(){
 
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

    return this.socket.fromEvent('donnee')
  }

  getHum(){
  
    this.socket.on('hum', (data: string) => {
      console.log('hum: '+data);
      return data
    });
  }

  getLum(){
   
    this.socket.on('lum', (data: string) => {
      console.log('lum: '+data);
      return data
    });
  }

  onnn(){
    this.socket.emit('donn', '2')


  }
  offf(){
    this.socket.emit('donn', '3')
  }
  allum(){
    this.socket.emit('lumiere', '4')
  }

  eteint(){
    this.socket.emit('lumiere', '5')
  }
}