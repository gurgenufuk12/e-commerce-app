// src/components/CartComponent.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeItemFromCart, clearCart } from "../redux/cartSlice.ts";

const CartComponent: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId: string) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container relative">
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
                  <p>
                    Price: ${item.price} x {item.quantity}
                  </p>
                  <p>Stock: {item.stock}</p>
                  <p className="font-bold">Total: ${item.totalPrice}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
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
        </>
      )}
    </div>
  );
};

export default CartComponent;
