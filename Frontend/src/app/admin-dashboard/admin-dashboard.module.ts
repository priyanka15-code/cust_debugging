import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboadRoutingModule } from './admin-dashboad-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminDashboardComponent, AdminLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    AdminDashboadRoutingModule,
    FormsModule
  ],
  
})
export class AdminDashboardModule { }
