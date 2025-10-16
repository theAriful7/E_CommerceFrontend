import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent {
 userId!: number;
  cartItems: CartItem[] = [];
  productId!: number;
  quantity: number = 1;
  pricePerItem: number = 0;

  constructor(private cartService: CartsService) {}

  addItem(): void {
    if (this.productId && this.quantity > 0 && this.pricePerItem > 0) {
      const item: CartItem = {
        productId: this.productId,
        quantity: this.quantity,
        pricePerItem: this.pricePerItem,
        totalPrice: this.pricePerItem * this.quantity
      };
      this.cartItems.push(item);
      this.productId = 0;
      this.quantity = 1;
      this.pricePerItem = 0;
    }
  }

  saveCart(): void {
    const cartRequest = { userId: this.userId };
    this.cartService.createCart(cartRequest).subscribe((cart) => {
      this.cartItems.forEach((item) => {
        item.cartId = cart.id;
        this.cartService.addCartItem(item).subscribe();
      });
      alert('Cart created successfully!');
      this.cartItems = [];
    });
  }
}
