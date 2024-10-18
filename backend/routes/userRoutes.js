const express = require("express");

const { changeUserRole } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");
const { addAddressToUserById } = require("../controllers/userController");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

router.put("/changeUserRole/:userUid", changeUserRole);
router.delete("/deleteUser/:userUid", deleteUser);
router.put("/addAddressToUserById/:userUid", addAddressToUserById);
router.get("/getUserById/:userUid", getUserById);

module.exports = router;
