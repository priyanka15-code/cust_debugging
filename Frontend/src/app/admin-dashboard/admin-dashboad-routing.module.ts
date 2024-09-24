import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


const routes: Routes = [
  { path: '', component: AdminLayoutComponent,
    children: [
      {
        path: '', component: AdminDashboardComponent
      },
      
    ]
   },
 
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminDashboadRoutingModule { }
