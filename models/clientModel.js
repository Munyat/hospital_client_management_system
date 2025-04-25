const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  date_of_birth: { type: Date, required: [true, "input date of birth"] },
  national_id: {
    type: String,
    required: [true, "National Id is needed"],
    unique: true,
  },
  phone: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide  a  valid email"],
  },
  address: {
    county: String,
    sub_county: String,
    ward: String,
  },
  registered_on: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
