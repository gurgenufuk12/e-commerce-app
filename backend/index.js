"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const PORT = 8000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.listen(config.port, () => {
  console.log("Server is running on http://localhost:" + config.port);
});
