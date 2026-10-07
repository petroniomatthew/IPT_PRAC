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

// TKT-BE-04 — Update Ticket API
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found" });
    }

    const { status, assignedTo, title, description, priority } = req.body;

    if (req.user.role === "support") {
      if (status) ticket.status = status;
      if (assignedTo) ticket.assignedTo = assignedTo;
    } else {
      if (!ticket.createdBy.equals(req.user._id)) {
        return res.status(403).json({ success: false, message: "You can only update your own tickets" });
      }
      if (ticket.status !== "open") {
        return res.status(400).json({ success: false, message: "Ticket is locked once work has started" });
      }
      if (title) ticket.title = title.trim();
      if (description) ticket.description = description.trim();
      if (priority) ticket.priority = priority;
    }

    const updated = await ticket.save();
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// TKT-BE-05 — Ticket Search API: GET /api/tickets/search?q=keyword
const searchTickets = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ success: false, message: "Query parameter 'q' is required" });
    }

    const filter = req.user.role === "support" ? {} : { createdBy: req.user._id };

    const tickets = await Ticket.find(
      { ...filter, $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" }, createdAt: -1 })
      .populate("createdBy", "name email");

    return res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createTicket, getTickets, updateTicket, searchTickets };