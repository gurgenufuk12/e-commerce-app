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
export const updateAddressByUserId = async (
  userId: string | undefined,
  addressId: string,
  addressName: string,
  addressType: string,
  addressLocation: string
) => {
  console.log("Updating address with id: ", addressId);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/updateAddressByUserId/${userId}`,
      { addressId, addressName, addressType, addressLocation }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
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
export const addFovoriteToUserById = async (
  userId: string | undefined,
  favoriteProduct: any
) => {
  console.log("Adding favorite to user with id: ", userId, favoriteProduct);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/addFovoriteToUserById/${userId}`,
      { favoriteProduct }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite to user:", error);
    throw error;
  }
};
export const removeFavoriteFromUserById = async (
  userId: string | undefined,
  favoriteProduct: any
) => {
  console.log("Removing favorite from user with id: ", userId, favoriteProduct);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/removeFavoriteFromUserById/${userId}`,
      { favoriteProduct }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite from user:", error);
    throw error;
  }
};
export const getFavoritesByUserId = async (userId: string | undefined) => {
  console.log("Fetching favorites for user with id: ", userId);

  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/getFavoritesByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};
export const addOrderToUserById = async (
  userId: string | undefined,
  orderId: string,
  orderStatus: string,
  address: any,
  products: any,
  totalAmount: number
) => {
  console.log("Adding order to user with id: ", userId, address, products);
  const order = {
    orderId: orderId,
    orderStatus: orderStatus,
    address: address,
    products: products,
    totalAmount: totalAmount,
  };
  try {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/addOrderToUserById/${userId}`,
        { order }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing favorite from user:", error);
      throw error;
    }
  } catch (error) {}
};
export const addOrderForAdmin = async (
  orderUser: any,
  orderUid: string,
  orderStatus: string,
  orderAddress: any,
  orderItems: any,
  orderTotal: number,
  orderDate: Date
) => {
  console.log("Adding order for admin: ", orderAddress, orderItems);
  const order = {
    orderUser: orderUser,
    orderUid: orderUid,
    orderStatus: orderStatus,
    orderAddress: orderAddress,
    orderItems: orderItems,
    orderTotal: orderTotal,
    orderDate: orderDate,
  };
  try {
    try {
      const response = await axios.post(`${API_BASE_URL}/order/addOrder`, {
        order,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  } catch (error) {}
};
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/getOrders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
export const getOrdersByUserId = async (userId: string | undefined) => {
  console.log("Fetching orders for user with id: ", userId);

  try {
    const response = await axios.get(
      `${API_BASE_URL}/order/getOrdersByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
