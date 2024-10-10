import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  pName = ''
  pDescription = ''
  pPrice = ''
  pQuantity = ''

  constructor( private api: ServiceService,private router: Router ){}

  addproduct(){
    const productdata = {
      pName: this.pName,
      pDescription: this.pDescription,
      pPrice: this.pPrice,
      pQuantity: this.pQuantity
    }
    this.api.newProdct(productdata).subscribe(
      (response) => {
        console.log("product add Successfull",response)
        this.router.navigate(['/dashboard/all-product'])
      },(error) => {
        console.log("fail to creating product ",error)
      }
    )
  }

}
