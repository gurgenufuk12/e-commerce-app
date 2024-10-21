import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "./Avatar.tsx";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  return (
    <nav className="relative flex items-center justify-between bg-gray-800 p-4 text-white h-[100px] mx-24 rounded-3xl">
      <h1
        className="text-xl font-bold hover: cursor-pointer"
        onClick={() => navigate("/")}
      >
        E-Commerce App
      </h1>
      <div className="flex flex-row gap-2">
        <div className="flex items-center space-x-4 ">
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
        <button
          className={
            "bg-gray-600 flex flex-row gap-2 p-2 rounded-xl w-auto h-[40px] hover:bg-gray-700"
          }
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartIcon />
          <span className="text-white font-semibold">Cart</span>
        </button>
      </div>
      <span className=" absolute top-4 right-2 w-[25px] h-[25px] rounded-full bg-orange-600 flex justify-center">
        {cart.totalItems}
      </span>
    </nav>
  );
};

export default Navbar;
