import { Component } from '@angular/core';
 import { ServiceService } from '../service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = true;

  sName = '';
  sEmail ='';
  sPassword = '';

  constructor(private api: ServiceService,private router: Router) {}

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  handleFormSubmit() {
    if (this.showLogin) {
      this.login()
      console.log('Login form submitted');
    } else {
      this.register()
      console.log('Register form submitted');
       this.toggleForm(); 
    }
  }

  register(){
    const userdata ={
      sName: this.sName,
      sEmail: this.sEmail,
      sPassword: this.sPassword,
   
    };
    this.api.register(userdata).subscribe(
      (response) =>
      {
        console.log('register successfull',response);
      },
      (error) => {
        console.log('register fail',error);
       }
    );
  }
  login() {
    const userdata = {
      sEmail: this.sEmail,
      sPassword: this.sPassword
    };
  
    this.api.login(userdata).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    ).subscribe(
      (response) => {
        if (response && response.token) {
          const userAccess = response.user.sAccess;
          if (userAccess === 'Admin') {
            this.router.navigate(['/Login']); 
          } else if (userAccess === 'Customer') {
            this.router.navigate(['/dashboard']); 
          }
        }
        console.log('login successful', response);
      },
      (error) => {
        console.log('login failed! please try again', error);
      }
    );
  }
  


}
