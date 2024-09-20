import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dev-login',
  templateUrl: './dev-login.component.html',
  styleUrls: ['./dev-login.component.css']
})
export class DevLoginComponent {
  developerId = '';
  pin = ''
 constructor( private api:ServiceService) {}


login(){
  const userdata={
    developerId: this.developerId,
    pin: this.pin
  }
}
}
