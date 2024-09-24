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
  developerId = ''; // This can be used later if needed
  pin = '';

  constructor(private api: ServiceService, private router: Router) {}

  login() {
    const userdata = {
      pin: this.pin
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem('token') || '';

    // Call the Login method with userdata and token
    this.api.Login(userdata, token).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Successful login, navigate to the admin dashboard
          this.router.navigate(['/admin-dashboard']);
        } else {
          console.log('Invalid developer ID or PIN');
        }
      })
    ).subscribe(
      (response) => {
        console.log('Developer login successful', response);
      },
      (error) => {
        console.log('Developer login failed!', error);
      }
    );
  }
}
