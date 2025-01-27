const express = require("express");
const router = express.Router();

// Example controller functions
const {
  createCustomer,
  getCustomersByClientId,
} = require("../controllers/customerController");

router.post("/create", createCustomer);

router.get("/:clientId", getCustomersByClientId);

module.exports = router;
