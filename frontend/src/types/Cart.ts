export interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  productColor: string;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}
