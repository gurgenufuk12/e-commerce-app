import React, { useContext, useState, useEffect } from "react";
import { getAllProducts } from "../services/api.ts";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ProductCard from "../components/ProductCard.tsx";

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
const Home = () => {
  const authContext = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-24">
      <h1 className="text-red-700 text-2xl font-bold">
        Welcome to Our E-Commerce Store
      </h1>
      {authContext?.user ? (
        <p className="mt-4">
          Hello, {authContext.user.email}! Explore our products below:
        </p>
      ) : (
        <p className="mt-4">
          Welcome, guest! Please{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          or{" "}
          <a href="/register" className="text-blue-500 underline">
            register
          </a>{" "}
          to enjoy a personalized shopping experience.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            id={product.productId}
            brand={product.productBrand}
            name={product.productName}
            price={product.productPrice}
            description={product.productDescription}
            color={product.productColor}
            stock={product.productStock}
            categoryId={product.categoryId}
            categoryName={product.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
