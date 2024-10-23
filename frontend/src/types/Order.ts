import { Product } from "./Product";
export interface Order {
  order: {
    orderUser: {
      userUid: string;
      userEmail: string;
    };
    orderUid: string;
    orderStatus: string;
    orderDate: string;
    orderTotal: number;
    orderAddress: {
      addressId: string;
      addressName: string;
      addressLocation: string;
      addressType: string;
    };
    orderItems: Product[];
  };
}
