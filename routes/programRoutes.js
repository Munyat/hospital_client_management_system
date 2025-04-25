const express = require("express");
const router = express.Router();
const {
  getAllPrograms,
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

router.route("/").get(getAllPrograms).post(createProgram);
router.route("/:id").get(getProgram).patch(updateProgram).delete(deleteProgram);

module.exports = router;
