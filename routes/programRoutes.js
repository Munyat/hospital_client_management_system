const express = require("express");
const router = express.Router();
const {
  getAllPrograms,
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

const authController = require("../controllers/authController");

router
  .route("/")
  .get(getAllPrograms)
  .post(
    authController.protect,
    authController.restrictTo("doctor"),
    createProgram
  );
router
  .route("/:id")
  .get(getProgram)
  .patch(
    authController.protect,
    authController.restrictTo("doctor"),
    updateProgram
  )
  .delete(
    authController.protect,
    authController.restrictTo("doctor"),
    deleteProgram
  );

module.exports = router;
