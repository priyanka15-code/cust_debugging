import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  products: any[] = [];
  loading = false;

  constructor(private api: ServiceService) {}

  ngOnInit(): void {
    this.loadproduct();
  }
  loadproduct() {
    this.loading = true;
    this.api.getbyIdproduct().subscribe(
      (response: any[]) => {
        this.loading = false;

        console.log('all product load', response);
        this.products = response;
      },
      (error) => {
        console.log('fail to load products', error);
      }
    );
  }
}
