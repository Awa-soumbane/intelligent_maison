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
  info(){
    return new Observable( observer => {
      this.socket.on('realtime',(data:any) => {
       observer.next(data);
          })
     })

  }
  

  /* getTemp(){
 
    this.socket.on('data', (data: string) => {
      console.log('temp: '+data);
      let temp = data;
      return temp
    });
  } */
  gethum(){
    /* this.socket = io(`${environment.apiUrl}`);
    this.socket.on('donnee', (data: string) => {
      console.log('donnee: '+data);
      let donnee = data;
      return donnee
    }); */

    return this.socket.fromEvent('donnee')
  }

/*   getHum(){
  
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
  } */
//allumer et éteindre les lampes de la page enfant lampe1(couloire)
  onnn(){
    this.socket.emit('donn', '2')


  }
  offf(){
    this.socket.emit('donn', '3')
  }
//allumer et éteindre les lampes de la page locataire lampe1(couloire)
  oNNN(){
    this.socket.emit('donnN', '6')


  }
  oFFF(){
    this.socket.emit('donnN', '7')
  }
 //fonction pour allumer et éteindre la lampe 2 de page locataire(chambre)
  allum(){
    this.socket.emit('lumiere', '8')
  }

  eteint(){
    this.socket.emit('lumiere', '9')
  }
  tal(){
    this.socket.emit('par', '6')
  }

  fey(){
    this.socket.emit('par', '7')
  }
  enfon(){
    this.socket.emit('enf', '1')
  }

  enfoff(){
    this.socket.emit('enf', '0')
  }
  salon(){
    this.socket.emit('sal', '1')
  }

  saloff(){
    this.socket.emit('sal', '0')
  }
  locon(){
    this.socket.emit('loc', '4')
  }

  locoff(){
    this.socket.emit('loc', '5')
  }
   //fonction pour allumer et éteindre la lampe 2 de page enfant(chambre)
  switchon(){
    this.socket.emit('switch', '4')
  }

  switchoff(){
    this.socket.emit('switch', '5')
  }
}