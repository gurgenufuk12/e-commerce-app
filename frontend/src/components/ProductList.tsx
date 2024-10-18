import React, { useState, useEffect } from "react";
import { getAllProducts, addStockToProductById } from "../services/api.ts";
import AddStock from "./AddStock.tsx";

interface Product {
  productId: string;
  productBrand: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productColor: string;
  productStock: number;
  categoryId: string;
  categoryName: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const fetchProducts = async () => {
    try {
      const productList = await getAllProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Product List
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b-2">Product Id</th>
              <th className="px-4 py-2 border-b-2">Product Name</th>
              <th className="px-4 py-2 border-b-2">Price</th>
              <th className="px-4 py-2 border-b-2">Description</th>
              <th className="px-4 py-2 border-b-2">Color</th>
              <th className="px-4 py-2 border-b-2">Stock</th>
              <th className="px-4 py-2 border-b-2">Category Id</th>
              <th className="px-4 py-2 border-b-2">Category Name</th>
              <th className="px-4 py-2 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.productId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border-b">{product.productId}</td>
                <td className="px-4 py-2 border-b">{product.productName}</td>
                <td className="px-4 py-2 border-b">{product.productPrice}</td>
                <td className="px-4 py-2 border-b">
                  {product.productDescription}
                </td>
                <td className="px-4 py-2 border-b">{product.productColor}</td>
                {product.productStock > 0 ? (
                  <td className="px-4 py-2 border-b">{product.productStock}</td>
                ) : (
                  <td className="px-4 py-2 border-b text-red-500">-</td>
                )}
                <td className="px-4 py-2 border-b">{product.categoryId}</td>
                <td className="px-4 py-2 border-b">{product.categoryName}</td>
                <td
                  onClick={() => {
                    setSelectedProductId(product.productId);
                    setShowAddStockModal(true);
                  }}
                  className="
                    px-4
                    py-2
                    border-b
                    text-blue-500
                    cursor-pointer
                    hover:text-blue-600
                    transition-colors
                    duration-200
                "
                >
                  Add Stock
                </td>
                {showAddStockModal && (
                  <AddStock
                    handleClose={() => setShowAddStockModal(false)}
                    productId={selectedProductId}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
