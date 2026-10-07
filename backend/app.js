const cors = require("cors");
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Help desk API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
