import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'],
})
export class AllProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;
  searchColumn = '';
  searchText = '';

  constructor(private api: ServiceService) {}

  ngOnInit(): void {
    this.loadproduct();
  }

  loadproduct() {
    this.loading = true;
    this.api.getbyIdproduct().subscribe(
      (response: any[]) => {
        this.loading = false;
        this.products = response;
        this.filteredProducts = response;
      },
      (error) => {
        console.log('Failed to load products', error);
      }
    );
  }

  onSearch(column: string) {
    this.searchColumn = column;
  }
  applySearch() {
    if (this.searchText.trim()) {
      this.loading = true;
      this.api.searchProducts(this.searchText).subscribe(
        (response: any[]) => {
          this.loading = false;
          this.filteredProducts = response; 
        },
        (error) => {
          this.loading = false;
          console.log('Search failed', error);
        }
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  clearSearch() {
    this.searchText = ''; 
    this.filteredProducts = [...this.products]; 
    this.searchColumn = ''; 
  }
}