import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent  implements OnInit {

    isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  products: Product[] = [];
  filtered: Product[] = [];
  loading = false;

  searchText = '';
  page = 1;
  pageSize = 6;
  total = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // ✅ সব প্রোডাক্ট লোড
  loadProducts(): void {
    this.loading = true;
    this.productService.getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          // শুধু vendor-এর প্রোডাক্ট ফিল্টার করা (যদি vendor id যুক্ত থাকে)
          // এখন ধরে নিচ্ছি সব প্রোডাক্টই এই vendor-এর
          this.products = data;
          this.applyFilter();
        },
        error: (err) => console.error('Error loading products', err),
      });
  }

  // ✅ ফিল্টার প্রয়োগ
  applyFilter(): void {
    const query = this.searchText.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
    );
    this.total = this.filtered.length;
  }

  // ✅ সার্চ টেক্সট পরিবর্তনে ফিল্টার
  onSearchChange(): void {
    this.applyFilter();
  }

  // ✅ প্রোডাক্ট ডিলিট
  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.applyFilter();
      },
      error: (err) => console.error('Delete failed', err),
    });
  }

  // ✅ প্রোডাক্টের অ্যাক্টিভ অবস্থা টগল
  toggleActive(product: Product): void {
    const updated = { ...product, isActive: !product.isActive };
    this.productService.update(product.id!, updated).subscribe({
      next: (res) => {
        product.isActive = res.isActive;
      },
      error: (err) => console.error('Toggle failed', err),
    });
  }
}
