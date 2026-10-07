const { fail } = require("../utils/response");

function validateTicket(req, res, next) {
  const { title, description } = req.body || {};
  const errors = [];

  if (typeof title !== "string" || title.trim().length < 3) {
    errors.push("Title is required (min 3 characters)");
  }
  if (typeof description !== "string" || description.trim().length < 5) {
    errors.push("Description is required (min 5 characters)");
  }

  if (errors.length) {
    return fail(res, "Validation failed", 400, errors);
  }
  next();
}

const STATUSES = ["open", "in-progress", "resolved", "closed"];

function validateStatus(req, res, next) {
  const { status } = req.body || {};
  if (status === undefined) return next();
  if (!STATUSES.includes(status)) {
    return fail(res, "Validation failed", 400, [
      `Status must be one of: ${STATUSES.join(", ")}`,
    ]);
  }
  next();
}

module.exports = { validateTicket, validateStatus };
