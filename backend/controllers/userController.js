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
  const { addressName, addressType, addressLocation } = req.body;
  const address = {
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
const getUserById = async (req, res, next) => {
  const { userUid } = req.params;
  try {
    const user = await db.doc(userUid.trim()).get();
    if (!user.exists) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user.data());
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  changeUserRole,
  deleteUser,
  addAddressToUserById,
  getUserById,
};
