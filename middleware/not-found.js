const { CustomApiError } = require("../error/custom-error");

const notFound = (req, res, next) => {
  next(new CustomApiError(`Can't find ${req.originalUrl} on this server`, 404));
};
module.exports = notFound;
