import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice.ts";
import { Product } from "../types/Product";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  disabled: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  quantity,
  disabled,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartNotification = () => {
    return toast.success(
      <div className="flex flex-col">
        <span>
          <strong>Product added to cart.</strong>
        </span>
        <button
          className="text-left text-green-500 underline"
          onClick={() => navigate("/cart")}
        >
          Go to cart
        </button>
      </div>
    );
  };
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      addToCart({
        ...product,
        quantity,
        totalPrice: product.price * quantity,
      })
    );
    cartNotification();
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${
        disabled && "opacity-50 cursor-not-allowed"
      },
        `}
      aria-label={`Add ${product.name} to cart`}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
