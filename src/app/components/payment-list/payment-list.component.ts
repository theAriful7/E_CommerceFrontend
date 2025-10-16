import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments: Payment[] = [];

  constructor(private paymentService: PaymentsService, private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe(data => {
      this.payments = data;
    });
  }

  deletePayment(id: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentService.deletePayment(id).subscribe(() => {
        this.loadPayments();
      });
    }
  }

  addPayment(): void {
    this.router.navigate(['/payments/form']);
  }
}