import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category = { name: '', description: '' };
  isEdit = false;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.categoriesService.getById(+id).subscribe(data => this.category = data);
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.categoriesService.update(this.category.id!, this.category).subscribe(() => this.router.navigate(['/categories']));
    } else {
      this.categoriesService.create(this.category).subscribe(() => this.router.navigate(['/categories']));
    }
  }
}
