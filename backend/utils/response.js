const success = (res, data = null, message = "", status = 200) =>
  res.status(status).json({ success: true, data, message });

const fail = (res, message = "Something went wrong", status = 400, errors = null) =>
  res.status(status).json({ success: false, message, errors });

module.exports = { success, fail };