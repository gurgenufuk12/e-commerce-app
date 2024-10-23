const express = require("express");

const { addOrder } = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/addOrder", addOrder);
router.get("/getOrders", getOrders);
module.exports = router;
