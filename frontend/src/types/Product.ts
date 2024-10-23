export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  color: string;
  quantity: number;
  stock: number;
  totalPrice?: number;
  categoryId?: string;
  categoryName?: string;
  generalCategory?: string;
  brand?: string;
  comments?: string[];
}
