const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();

const connectDB = require("./config/db");
const { port } = require("./config/default");

// Import Routes
const authRoutes = require("./routes/auth");

// Initialize App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware (this should always be at the end)
app.use(errorHandler);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Billing System Backend");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
