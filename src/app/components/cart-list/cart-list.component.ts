import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  carts: Cart[] = [];

  constructor(private cartService: CartsService) {}

  ngOnInit(): void {
    this.loadCarts();
  }

  loadCarts(): void {
    this.cartService.getAllCarts().subscribe((data) => {
      this.carts = data;
    });
  }

  deleteCart(id: number): void {
    if (confirm('Are you sure to delete this cart?')) {
      this.cartService.deleteCart(id).subscribe(() => {
        this.loadCarts();
      });
    }
  }
}
