import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  customerEmail: string = '';
  loading = false;  
  users: any[] = []


  constructor(private api: ServiceService ,private router: Router){}

  ngOnInit(): void {
    this.api.getUser().subscribe(
      (response) => {
        this.users = response.map((user: any) => ({ ...user, isActive: false })); 
        console.log(response)
      },(error) => {
        console.log(error)
      }
      )
  
  }


  onSubmit(sEmail: string) {
    this.loading = true;  

    const token = localStorage.getItem('token') || ''; 
    const userData = { customerEmail: sEmail  };

    this.api.adminlogin(userData, token).subscribe(
      (response) => {
        this.loading = false;  
        console.log(response);
        this.router.navigate(['/dashboard'],  { queryParams: { email: sEmail } }); 
      },
      (error) => {
        console.error('Error logging in as customer:', error);
        
      }
    );
  }
  toggleSwitch(user: any) {
    user.isActive = !user.isActive;  
    console.log(`${user.sEmail} is now ${user.isActive ? 'Active' : 'Inactive'}`);
  }
  
}

