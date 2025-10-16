import { Component } from '@angular/core';
import { Review } from 'src/app/models/review.mode';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
review: Review = {
    userId: 0,
    productId: 0,
    comment: '',
    rating: 1
  };

  constructor(private reviewService: ReviewService) {}

  submitReview(): void {
    if (this.review.userId && this.review.productId && this.review.comment) {
      this.reviewService.createReview(this.review).subscribe({
        next: () => {
          alert('Review submitted successfully!');
          this.review = { userId: 0, productId: 0, comment: '', rating: 1 };
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Please fill all required fields!');
    }
  }
}
