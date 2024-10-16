// src/components/ProductForm.tsx
import React, { useState } from "react";
import { addProduct } from "../services/api.ts";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";

const ProductForm = () => {
  const db = getFirestore();
  const { generateRandomString } = useRandomStringGenerator();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productComments, setProductComments] = useState<string[]>([]);
  const categoryId = "C123";
  const categoryName = "Electronics";

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const productId = generateRandomString();
    const product = {
      productId,
      productName,
      productPrice: parseFloat(productPrice),
      productDescription,
      productColor,
      productComments,
      categoryId,
      categoryName,
    };

    try {
      await addProduct(product);
      console.log("Product added successfully!");

      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductColor("");
      setProductComments([]);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="mx-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block text-lg">Product Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg">Product Price</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg">Product Description</label>
          <textarea
            className="border p-2 w-full"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg">Product Color</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg">Product Comments (Optional)</label>
          <textarea
            className="border p-2 w-full"
            value={productComments.join(", ")} // Display comments as comma-separated values
            onChange={(e) => setProductComments(e.target.value.split(", "))}
            placeholder="Enter comments separated by commas"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
