const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  phone: String,
  address: String,
  billingInfo: {
    planType: String,
    amount: Number,
    dueDate: Date,
  },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
