import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

 private baseUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}`);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${id}`);
  }

  createCart(cart: { userId: number }): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, cart);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Cart Items
  addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/items`, cartItem);
  }

  removeCartItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${itemId}`);
  }
}
