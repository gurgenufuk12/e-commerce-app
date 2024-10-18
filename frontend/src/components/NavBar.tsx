import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import Avatar from "./Avatar.tsx";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white h-[100px]">
      <h1 className="text-xl font-bold" onClick={() => navigate("/")}>
        E-Commerce App
      </h1>
      <div>
        {authContext?.userRole === "admin" && (
          <Link to="/admin" className="hover:text-gray-400">
            Admin Dashboard
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {authContext?.user ? (
          <>
            <Avatar />
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
