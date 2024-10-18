import React, { useState } from "react";
import ProductForm from "../components/ProductForm.tsx";
import CategoryForm from "../components/CategoryForm.tsx";
import ProductList from "../components/ProductList.tsx";
import CategoryList from "../components/CategoryList.tsx";

const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState<string>("product");

  const handleFormChange = (form: string) => {
    setActiveForm(form);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col space-y-4 py-8 px-4">
        <button
          onClick={() => handleFormChange("product")}
          className={`px-4 py-2 text-left rounded ${
            activeForm === "product" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
        >
          Add Product
        </button>
        <button
          onClick={() => handleFormChange("category")}
          className={`px-4 py-2 text-left rounded ${
            activeForm === "category" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
        >
          Add Category
        </button>
        <button
          onClick={() => handleFormChange("plist")}
          className={`px-4 py-2 text-left rounded ${
            activeForm === "plist" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
        >
          Product List
        </button>
        <button
          onClick={() => handleFormChange("clist")}
          className={`px-4 py-2 text-left rounded ${
            activeForm === "clist" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
        >
          Category List
        </button>
      </aside>

      <main className="w-3/4 p-8">
        {activeForm === "product" && <ProductForm />}
        {activeForm === "category" && <CategoryForm />}
        {activeForm === "plist" && <ProductList />}
        {activeForm === "clist" && <CategoryList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
