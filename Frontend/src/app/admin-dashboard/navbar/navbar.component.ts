import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  developerId: string | null = null;

  constructor(private router: Router) {}
ngOnInit(): void {
  this.loadUserName()
}
loadUserName(): void {
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    this.developerId = parsedUser.developerId; 
  }
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}

}
