import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

interface CartState {
  items: Product[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;

      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
