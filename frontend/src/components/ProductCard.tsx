import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice.ts";
import { useDispatch } from "react-redux";
import Mouse from "../assets/mouse.jpg"; // Assuming the path is correct

interface ProductCardProps {
  id: string;
  brand: string;
  name: string;
  price: number;
  description: string;
  color: string;
  stock: number;
  categoryId: string;
  categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  brand,
  name,
  price,
  description,
  color,
  stock,
  categoryId,
  categoryName,
}) => {
  const dispatch = useDispatch();
  const [buttonActive, setButtonActive] = React.useState(false);
  const product = {
    id,
    brand,
    name,
    price,
    color,
    stock,
  };
  const quantity = 1;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
        totalPrice: product.price * quantity,
      })
    );
  };
  return (
    <Link
      onMouseEnter={() => setButtonActive(true)}
      onMouseLeave={() => setButtonActive(false)}
      to={`/product/${id}`}
      state={{
        id,
        name,
        price,
        description,
        color,
        stock,
        categoryId,
        categoryName,
      }}
      className="p-4 border-2 rounded-xl border-orange-500 hover:shadow-xl transition-shadow duration-200 w-64 h-64 flex flex-col items-center justify-between"
    >
      <div className="flex-grow flex items-center justify-center flex-col">
        <img src={Mouse} alt={name} className="h-32 object-cover" />
        <h3 className="text-lg font-semibold text-center">
          {brand}
          {name}
        </h3>
      </div>
      <p className="text-gray-700">Price: {price}</p>
      <button
        onClick={handleAddToCart}
        disabled={!buttonActive}
        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 duration-200 disabled:hidden"
      >
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
