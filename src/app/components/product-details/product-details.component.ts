import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.mode';
import { ProductsService } from 'src/app/services/products.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  reviews: Review[] = [];
  newReview: Review = { userId: 1, productId: 0, rating: 5, comment: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
    this.loadReviews(id);
    this.newReview.productId = id;
  }

  loadProduct(id: number): void {
    this.productService.getById(id).subscribe((data) => this.product = data);
  }

  loadReviews(productId: number): void {
    this.reviewService.getReviewsByProduct(productId).subscribe((data) => this.reviews = data);
  }

  submitReview(): void {
    this.reviewService.createReview(this.newReview).subscribe(() => {
      alert('Review submitted successfully!');
      this.newReview.comment = '';
      this.loadReviews(this.product.id!);
    });
  }
}