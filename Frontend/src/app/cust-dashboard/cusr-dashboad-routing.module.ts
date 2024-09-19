import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustDashboardComponent } from './cust-dashboard.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: CustDashboardComponent },
 
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CusrDashboadRoutingModule { }
