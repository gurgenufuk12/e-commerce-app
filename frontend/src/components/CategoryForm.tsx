import React, { useState } from "react";
import { addCategory } from "../services/api.ts";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";

const CategoryForm = () => {
  const { generateRandomString } = useRandomStringGenerator();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryId = generateRandomString("C");
    const Category = {
      categoryId,
      categoryName,
      categoryDescription,
      categoryBrands: [],
    };

    try {
      await addCategory(Category);

      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };
  return (
    <div className="mx-4 w-1/2">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Add a Category</h1>
      <form className="mt-5" onSubmit={handleAddCategory}>
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          onChange={(e) => setCategoryName(e.target.value)}
          className="block border border-grey-light w-full p-3 rounded mb-4"
        />
        <label htmlFor="categoryDescription">Category Description</label>
        <input
          type="text"
          id="categoryDescription"
          name="categoryDescription"
          onChange={(e) => setCategoryDescription(e.target.value)}
          className="block border border-grey-light w-full p-3 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
