const supportOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  if (req.user.role !== "support") {
    return res.status(403).json({
      message: "Access denied. Support role required.",
    });
  }

  next();
};

module.exports = {
  supportOnly,
};