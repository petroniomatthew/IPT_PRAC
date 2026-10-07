const { fail } = require("../utils/response");

function notFound(req, res) {
  return fail(res, `Route ${req.originalUrl} not found`, 404);
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return fail(res, "Validation failed", 400, errors);
  }
  if (err.name === "CastError") {
    return fail(res, "Invalid ID format", 400);
  }
  if (err.code === 11000) {
    return fail(res, "Duplicate value, already exists", 409);
  }

  return fail(res, err.message || "Internal server error", err.status || 500);
}

module.exports = { notFound, errorHandler };