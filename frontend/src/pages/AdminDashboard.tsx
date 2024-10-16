import React from "react";
import ProductForm from "../components/ProductForm.tsx";
import CategoryForm from "../components/CategoryForm.tsx";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductForm />
      <CategoryForm />
    </div>
  );
};

export default AdminDashboard;
