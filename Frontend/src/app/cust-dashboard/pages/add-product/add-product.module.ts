import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'', component: AddProductComponent
  }
]

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    
  ],
  exports: [RouterModule]

})
export class AddProductModule { }
