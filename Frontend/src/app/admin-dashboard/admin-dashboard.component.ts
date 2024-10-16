import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  customerEmail: string = '';
  loading = false;
  users: any[] = [];

  constructor(private api: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getUser().subscribe(
      (response) => {
        this.users = response.map((user: any) => ({
          ...user,
          isActive: user.isLog,
        }));
        console.log('log', response);
        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      }
    );
  }

  onSubmit(sEmail: string) {
    this.loading = true;

    const token = localStorage.getItem('token') || '';
    const userData = { customerEmail: sEmail };

    this.api.adminlogin(userData, token).subscribe(
      (response) => {
        this.loading = false;
        console.log('log', response);
        this.router.navigate(['/dashboard'], {
          queryParams: { email: sEmail },
        });
      },
      (error) => {
        console.error('Error logging in as customer:', error);
      }
    );
  }
  /* toggleSwitch(user: any) {
    user.isActive = !user.isActive;  
    console.log(`${user.sEmail} is now ${user.isActive ? 'Active' : 'Inactive'}`);
  }
   */
  toggleSwitch(user: any) {
    user.isLog = !user.isLog;
    console.log(
      `${user.sEmail} is now ${user.isActive ? 'Active' : 'Inactive'}`,
      'info'
    );

    // Call the backend to update the user's isLoggedIn status
    const token = localStorage.getItem('token') || '';
    this.api.updateUserStatus(user.sEmail, user.isLog, token).subscribe(
      (response) => {
        console.log(`User ${user.sEmail} updated successfully`, response);
      },
      (error) => {
        console.error('Error updating user status:', error);
      }
    );
  }
}
