import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  
  products: Product[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }

  editProduct(id: number): void {
    // navigate to edit form later
  }
}
