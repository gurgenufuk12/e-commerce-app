import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/api.ts";

type Category = {
  categoryId: string;
  generalCategory: string;
  categoryName: string;
  categoryDescription: string;
};

const CatergoryBar = () => {
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
    <div className="flex w-full h-[60px] mt-5 gap-10 justify-center">
      {categories.map((category, index) => (
        <div key={category.categoryId}>
          <button className="px-4 py-2 underline">
            {category.generalCategory}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CatergoryBar;
