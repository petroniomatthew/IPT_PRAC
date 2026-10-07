require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required. Copy .env.example to .env and configure it.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Server failed to start:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
