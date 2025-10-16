import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  // Order object (main form data)
  order: Order = {
    userId: 0,
    shippingAddress: '',
    items: []
  };

  // OrderItem form fields
  productId: number = 0;
  productName: string = '';
  quantity: number = 1;
  price: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  // ➕ Add new item to order
  addItem(): void {
    if (this.productId && this.productName.trim() !== '' && this.quantity > 0 && this.price > 0) {
      const subtotal = this.quantity * this.price;

      const item: OrderItem = {
        productId: this.productId,
        productName: this.productName,
        quantity: this.quantity,
        price: this.price,
        subtotal: subtotal
      };

      this.order.items.push(item);

      // Reset item fields
      this.productId = 0;
      this.productName = '';
      this.quantity = 1;
      this.price = 0;
    } else {
      alert('⚠️ Please fill all Order Item fields correctly.');
    }
  }

  // ❌ Remove a specific item from list
  removeItem(index: number): void {
    this.order.items.splice(index, 1);
  }

  // 💾 Submit full order
  submitOrder(): void {
    if (this.order.userId && this.order.items.length > 0 && this.order.shippingAddress.trim() !== '') {
      this.orderService.create(this.order).subscribe({
        next: (res) => {
          alert('✅ Order created successfully!');
          console.log('Order response:', res);

          // Reset form after success
          this.order = { userId: 0, shippingAddress: '', items: [] };
        },
        error: (err) => {
          console.error(err);
          alert('❌ Failed to create order');
        }
      });
    } else {
      alert('⚠️ Please fill all fields and add at least one item!');
    }
  }
}
