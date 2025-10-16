import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-vendor-add-product',
  templateUrl: './vendor-add-product.component.html',
  styleUrls: ['./vendor-add-product.component.css']
})
export class VendorAddProductComponent implements OnInit {

  productForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      category: [null, Validators.required],
      isActive: [true]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  loadCategories() {
    // যদি তোমার category API থাকে তাহলে নিচেরটা replace করো:
    this.http.get<Category[]>('http://localhost:8080/api/categories').subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const newProduct: Product = this.productForm.value;
    this.productService.create(newProduct).subscribe({
      next: (res) => {
        alert('✅ Product added successfully!');
        this.productForm.reset({ isActive: true });
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to add product!');
      }
    });
  }
}
