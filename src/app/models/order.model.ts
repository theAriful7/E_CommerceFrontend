import { OrderItem } from "./orderItem.model";

export interface Order {
  id?: number;
  orderNumber?: string;
  userId: number;
  totalAmount?: number;
  status?: string; // 'PENDING', 'CONFIRMED', 'CANCELLED'
  orderDate?: string;
  shippingAddress: string;
  items: OrderItem[];
}