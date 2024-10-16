// src/components/Navbar.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx"; // Correct import

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1 className="text-xl font-bold">E-Commerce App</h1>
      <div className="flex items-center space-x-4">
        {authContext?.user ? (
          <>
            <span>Welcome, {authContext.user.email}</span>
            <button
              onClick={authContext.logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-400">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
