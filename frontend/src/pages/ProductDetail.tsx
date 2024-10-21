import React from "react";
import { useLocation } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton.tsx";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state;
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="mx-24 mt-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700 font-bold">Price: {product.price}</p>
      {product.stock > 0 ? (
        <p className="text-green-500">In Stock</p>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
      <p className="text-gray-700 font-bold">
        Category: {product.categoryName}
      </p>
      <p className="text-gray-700 font-bold">Color: {product.color}</p>
      <p className="mt-4 text-gray-700 font-bold">
        {" "}
        Descrition: {product.description}
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="border border-gray-300 rounded-lg px-2 py-1 mt-4"
      />
      <AddToCartButton
        product={product}
        quantity={quantity}
        disabled={product.stock === 0}
      />
    </div>
  );
};

export default ProductDetail;
