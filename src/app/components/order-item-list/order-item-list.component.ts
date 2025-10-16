import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/orderItem.model';
import { OrderItemsService } from 'src/app/services/order-items.service';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit {


  orderItems: OrderItem[] = [];

  constructor(private orderItemService: OrderItemsService) {}

  ngOnInit(): void {
    this.loadOrderItems();
  }

  loadOrderItems(): void {
    this.orderItemService.getAll().subscribe((data) => {
      this.orderItems = data;
    });
  }
}
