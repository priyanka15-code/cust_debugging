import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  showLogin = true;
  sName = '';
  sEmail = 'abc@gmail.com';
  sPassword = '';
  loading = false; 
  passwordManagerActive = false;  

  constructor(private api: ServiceService, private router: Router) {}


  ngOnInit() {
    setTimeout(() => {
      this.checkForAutofill();
    }, 500);
  }
  checkForAutofill() {
    const emailField = document.querySelector('input[name="sEmail"]') as HTMLInputElement;
    const passwordField = document.querySelector('input[name="sPassword"]') as HTMLInputElement;

    if (emailField && passwordField) {
      if (emailField.value && passwordField.value) {
        this.passwordManagerActive = true;
        alert('It looks like your browser is prompting to save or autofill your password. Please close the prompt to proceed with login.');
      }
    }
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  handleFormSubmit() {
    if (this.passwordManagerActive) {
      alert('Please close the password manager prompt and try again.');
      return;
    }
    if (this.showLogin) {
      this.login();
    } else {
      this.register();
      this.toggleForm();
    }
  }

  register() {
    const userdata = {
      sName: this.sName,
      sEmail: this.sEmail,
      sPassword: this.sPassword,
    };

    this.api.register(userdata).subscribe(
      (response) => {
        this.api.log('Register successful',response );
/*          console.log('Register successful', response);
 */       },
      (error) => {
        /* this.api.log('Register failed',); */
         console.log('Register failed','error', error);
     }
    );
  }

  login() {
    const userdata = {
      sEmail: this.sEmail,
      sPassword: this.sPassword
    };

    this.loading = true;  

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
          this.loading = false;  
          if (userAccess === 'Admin') {
            this.router.navigate(['/Login']);
          } else if (userAccess === 'Customer') {
            this.router.navigate(['/dashboard']);
          }
        }
        this.api.log('Login successful','log',response);
         console.log('Login successful', response); 
      },
      (error) => {
        this.loading = false;  
        console.log('Login failed! Please try again', error);
/*                 console.log('Login failed! Please try again', error);
 */      }
    );
  }

}

/* 
const console = require('console');

function prepare(color, ...logs) {
    const aLogs = [];
    for (let iter = 0; iter < logs.length; iter += 1) {
        aLogs.push(`\x1b${color}`);
        aLogs.push(typeof logs[iter] === 'object' ? JSON.stringify(logs[iter], null, 2) : logs[iter]);
    }
    aLogs.push('\x1b[0m');
    console.log(...aLogs);
}

const log = {
    black: () => {},
    red: () => {},
    green: () => {},
    yellow: () => {},
    blue: () => {},
    magenta: () => {},
    cyan: () => {},
    white: () => {},
    console: () => {},
    error: () => {},
    warn: () => {},
    table: () => {},
    info: () => {},
    trace: () => {},
};

if (process.env.NODE_ENV !== 'prod') log.debug = log;

log.black = (...logs) => prepare('[30m', ...logs);
log.red = (...logs) => prepare('[31m', ...logs);
log.green = (...logs) => prepare('[32m', ...logs);
log.yellow = (...logs) => prepare('[33m', ...logs);
log.blue = (...logs) => prepare('[34m', ...logs);
log.magenta = (...logs) => prepare('[35m', ...logs);
log.cyan = (...logs) => prepare('[36m', ...logs);
log.white = (...logs) => prepare('[37m', ...logs);
log.console = console.log;
log.error = console.error;
log.warn = console.warn;
log.table = console.table;
log.info = console.info;
log.trace = console.trace;

module.exports = log; */