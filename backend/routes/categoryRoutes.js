const express = require("express");

const { addCategory } = require("../controllers/categoryController");
const { getAllCategories } = require("../controllers/categoryController");
const {
  addProductBrandToCategoryById,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory", addCategory);
router.get("/getAllCategories", getAllCategories);
router.post(
  "/addProductBrandToCategoryById/:categoryId",
  addProductBrandToCategoryById
);

module.exports = router;
