import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dev-login',
  templateUrl: './dev-login.component.html',
  styleUrls: ['./dev-login.component.css']
})
export class DevLoginComponent {
  developerId = ''; 
  pin = '850P';
  loading = false;  


  constructor(private api: ServiceService, private router: Router) {}

  login() {
    const userdata = {
      pin: this.pin
    };
    this.loading = true;  

    const token = localStorage.getItem('token') || '';

    this.api.Login(userdata, token).pipe(
      tap((response: any) => {
        this.loading = false;  
        if (response && response.token) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.log('Invalid developer ID or PIN');
        }
      })
    ).subscribe(
      (response) => {
        this.api.log('Developer login successful',response);
      },
      (error) => {
        console.log('Developer login failed!', error);
      }
    );
  }
}
