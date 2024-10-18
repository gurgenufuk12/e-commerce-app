import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import ProfileDetail from "./pages/ProfileDetail.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile-detail/:id" element={<ProfileDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
