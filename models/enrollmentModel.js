const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProgram",
      required: true,
    },
    enrollmentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

enrollmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "program",
    select: "name description",
  });
  next();
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
