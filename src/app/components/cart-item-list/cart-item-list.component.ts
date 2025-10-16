import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartItemService: CartItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.cartItemService.getAll().subscribe((data) => {
      this.cartItems = data;
    });
  }
}
