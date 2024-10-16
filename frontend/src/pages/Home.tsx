import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ProductCard from "../components/ProductCard.tsx";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    description: "This is a great product.",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$150",
    description: "This is an amazing product.",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$200",
    description: "This product is fantastic.",
  },
];

const Home = () => {
  const authContext = useContext(AuthContext);

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
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
