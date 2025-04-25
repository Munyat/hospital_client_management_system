const express = require("express");
const router = express.Router();
const {
  getAllEnrollments,
  createEnrollment,
} = require("../controllers/enrollmentController");

router.route("/").get(getAllEnrollments).post(createEnrollment);

module.exports = router;
