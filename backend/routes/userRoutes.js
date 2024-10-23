const express = require("express");

const { changeUserRole } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");
const { addAddressToUserById } = require("../controllers/userController");
const { deleteAddressFromUserById } = require("../controllers/userController");
const { updateAddressByUserId } = require("../controllers/userController");
const { addFovoriteToUserById } = require("../controllers/userController");
const { removeFavoriteFromUserById } = require("../controllers/userController");
const { getFavoritesByUserId } = require("../controllers/userController");

const router = express.Router();

router.put("/changeUserRole/:userUid", changeUserRole);
router.delete("/deleteUser/:userUid", deleteUser);
router.put("/addAddressToUserById/:userUid", addAddressToUserById);
router.delete("/deleteAddressFromUserById/:userUid", deleteAddressFromUserById);
router.put("/updateAddressByUserId/:userUid", updateAddressByUserId);
router.put("/addFovoriteToUserById/:userUid", addFovoriteToUserById);
router.put("/removeFavoriteFromUserById/:userUid", removeFavoriteFromUserById);
router.get("/getFavoritesByUserId/:userUid", getFavoritesByUserId);

module.exports = router;
