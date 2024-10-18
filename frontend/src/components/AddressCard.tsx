import React from "react";
import EditAddress from "./EditAddress.tsx";
import { deleteAddressFromUserById } from "../services/api.ts";
import { toast } from "react-toastify";

interface AddressCardProps {
  userUid: string;
  userAddresses: {
    addressId: string;
    addressName: string;
    addressType: string;
    addressLocation: string;
  };
}

const AddressCard: React.FC<AddressCardProps> = ({
  userUid,
  userAddresses,
}) => {
  const [showEditAddress, setShowEditAddress] = React.useState(false);

  const deleteAddressUserById = async (userId: string, addressId: string) => {
    try {
      await deleteAddressFromUserById(userId, addressId);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting address from user:", error);
      throw error;
    }
  };
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col h-1/3 p-4 w-2/3">
        <h1 className="text-lg font-bold">{userAddresses.addressName}</h1>
        <p className="text-sm">{userAddresses.addressType}</p>
        <p className="text-sm">{userAddresses.addressLocation}</p>
      </div>
      <div className="flex gap-1 w-1/3">
        <button
          onClick={() => {
            setShowEditAddress(true);
          }}
          className="bg-blue-500 text-white rounded-lg p-2"
        >
          Edit
        </button>
        <button
          onClick={() =>
            deleteAddressUserById(userUid, userAddresses.addressId)
          }
          className="bg-red-500 text-white rounded-lg p-2 "
        >
          Delete
        </button>
      </div>
      {showEditAddress && (
        <EditAddress
          handleClose={() => setShowEditAddress(false)}
          userUid={userUid}
          userAddresses={userAddresses}
        />
      )}
    </div>
  );
};
export default AddressCard;
