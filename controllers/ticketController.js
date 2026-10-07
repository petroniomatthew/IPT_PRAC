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

// TKT-BE-03 — Get Tickets API (support: all; employee: own; ?status= filter)
const getTickets = async (req, res) => {
  try {
    const filter = req.user.role === "support" ? {} : { createdBy: req.user._id };
    if (req.query.status) filter.status = req.query.status;

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};