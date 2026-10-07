const jwt = require("jsonwebtoken");
const { fail } = require("../utils/response");

const SECRET = process.env.JWT_SECRET || "midterm-secret";

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return fail(res, "No token provided", 401);

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return fail(res, "Invalid or expired token", 401);
  }
}

module.exports = { authenticate, SECRET };