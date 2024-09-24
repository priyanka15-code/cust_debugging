import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  customerEmail: string = '';

  constructor(private api: ServiceService ,private router: Router){}

  onSubmit() {
    const token = localStorage.getItem('token') || ''; 
    const userData = { customerEmail: this.customerEmail };

    this.api.adminlogin(userData, token).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        console.error('Error logging in as customer:', error);
        
      }
    );
  }
}

