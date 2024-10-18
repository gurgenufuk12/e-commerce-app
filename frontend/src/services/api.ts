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
export const addStockToProductById = async (
  productId: string,
  incrementStockBy: number
) => {
  console.log("Adding stock to product with id: ", incrementStockBy);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/product/addStockToProductById/${productId}`,
      { incrementStockBy }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stock to product:", error);
    throw error;
  }
};
export const addProductBrandToCategoryById = async (
  categoryId: string,
  productBrand: string
) => {
  console.log(
    "Adding product brand to category with id: ",
    categoryId,
    productBrand
  );

  try {
    const response = await axios.post(
      `${API_BASE_URL}/category/addProductBrandToCategoryById/${categoryId}`,
      { productBrand }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product brand to category:", error);
    throw error;
  }
};
export const addAddressToUserById = async (
  userId: string,
  addressId: string,
  addressName: string,
  addressType: string,
  addressLocation: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/addAddressToUserById/${userId}`,
      { addressId, addressName, addressType, addressLocation }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding address to user:", error);
    throw error;
  }
};
export const deleteAddressFromUserById = async (
  userId: string,
  addressId: string
) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user/deleteAddressFromUserById/${userId}`,
      { data: { addressId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting address from user:", error);
    throw error;
  }
};
export const getUserById = async (userId: string | undefined) => {
  console.log("Fetching user with id: ", userId);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/getUserById/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
