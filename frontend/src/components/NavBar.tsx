// src/components/Navbar.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      <h1>E-Commerce App</h1>
      <div>
        {authContext?.user ? (
          <>
            <span>Welcome, {authContext.user.email}</span>
            <button onClick={authContext.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
