import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
{
  path: '', component: AllProductComponent
}
]

@NgModule({
  declarations: [AllProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AllProductModule { }
