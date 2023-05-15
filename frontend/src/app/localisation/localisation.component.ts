import { Component,OnInit } from '@angular/core';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor(private socketservice:SocketioService){}
  ngOnInit(){
   /*  console.log('eeeeeeeeeee');

    this.socketservice.donnee().subscribe((res:any)=>{
      console.log(res);
      
    }) */

  }
}
