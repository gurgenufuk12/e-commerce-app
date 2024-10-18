const express = require("express");

const { addProduct } = require("../controllers/productController");
const { getAllProducts } = require("../controllers/productController");
const { addStockToProductById } = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.put("/addStockToProductById/:productId", addStockToProductById);

module.exports = router;
