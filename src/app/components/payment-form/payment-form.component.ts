import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
 payment: Payment = {
    orderId: 0,
    amount: 0,
    paymentMethod: ''
  };

  constructor(private paymentService: PaymentsService, private router: Router) {}

  savePayment(): void {
    this.paymentService.createPayment(this.payment).subscribe(() => {
      alert('Payment Created Successfully!');
      this.router.navigate(['/payments']);
    });
  }
}
