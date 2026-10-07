const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { validateTicketInput, validateTicketStatus } = require("../middleware/validateTicket");
const { createTicket, getTickets, updateTicket, searchTickets } = require("../controllers/ticketController");

// TKT-BE-02
router.post("/", protect, authorize("employee", "support"), validateTicketInput, createTicket);

// TKT-BE-03
router.get("/", protect, getTickets);

// TKT-BE-04
router.put("/:id", protect, validateTicketStatus, updateTicket);

// TKT-BE-05 — search declared before any /:id routes
router.get("/search", protect, searchTickets);

module.exports = router;