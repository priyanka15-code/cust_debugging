import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustDashboardComponent } from './cust-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CustLayoutComponent } from './cust-layout/cust-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustLayoutComponent, 
    children: [
      { path: '', component: CustDashboardComponent }, 
      {
        path: 'add-product',
        loadChildren: () =>
          import('./pages/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: 'all-product',
        loadChildren: () =>
          import('./pages/all-product/all-product.module').then(
            (m) => m.AllProductModule
          ),
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusrDashboadRoutingModule {}
