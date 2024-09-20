import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
products: any[] = []

constructor(private api:ServiceService){}

ngOnInit(): void {
  this.loadproduct()
}
loadproduct(){
  this.api.getbyIdproduct().subscribe(
    (response: any[]) => {
      console.log('all product load',response)
      this.products = response;

    },(error) => {
      console.log('fail to load products',error)
    }
  )
}
}
