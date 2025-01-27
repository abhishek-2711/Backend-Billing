const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  // Linking to the customer who the bill is for
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Refers to the Customer collection
    required: true,
  },
  // The date the bill was created
  billDate: {
    type: Date,
    default: Date.now,
  },
  // Items included in the bill
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  // Total amount to be paid for the bill (calculated based on items)
  totalAmount: {
    type: Number,
    required: true,
  },
  // Linking to the user (client's representative) who created the bill
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User (Client's representative) collection
  },
});

module.exports = mongoose.model("Bill", BillSchema);
