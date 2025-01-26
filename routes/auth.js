const express = require("express");
const router = express.Router();

// Example controller functions
const { register, login } = require("../controllers/authController");

// Define Routes
router.post("/register", register);
router.post("/login", login);

// Export the router, not an object
module.exports = router;
