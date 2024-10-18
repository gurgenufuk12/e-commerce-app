import React from "react";
import { addAddressToUserById } from "../services/api.ts";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";
import { toast } from "react-toastify";
import CloseButton from "@mui/icons-material/Close";
interface AddAddressProps {
  handleClose: () => void;
  userUid: string | undefined;
}

const AddAddress: React.FC<AddAddressProps> = ({ handleClose, userUid }) => {
  const { generateRandomString } = useRandomStringGenerator();
  const [addressName, setAddressName] = React.useState("");
  const [addressType, setAddressType] = React.useState("");
  const [addressLocation, setAddressLocation] = React.useState("");

  const handleAddAdress = async (e: React.FormEvent) => {
    const addressId = generateRandomString("A");
    e.preventDefault();
    try {
      await addAddressToUserById(
        userUid || "",
        addressId,
        addressName,
        addressType,
        addressLocation
      );
      toast.success("Adres başarıyla eklendi!");
      window.location.reload();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex bg-opacity-50 bg-gray-700">
      <div className="absolute right-0 top-0 bg-white p-8 rounded-lg shadow-lg w-1/3 h-full">
        <form className="flex flex-col" onSubmit={handleAddAdress}>
          <button className="flex justify-start mb-5 bg-gray-300 rounded-full p-2 w-[40px] ">
            <CloseButton onClick={handleClose} />
          </button>
          <label htmlFor="addressName">Adres Name</label>
          <input
            type="text"
            name="addressName"
            id="addressName"
            className="border border-gray-300 rounded-md mb-4 p-2"
            onChange={(e) => setAddressName(e.target.value)}
          />
          <label htmlFor="addressType">Adres Type</label>
          <input
            type="text"
            name="addressType"
            id="addressType"
            className="border border-gray-300 rounded-md mb-4 p-2"
            onChange={(e) => setAddressType(e.target.value)}
          />
          <label htmlFor="addressLocation">Adres Location</label>
          <input
            type="text"
            name="addressLocation"
            id="addressLocation"
            className="border border-gray-300 rounded-md mb-4 p-2"
            onChange={(e) => setAddressLocation(e.target.value)}
          />

          <button
            type="submit"
            className="text-white bg-green-600 rounded-md mb-4 p-2 w-fit"
          >
            Add Address
          </button>
        </form>
        <button
          onClick={handleClose}
          className="text-white bg-red-600 rounded-md  p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
