import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.mode';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => this.reviews = data,
      error: (err) => console.error(err)
    });
  }

  deleteReview(id?: number): void {
    if (id && confirm('Are you sure to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe(() => this.loadReviews());
    }
  }
}
