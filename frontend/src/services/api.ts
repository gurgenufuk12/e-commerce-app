import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const addProduct = async (product: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/product/addProduct`,
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/getAllProducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const addCategory = async (category: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/category/addCategory`,
      category
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category/getAllCategories`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
