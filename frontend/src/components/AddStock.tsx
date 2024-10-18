import React, { useState, useRef, useEffect } from "react";
import { addStockToProductById } from "../services/api.ts";
import CloseIcon from "@mui/icons-material/Close";

interface AddStockProps {
  handleClose: () => void;
  productId: string;
}
const AddStock: React.FC<AddStockProps> = ({ productId, handleClose }) => {
  const [stockToAdd, setStockToAdd] = useState(0);
  const handleAddStockToProductById = async (
    productId: string,
    incrementStockBy: number
  ) => {
    console.log("Adding stock to product with id: ", productId);

    try {
      await addStockToProductById(productId, incrementStockBy);
      window.location.reload();
      console.log("Stock added successfully!");
    } catch (error) {
      console.error("Error adding stock: ", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Add Stock</h1>
        <button className="absolute top-4 right-4" onClick={handleClose}>
          <CloseIcon className="text-black" />
        </button>
        <p className="text-gray-700">{productId}</p>
        <input
          type="number"
          className="border border-gray-400 p-2 w-full mt-4"
          placeholder="Enter stock to add"
          onChange={(e) => setStockToAdd(parseInt(e.target.value))}
        />
        <button
          onClick={() => {
            handleAddStockToProductById(productId, stockToAdd);
            handleClose();
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add Stock
        </button>
      </div>
    </div>
  );
};

export default AddStock;
