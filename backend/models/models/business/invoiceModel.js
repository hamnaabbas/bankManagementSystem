const mongoose = require("mongoose");

// Define Invoice Schema
const invoiceSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessAccount",
      required: [true, "Please provide the associated Business ID."],
    },
    invoice_number: {
      type: String,
      required: [true, "Please provide an invoice number."],
      unique: true,
    },
    client_name: {
      type: String,
    },
    client_email: {
      type: String,
    },
    items: [
      {
        description: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    total_amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "unpaid", // unpaid, paid, overdue
      enum: ["unpaid", "paid", "overdue"],
    },
    payment_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "Invoices",
  }
);

// Create and export Invoice model
const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
