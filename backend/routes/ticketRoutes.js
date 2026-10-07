const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { validateTicket, validateStatus } = require("../middleware/validate");
const { createTicket, getTickets, updateTicket, searchTickets } = require("../controllers/ticketController");

// TKT-BE-02
router.post("/", authenticate, validateTicket, createTicket);

// TKT-BE-03
router.get("/", authenticate, getTickets);

// TKT-BE-04
router.put("/:id", authenticate, validateStatus, updateTicket);

// TKT-BE-05 — search declared before any /:id routes
router.get("/search", authenticate, searchTickets);

module.exports = router;
