const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: [true, "A brief description of the program is required"],
  },
});

module.exports = mongoose.model("HealthProgram", programSchema);
