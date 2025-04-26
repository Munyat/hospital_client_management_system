const createCustomError = require("../error/custom-error");
//id errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new createCustomError(message, 400);
};
//duplicate fiels error/create
const handleDuplicateFildsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field ${value}: Please use another value`;

  return new createCustomError(message, 400);
};
//validation error/update
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${errors.join(". ")}`;
  return new createCustomError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational,trusted error:send messsage to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error dont leak details
  } else {
    //1) Log Error
    console.error("Error", err);

    //2 Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const handleJWTError = () =>
  new createCustomError("Invalid token, Please login again", 401);

const handleTokenExpiredError = () =>
  new createCustomError("Your token has expired! Please log in again", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFildsDB(error);
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleTokenExpiredError();
    }
    sendErrorProd(error, res);
  }
};
