// src/components/ProductForm.tsx
import React, { useState, useEffect } from "react";
import {
  addProduct,
  getAllCategories,
  addProductBrandToCategoryById,
} from "../services/api.ts";
import { getFirestore } from "firebase/firestore";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";
import { toast } from "react-toastify";
interface Category {
  categoryId: string;
  generalCategory: string;
  categoryName: string;
  categoryDescription: string;
}
const ProductForm = () => {
  const db = getFirestore();
  const { generateRandomString } = useRandomStringGenerator();
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productComments, setProductComments] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [generalCategory, setGeneralCategory] = useState("");

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const productId = generateRandomString("P");
    const product = {
      productId,
      productBrand,
      productName,
      productPrice: parseFloat(productPrice),
      productDescription,
      productColor,
      productStock: parseInt(productStock),
      productComments,
      categoryId,
      generalCategory,
      categoryName,
    };

    try {
      await addProduct(product);
      await addProductBrandToCategoryById(categoryId, productBrand);
      toast.success("Product added successfully!");

      setProductBrand("");
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductColor("");
      setProductComments([]);
      setProductStock("");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryList = await getAllCategories();
      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-4 w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <select
            className="border p-2 w-full"
            onChange={(e) => setGeneralCategory(e.target.value)}
          >
            <option value="">Select a General Category</option>
            {categories.map((category) => (
              <option
                key={category.categoryId}
                value={category.generalCategory}
              >
                {category.generalCategory}
              </option>
            ))}
          </select>

          {generalCategory && (
            <select
              className="border p-2 w-full mt-5"
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (category) => category.categoryName === e.target.value
                );
                setCategoryId(selectedCategory?.categoryId || "");
                setCategoryName(selectedCategory?.categoryName || "");
              }}
            >
              <option value="">Select a Category</option>
              {categories
                .filter(
                  (category) => category.generalCategory === generalCategory
                )
                .map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div>
          <label className="block text-lg">Product Brand</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-lg">Product Stock</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
          />
        </div>
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
