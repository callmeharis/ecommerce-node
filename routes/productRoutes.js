const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");
const { create } = require("../controllers/productController");

router.post("/create", authenticateUser, authorizeRoles("admin"), create);

module.exports = router;
