import React, { useState, useEffect } from "react";
import { getAllCategories } from "../services/api.ts";

interface Category {
  categoryId: string;
  generalCategory: string;
  categoryName: string;
  categoryDescription: string;
}
const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const fetchCategories = async () => {
    try {
      const categoryList = await getAllCategories();
      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Category List
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b-2">Category General</th>
              <th className="px-4 py-2 border-b-2">Category Name</th>
              <th className="px-4 py-2 border-b-2">Category Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.categoryId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border-b">
                  {category.generalCategory}
                </td>
                <td className="px-4 py-2 border-b">{category.categoryName}</td>
                <td className="px-4 py-2 border-b">
                  {category.categoryDescription}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CategoryList;
