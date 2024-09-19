import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboadRoutingModule } from './admin-dashboad-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboadRoutingModule
  ],
  
})
export class AdminDashboardModule { }
