import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, description }) => {
  return (
    <Link
      to={`/product/${id}`}
      state={{ id, name, price, description }}
      className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-64 h-64 flex flex-col items-center justify-between"
    >
      <div className="flex-grow flex items-center justify-center">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
      </div>
      <p className="text-gray-700">Price: {price}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
