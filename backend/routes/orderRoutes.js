const express = require("express");

const { addOrder } = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderController");
const { getOrdersByUserId } = require("../controllers/orderController");

const router = express.Router();

router.post("/addOrder", addOrder);
router.get("/getOrders", getOrders);
router.get("/getOrdersByUserId/:userId", getOrdersByUserId);

module.exports = router;
