import React, { useContext, useState, useEffect } from "react";
import { getAllProducts, getAllCategories } from "../services/api.ts";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ProductCard from "../components/ProductCard.tsx";
import CatergoryBar from "../components/CategoryBar.tsx";

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
    <div className="mx-24">
      <CatergoryBar />
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
