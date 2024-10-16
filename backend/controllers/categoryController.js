const firebase = require("../db");
const Category = require("../models/category");
const admin = require("firebase-admin");
const db = firebase.collection("categories");

const addCategory = async (req, res, next) => {
  try {
    const { categoryId, categoryName, categoryDescription } = req.body;

    const categoryRef = db.doc(categoryId.trim());
    await categoryRef.set({
      categoryId,
      categoryName,
      categoryDescription,
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
module.exports = {
  addCategory,
  getAllCategories,
};
