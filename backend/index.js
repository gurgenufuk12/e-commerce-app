"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(config.port, () => {
  console.log("Server is running on http://localhost:" + config.port);
});
