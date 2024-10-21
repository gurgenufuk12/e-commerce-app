import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartComponent from "../components/CartComponent.tsx";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex p-4 mx-24 mt-10 items-center flex-col">
      {cart.items.length > 0 ? (
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      ) : (
        <></>
      )}
      {cart.items.length === 0 ? (
        <p className="text-3xl font-medium">
          Your cart is empty. Start adding products!
        </p>
      ) : (
        <CartComponent />
      )}
    </div>
  );
};

export default CartPage;
