const firebase = require("../db");
const User = require("../models/order");
const admin = require("firebase-admin");
const auth = admin.auth();
const db = firebase.collection("orders");

const addOrder = async (req, res, next) => {
  try {
    const data = req.body;
    await db.doc(data.order.orderUid.trim()).set(data);

    res.json({
      message: "Order added successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding order",
    });
  }
};
module.exports = {
  addOrder,
};
