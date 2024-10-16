const express = require("express");

const { changeUserRole } = require("../controllers/userController");
const { deleteUser } = require("../controllers/userController");

const router = express.Router();

router.put("/changeUserRole/:userUid", changeUserRole);
router.delete("/deleteUser/:userUid", deleteUser);

module.exports = router;
