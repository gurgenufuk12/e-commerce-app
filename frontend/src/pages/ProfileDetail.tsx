import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { getUserById } from "../services/api.ts";
import AddAddress from "../components/AddAddress.tsx";
interface User {
  userUid: string;
  username: string;
  userEmail: string;
  userAddresses: {
    addressName: string;
    addressType: string;
    addressLocation: string;
  }[];
}
const ProfileDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const profileLocation = location.pathname.split("/").pop();
  const [user, setUser] = React.useState<User | null>(null);
  const [activeTab, setActiveTab] = React.useState(profileLocation);
  const [showAddAddress, setShowAddAddress] = React.useState(false);

  const fetchUser = async () => {
    try {
      const user = await getUserById(authContext?.user?.uid);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [authContext?.user]);

  return (
    <div className="flex mx-24 mt-24 flex-row h-2/3 w-full">
      <nav className="rounded-md">
        <button
          onClick={() => {
            setActiveTab("addresses");
            navigate("/profile-detail/addresses");
          }}
          className={`text-gray-700 text-left font-bold w-full h-12 rounded-lg p-2 hover:bg-blue-200 ${
            activeTab === "addresses"
              ? "bg-blue-500 hover:bg-blue-500 text-white"
              : ""
          } `}
        >
          Addresses
        </button>
        <button
          onClick={() => {
            setActiveTab("orders");
            navigate("/profile-detail/orders");
          }}
          className={`text-gray-700 text-left font-bold w-full h-12  rounded-lg p-2 hover:bg-blue-200 ${
            activeTab === "orders"
              ? "bg-blue-500 hover:bg-blue-500 text-white "
              : ""
          } `}
        >
          Orders
        </button>
        <button
          onClick={() => {
            setActiveTab("user-info");
            navigate("/profile-detail/user-info");
          }}
          className={`text-gray-700 text-left font-bold w-full h-12  rounded-lg p-2 hover:bg-blue-200 ${
            activeTab === "user-info"
              ? "bg-blue-500 hover:bg-blue-500 text-white"
              : ""
          } `}
        >
          User Info
        </button>
      </nav>
      <div>
        {activeTab === "addresses" && (
          <div className="mx-24 ">
            <h1 className="text-2xl font-bold mb-4">Addresses</h1>
            <button
              onClick={() => setShowAddAddress(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 mb-2"
            >
              Add Address
            </button>
            {user?.userAddresses.length === 0 ? (
              <p className="text-gray-700">
                No address found. Please add an address.
              </p>
            ) : (
              user?.userAddresses.map((address) => (
                <div className="flex items-center justify-between border-2 border-gray-700 rounded-md p-2 mb-2">
                  <div>
                    <p className="text-gray-700">{address.addressName}</p>
                    <p className="text-gray-700">{address.addressType}</p>
                    <p className="text-gray-700">{address.addressLocation}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === "orders" && (
          <div className="mx-24 ">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-700">Sipariş 1</p>
            <p className="text-gray-700">Sipariş 2</p>
            <p className="text-gray-700">Sipariş 3</p>
          </div>
        )}
        {activeTab === "user-info" && (
          <div className="mx-24 ">
            <h1 className="text-2xl font-bold">Kullanıcı Bilgilerim</h1>
            <p className="text-gray-700">Kullanıcı Adı: John Doe</p>
            <p className="text-gray-700">Email:</p>
          </div>
        )}
        {showAddAddress && (
          <AddAddress
            handleClose={() => setShowAddAddress(false)}
            userUid={user?.userUid}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;
