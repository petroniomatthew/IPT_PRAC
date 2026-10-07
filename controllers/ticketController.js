const Ticket = require("../models/Ticket");

// TKT-BE-02 — Create Ticket API
const createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const ticket = await Ticket.create({
      title: title.trim(),
      description: description.trim(),
      priority: priority || "medium",
      createdBy: req.user._id,
    });
    return res.status(201).json({ success: true, data: ticket });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};