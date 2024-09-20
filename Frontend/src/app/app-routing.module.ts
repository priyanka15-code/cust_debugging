import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DevLoginComponent } from './dev-login/dev-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'Login', component:DevLoginComponent
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./cust-dashboard/cust-dashboard.module').then(
        (m) => m.CustDashboardModule
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
