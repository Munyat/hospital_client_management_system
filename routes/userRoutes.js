const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Public Routes
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);

module.exports = router;
