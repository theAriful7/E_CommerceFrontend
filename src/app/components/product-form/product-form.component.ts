import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    category: { id: 0, name: '', description: '' },
    isActive: true
  };

  categories: Category[] = [];
  isEdit = false;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getById(+id).subscribe(data => this.product = data);
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.productService.update(this.product.id!, this.product).subscribe(() => this.router.navigate(['/products']));
    } else {
      this.productService.create(this.product).subscribe(() => this.router.navigate(['/products']));
    }
  }
}