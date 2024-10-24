const firebase = require("../db");
const Product = require("../models/product");
const admin = require("firebase-admin");
const db = firebase.collection("products");

const addProduct = async (req, res, next) => {
  try {
    const {
      productId,
      productBrand,
      productName,
      productPrice,
      productDescription,
      productComments,
      productColor,
      productStock,
      categoryId,
      generalCategory,
      categoryName,
    } = req.body;

    const productRef = db.doc(productId.trim());
    await productRef.set({
      productId,
      productBrand,
      productName,
      productPrice,
      productDescription,
      productComments,
      productColor,
      productStock,
      categoryId,
      generalCategory,
      categoryName,
    });
    res.status(201).send("Product added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllProducts = async (req, res, next) => {
  try {
    const productsSnapshot = await db.get();
    const products = [];
    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
const addStockToProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { incrementStockBy } = req.body;
    const productRef = db.doc(productId.trim());
    await productRef.update({
      productStock: admin.firestore.FieldValue.increment(incrementStockBy),
    });
    res.status(200).send("Stock added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addCommentToProductById = async (req, res, next) => {
  const { productId } = req.params;
  const { comment } = req.body;

  try {
    const productRef = db.doc(productId.trim());
    await productRef.update({
      productComments: admin.firestore.FieldValue.arrayUnion(comment),
    });
    res.status(200).send("Comment added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getProductComments = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const productRef = db.doc(productId.trim());
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productData = productDoc.data();
    const productComments = productData.productComments || [];

    res.status(200).json(productComments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  addStockToProductById,
  addCommentToProductById,
  getProductComments,
};
