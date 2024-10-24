const express = require("express");

const { addProduct } = require("../controllers/productController");
const { getAllProducts } = require("../controllers/productController");
const { addStockToProductById } = require("../controllers/productController");
const { getProductComments } = require("../controllers/productController");
const { addCommentToProductById } = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.put("/addStockToProductById/:productId", addStockToProductById);
router.get("/getProductComments/:productId", getProductComments);
router.put("/addCommentToProductById/:productId", addCommentToProductById);

module.exports = router;
