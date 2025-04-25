const Client = require("../models/clientModel");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../error/custom-error");

const getAllClients = asyncWrapper(async (req, res, next) => {
  // Destructure query parameters
  const { gender, county, name, national_id } = req.query;

  // Initialize query object
  const query = {};

  // filters
  if (gender) query.gender = gender;
  if (county) query["address.county"] = county;
  if (name) query.name = { $regex: name, $options: "i" };
  if (national_id) query.national_id = { $regex: national_id, $options: "i" };

  // Execute query with sorting and field selection
  const clients = await Client.find(query);

  res.status(200).json({
    status: "success",
    results: clients.length,
    data: { clients },
  });
});

const createClient = asyncWrapper(async (req, res, next) => {
  const client = await Client.create(req.body);

  res.status(201).json({ client });
});

const getClient = asyncWrapper(async (req, res, next) => {
  const client = await Client.findById(req.params.id).populate({
    path: "enrollments",
  });

  if (!client) {
    return next(createCustomError(`No client with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ client });
});

const updateClient = asyncWrapper(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    returnDocument: "after",
  });

  if (!client) {
    return next(createCustomError(`No client with id: ${req.params.id}`, 404));
  }

  res.status(200).json({ client });
});

const deleteClient = asyncWrapper(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);

  if (!client) {
    return next(createCustomError(`No clients with id: ${req.params.id}`, 404));
  }

  res.status(201).json({ clients: null, status: "success" });
});

module.exports = {
  getAllClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
};
