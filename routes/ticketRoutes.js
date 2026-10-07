const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { validateTicketInput, validateTicketStatus } = require("../middleware/validateTicket");
const { createTicket, getTickets, updateTicket, searchTickets } = require("../controllers/ticketController");

// TKT-BE-02
router.post("/", protect, authorize("employee", "support"), validateTicketInput, createTicket);

module.exports = router;