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
const getOrders = async (req, res, next) => {
  try {
    const orders = [];
    const snapshot = await db.get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      orders.push(data);
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching orders",
    });
  }
};
const getOrdersByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = [];
    const snapshot = await db
      .where("order.orderUser.userUid", "==", userId)
      .get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      orders.push(data);
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching orders",
    });
  }
};
module.exports = {
  addOrder,
  getOrders,
  getOrdersByUserId,
};
