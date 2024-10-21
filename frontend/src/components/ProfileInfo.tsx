import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";

interface ProfileInfoProps {
  handleClose: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ handleClose }) => {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-md shadow-lg w-[200px] h-[400px] flex flex-col">
      <nav className="flex flex-col">
        <Link
          to={`/profile-detail/${"addresses"}`}
          state={{ title: "Adreslerim" }}
          onClick={handleClose}
          className="text-gray-700 hover:text-white hover:bg-slate-600 w-full rounded-md"
        >
          <span>Addresses</span>
        </Link>
        <Link
          to={`/profile-detail/${"orders"}`}
          onClick={handleClose}
          state={{ title: "Siparişlerim" }}
          className="text-gray-700 hover:text-white hover:bg-slate-600 w-full rounded-md"
        >
          <span>Orders</span>
        </Link>
        <Link
          to={`/profile-detail/${"user-info"}`}
          state={{ title: "Kullanıcı Bilgilerim" }}
          onClick={handleClose}
          className="text-gray-700 hover:text-white hover:bg-slate-600 w-full rounded-md"
        >
          <span>User Info</span>
        </Link>
        <Link
          to={"/admin"}
          onClick={handleClose}
          className="text-gray-700 hover:text-white hover:bg-slate-600 w-full  rounded-md"
        >
          <span>Admin Dashboard</span>
        </Link>
      </nav>
      <button
        onClick={() => {
          authContext?.logout();
          handleClose();
          navigate("/");
        }}
        className="text-white bg-red-600  rounded-md  mt-auto h-[40px] hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
