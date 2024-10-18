const firebase = require("../db");
const Category = require("../models/category");
const admin = require("firebase-admin");
const db = firebase.collection("categories");

const addCategory = async (req, res, next) => {
  try {
    const { categoryId, categoryName, categoryDescription, categoryBrands } =
      req.body;

    const categoryRef = db.doc(categoryId.trim());
    await categoryRef.set({
      categoryId,
      categoryName,
      categoryDescription,
      categoryBrands,
    });
    res.status(201).send("Category added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllCategories = async (req, res, next) => {
  try {
    const categoriesSnapshot = await db.get();
    const categories = [];
    categoriesSnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
const addProductBrandToCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { productBrand } = req.body;
    const categoryRef = db.doc(categoryId.trim());
    await categoryRef.update({
      categoryBrands: admin.firestore.FieldValue.arrayUnion(productBrand),
    });
    res.status(200).send("Brand added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addCategory,
  getAllCategories,
  addProductBrandToCategoryById,
};
