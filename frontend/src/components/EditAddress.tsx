import React, { useState } from "react";
import { updateAddressByUserId } from "../services/api.ts";
import CloseIcon from "@mui/icons-material/Close";

interface EditAddressProps {
  handleClose: () => void;
  userUid: string | undefined;
  userAddresses: {
    addressId: string;
    addressName: string;
    addressType: string;
    addressLocation: string;
  };
}

const EditAddress: React.FC<EditAddressProps> = ({
  handleClose,
  userUid,
  userAddresses,
}) => {
  const [addressName, setAddressName] = useState(userAddresses.addressName);
  const [addressType, setAddressType] = useState(userAddresses.addressType);
  const [addressLocation, setAddressLocation] = useState(
    userAddresses.addressLocation
  );
  const addressId = userAddresses.addressId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAddressByUserId(
        userUid,
        addressId,
        addressName,
        addressType,
        addressLocation
      );
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-opacity-50 bg-gray-700">
      <div className="absolute right-0 top-0 bg-white p-8 rounded-lg shadow-lg w-1/3 h-full">
        <button
          onClick={handleClose}
          className="flex justify-start mb-5 bg-gray-300 rounded-full p-2 w-[40px]"
        >
          <CloseIcon />
        </button>
        <h1 className="text-2xl font-bold">Edit Address</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg">Address Name</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg">Address Type</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-lg">Address Location</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={addressLocation}
              onChange={(e) => setAddressLocation(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-4"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
