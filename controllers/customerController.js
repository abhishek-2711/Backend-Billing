const Customer = require("../models/Customer"); // Import the Customer model

// Create a new customer
createCustomer = async (req, res) => {
  try {
    console.log("inside create customer");
    // Destructure the data from the request body
    const { clientId, name, email, phone, address, billingInfo } = req.body;

    // Validate data (You can also use a validation library like Joi or express-validator)
    if (!clientId || !name || !email) {
      return res
        .status(400)
        .json({ message: "Client ID, Name, and Email are required" });
    }

    // Check if customer already exists by email
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    }

    // Create a new customer instance
    const newCustomer = new Customer({
      clientId,
      name,
      email,
      phone,
      address,
      billingInfo,
    });

    // Save the customer to the database
    await newCustomer.save();

    // Return a success response with the created customer
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (err) {
    console.error("Error creating customer: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCustomersByClientId = async (req, res) => {
  try {
    const { clientId } = req.params; // Extract the clientId from the request parameters

    // Validate the clientId
    if (!clientId) {
      return res.status(400).json({ message: "Client ID is required" });
    }

    // Fetch customers for the given clientId
    const customers = await Customer.find({ clientId });

    // If no customers are found for this clientId
    if (customers.length === 0) {
      return res
        .status(404)
        .json({ message: "No customers found for this client" });
    }

    // Return the list of customers
    res.status(200).json({ customers });
  } catch (err) {
    console.error("Error fetching customers: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCustomer, getCustomersByClientId };
