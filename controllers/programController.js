const Program = require("../models/programModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllPrograms = asyncWrapper(async (req, res, next) => {
  const program = await Program.find();
  res.status(200).json({ program, numPrograms: program.length });
});

const createProgram = asyncWrapper(async (req, res, next) => {
  const program = await Program.create(req.body);
  res.status(201).json({ program });
});

const getProgram = asyncWrapper(async (req, res, next) => {
  const program = await Program.findById(req.params.id);

  if (!program) {
    return next(createCustomError(`No Program with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ program });
});

const updateProgram = asyncWrapper(async (req, res, next) => {
  const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!program) {
    return next(createCustomError(`No Program with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ program });
});

const deleteProgram = asyncWrapper(async (req, res, next) => {
  const program = await Program.findByIdAndDelete(req.params.id);

  if (!program) {
    return next(createCustomError(`No Program with id: ${req.params.id}`, 404));
  }

  res.status(201).json({ Program: null, status: "success" });
});

module.exports = {
  getAllPrograms,
  createProgram,
  getProgram,
  updateProgram,
  deleteProgram,
};
