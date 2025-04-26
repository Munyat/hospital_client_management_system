const express = require("express");
const router = express.Router();
const {
  getAllClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("doctor"),
    getAllClients
  )
  .post(createClient);
router
  .route("/:id")
  .get(getClient)
  .patch(
    authController.protect,
    authController.restrictTo("doctor"),
    updateClient
  )
  .delete(
    authController.protect,
    authController.restrictTo("doctor"),
    deleteClient
  );

module.exports = router;
