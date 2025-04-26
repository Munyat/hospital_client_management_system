class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail " : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomApiError(msg, statusCode);
};

module.exports = { createCustomError, CustomApiError };
