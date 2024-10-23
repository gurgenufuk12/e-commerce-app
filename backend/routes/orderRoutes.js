const express = require("express");

const { addOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/addOrder", addOrder);

module.exports = router;
