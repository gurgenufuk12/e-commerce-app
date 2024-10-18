import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state;

  console.log("Product Details: ", product);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="mx-24 mt-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700">Price: {product.price}</p>
      <p className="text-gray-700">Stock: {product.stock}</p>
      <p className="text-gray-700">Category: {product.categoryName}</p>
      <p className="text-gray-700">Color: {product.color}</p>
      <p className="mt-4">{product.description}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
