// src/pages/Home.tsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";

const products = [
  { id: 1, name: "Product 1", price: "$100" },
  { id: 2, name: "Product 2", price: "$150" },
  { id: 3, name: "Product 3", price: "$200" },
];

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Our E-Commerce Store</h1>
      {authContext?.user ? (
        <p>Hello, {authContext.user.email}! Explore our products below:</p>
      ) : (
        <p>
          Welcome, guest! Please <a href="/login">login</a> or{" "}
          <a href="/register">register</a> to enjoy a personalized shopping
          experience.
        </p>
      )}

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
