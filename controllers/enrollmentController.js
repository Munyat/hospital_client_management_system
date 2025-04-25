const Enrollment = require("../models/enrollmentModel");
const asyncWrapper = require("../middleware/async");

exports.getAllEnrollments = asyncWrapper(async (req, res, next) => {
  const enrollMents = await Enrollment.find();

  res.status(200).json({
    status: "success",
    enrollMents: enrollMents.length,
    data: {
      enrollMents,
    },
  });
});

exports.createEnrollment = asyncWrapper(async (req, res, next) => {
  const newEnrollment = await Enrollment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      enrollment: newEnrollment,
    },
  });
});
