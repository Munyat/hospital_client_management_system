const express = require("express");
const router = express.Router();
const {
  getAllEnrollments,
  createEnrollment,
} = require("../controllers/enrollmentController");

const authController = require("../controllers/authController");

router
  .route("/")
  .get(getAllEnrollments)
  .post(
    authController.protect,
    authController.restrictTo("doctor"),
    createEnrollment
  );

module.exports = router;
