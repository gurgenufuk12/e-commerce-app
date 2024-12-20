const firebase = require("../db");
const User = require("../models/user");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = firebase.collection("users");

const changeUserRole = async (req, res, next) => {
  const { userUid } = req.params;
  const { newRole } = req.body;
  try {
    const userRef = db.doc(userUid.trim());
    await userRef.update({
      userRole: newRole,
    });
    res.status(200).json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteUser = async (req, res, next) => {
  const { userUid } = req.params;
  try {
    const userRef = db.doc(userUid.trim());
    await userRef.delete();
    await auth.deleteUser(userUid);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {}
};
const addAddressToUserById = async (req, res, next) => {
  const { userUid } = req.params;
  const { addressId, addressName, addressType, addressLocation } = req.body;
  const address = {
    addressId,
    addressName,
    addressType,
    addressLocation,
  };
  try {
    const userRef = db.doc(userUid.trim());
    await userRef.update({
      userAddresses: admin.firestore.FieldValue.arrayUnion(address),
    });
    res.status(200).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteAddressFromUserById = async (req, res, next) => {
  const { userUid } = req.params;
  const { addressId } = req.body;
  try {
    const userRef = db.doc(userUid.trim());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const userAddresses = userData.userAddresses || [];

    const addressToRemove = userAddresses.find(
      (address) => address.addressId === addressId
    );

    if (!addressToRemove) {
      return res.status(404).json({ message: "Address not found" });
    }

    await userRef.update({
      userAddresses: admin.firestore.FieldValue.arrayRemove(addressToRemove),
    });

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateAddressByUserId = async (req, res, next) => {
  const { userUid } = req.params;
  const { addressId, addressName, addressType, addressLocation } = req.body;
  const address = {
    addressId,
    addressName,
    addressType,
    addressLocation,
  };
  console.log(address);
  try {
    const userRef = db.doc(userUid.trim());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const userAddresses = userData.userAddresses || [];

    const addressToUpdate = userAddresses.find(
      (address) => address.addressId === addressId
    );

    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }

    await userRef.update({
      userAddresses: admin.firestore.FieldValue.arrayRemove(addressToUpdate),
    });

    await userRef.update({
      userAddresses: admin.firestore.FieldValue.arrayUnion(address),
    });

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addFovoriteToUserById = async (req, res, next) => {
  const { userUid } = req.params;
  const { favoriteProduct } = req.body;
  try {
    const userRef = db.doc(userUid.trim());
    await userRef.update({
      userFavorites: admin.firestore.FieldValue.arrayUnion(favoriteProduct),
    });
    res.status(200).json({
      success: true,
      message: "Product added to favorites successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const removeFavoriteFromUserById = async (req, res, next) => {
  const { userUid } = req.params;
  const { favoriteProduct } = req.body;
  try {
    const userRef = db.doc(userUid.trim());
    await userRef.update({
      userFavorites: admin.firestore.FieldValue.arrayRemove(favoriteProduct),
    });
    res.status(200).json({
      success: true,
      message: "Product removed from favorites successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFavoritesByUserId = async (req, res, next) => {
  const { userUid } = req.params;
  try {
    const userRef = db.doc(userUid.trim());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const userFavorites = userData.userFavorites || [];

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const addOrderToUserById = async (req, res, next) => {
  const { userUid } = req.params;
  const { order } = req.body;

  try {
    const userRef = db.doc(userUid.trim());
    await userRef.update({
      userOrders: admin.firestore.FieldValue.arrayUnion(order),
    });
    const orderProducts = order.products;
    orderProducts.forEach(async (product) => {
      await userRef.update({
        userBoughtProducts: admin.firestore.FieldValue.arrayUnion(product.id),
      });
    });

    res.status(200).json({
      success: true,
      message: "Order added to user successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const isUserBoughtProduct = async (req, res, next) => {
  const { userUid, productId } = req.params;
  try {
    const userRef = db.doc(userUid.trim());
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const userBoughtProducts = userData.userBoughtProducts || [];

    const isBought = userBoughtProducts.includes(productId);

    res.status(200).json({ isBought });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  changeUserRole,
  deleteUser,
  addAddressToUserById,
  deleteAddressFromUserById,
  updateAddressByUserId,
  addFovoriteToUserById,
  removeFavoriteFromUserById,
  getFavoritesByUserId,
  addOrderToUserById,
  isUserBoughtProduct,
};
