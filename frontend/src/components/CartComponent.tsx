// src/components/CartComponent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  removeOneItemFromCart,
  clearCart,
  addToCart,
} from "../redux/cartSlice.ts";
import { Product } from "../types/Product.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

const CartComponent: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (item: Product) => {
    const index = cart.items.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      dispatch(removeOneItemFromCart(item.id));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleAddToCart = (item: Product) => {
    const quantity = 1;
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      color: item.color,
      stock: item.stock,
    };
    dispatch(
      addToCart({
        ...product,
        quantity,
        totalPrice: product.price * quantity,
      })
    );
  };
  return (
    <div className="relative flex flex-row container gap-10">
      <div className="w-3/4">
        {cart.items.length === 0 ? (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {item.name} ({item.color})
                    </p>
                    <p>Price: TRY {item.price}</p>
                    <p>Stock: {item.stock}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p className="font-bold">
                      Total Price: TRY {item.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center p-2 border-2 border-gray-600 rounded-3xl">
                    <button
                      onClick={() => handleRemove(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      {item.quantity > 1 ? (
                        <RemoveSharpIcon sx={{ color: "black" }} />
                      ) : (
                        <DeleteIcon sx={{ color: "black" }} />
                      )}
                    </button>
                    <span className="font-semibold text-black text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <AddSharpIcon sx={{ color: "black" }} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="w-1/4">
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total Items: {cart.totalItems}
          </p>
          <p className="text-lg font-semibold">
            Total Amount: ${cart.totalAmount}
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="mt-4 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition"
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
