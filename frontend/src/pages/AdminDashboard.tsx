import React, { useState } from "react";
import ProductForm from "../components/ProductForm.tsx";
import CategoryForm from "../components/CategoryForm.tsx";
import ProductList from "../components/ProductList.tsx";
import CategoryList from "../components/CategoryList.tsx";
import OrderTable from "../components/OrderTable.tsx";

const AdminDashboard = () => {
  const [activeForm, setActiveForm] = useState<string>("product");

  const handleFormChange = (form: string) => {
    setActiveForm(form);
  };

  return (
    <div className="flex h-100vh overflow-hidden mx-24">
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col space-y-4 py-8 px-4 rounded-2xl h-1/3 mt-10">
        <h1 className="font-semibold text-xl mb-5">Admin Actions</h1>
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
        <button
          onClick={() => handleFormChange("orders")}
          className={`px-4 py-2 text-left rounded ${
            activeForm === "orders" ? "bg-blue-500" : "bg-gray-700"
          } hover:bg-blue-600`}
        >
          Orders
        </button>
      </aside>

      <main className="w-3/4 p-8">
        {activeForm === "product" && <ProductForm />}
        {activeForm === "category" && <CategoryForm />}
        {activeForm === "plist" && <ProductList />}
        {activeForm === "clist" && <CategoryList />}
        {activeForm === "orders" && <OrderTable />}
      </main>
    </div>
  );
};

export default AdminDashboard;
