// ProductRequestDTO & ProductResponseDTO এর frontend model
export interface Product {
  id?: number;          // Optional, কারণ create করার সময় id থাকে না
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryName?: string;  // শুধু Response এ আসবে
  categoryId?: number;    // শুধু Request এ যাবে
}